/**
 * POST /api/native/claim-photo-upload
 *
 * Receives a photo captured by the Capacitor Camera plugin from the
 * iOS/Android app (`src/lib/native-bridge.ts` -> capturePhoto()), uploads
 * the bytes to Supabase Storage bucket `claim-photos`, and records the
 * metadata row in `ClaimPhotoAttachment`.
 *
 * DR-725 iOS App epic, Phase 2 PR #2.
 *
 * Privacy notes (.claude/rules/privacy.md §1, §3):
 * - Photos of a property are CONFIDENTIAL when joined with a claim.
 * - Geo coordinates are CONFIDENTIAL; only captured if the user granted
 *   Geolocation permission separately (APP 3 collection limitation).
 * - Never log the photo bytes or the data URL. Structured logs carry
 *   mime, decoded size, and object key only.
 *
 * Pending (noted in PR description):
 * - Supabase Storage upload is stubbed to a local `/tmp` write when the
 *   service role env vars are absent (dev / CI). In production the
 *   service-role client uploads to the `claim-photos` bucket.
 * - Pre-claim photos (no claimId) are accepted and stored with a
 *   sentinel objectKey prefix; a future PendingClaimPhoto table
 *   (Phase 2b) will key them by deviceId for later reconciliation.
 *
 * NOT LEGAL ADVICE.
 */

import { randomUUID } from 'node:crypto';
import { writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { createServiceClient } from '@/lib/supabase';
import { claimPhotoUploadSchema } from '@/lib/validation/schemas';
import { requestLogger, captureException } from '@/lib/observability';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STORAGE_BUCKET = 'claim-photos';
const UNASSIGNED_SENTINEL = 'unassigned';

type SniffResult = { mime: string; ext: string } | null;

/**
 * Magic-number sniff — never trust the data-url-declared mime.
 * JPEG: FF D8 FF
 * PNG:  89 50 4E 47
 * HEIC: ????????66747970 (ftyp box at offset 4-11, brand heic/heix/hevc/mif1)
 */
function sniffImage(bytes: Uint8Array): SniffResult {
  if (bytes.length < 12) return null;
  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: 'image/jpeg', ext: 'jpg' };
  }
  // PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { mime: 'image/png', ext: 'png' };
  }
  // HEIC / HEIF — ftyp box at offset 4.
  if (
    bytes[4] === 0x66 && // 'f'
    bytes[5] === 0x74 && // 't'
    bytes[6] === 0x79 && // 'y'
    bytes[7] === 0x70 // 'p'
  ) {
    const brand = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
    if (['heic', 'heix', 'hevc', 'heim', 'heis', 'mif1', 'msf1'].includes(brand)) {
      return { mime: 'image/heic', ext: 'heic' };
    }
  }
  return null;
}

function decodeDataUrl(dataUrl: string): Uint8Array | null {
  const commaIdx = dataUrl.indexOf(',');
  if (commaIdx < 0) return null;
  try {
    return Buffer.from(dataUrl.slice(commaIdx + 1), 'base64');
  } catch {
    return null;
  }
}

async function uploadToStorage(
  objectKey: string,
  bytes: Uint8Array,
  mime: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const hasSupabase =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!hasSupabase) {
    // Dev / CI stub: write to OS temp dir so the row insert still has a
    // deterministic, inspectable artefact. Production always has Supabase.
    try {
      const tmpPath = path.join(tmpdir(), STORAGE_BUCKET, objectKey);
      await mkdir(path.dirname(tmpPath), { recursive: true });
      await writeFile(tmpPath, bytes);
      return { ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { ok: false, error: `tmp_write_failed:${message}` };
    }
  }

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(objectKey, bytes, {
      contentType: mime,
      upsert: false,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { ok: false, error: message };
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/native/claim-photo-upload' });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = claimPhotoUploadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const { photoDataUrl, claimId, platform, appVersion, capturedAt, geo } = parsed.data;

  const bytes = decodeDataUrl(photoDataUrl);
  if (!bytes || bytes.length === 0) {
    return NextResponse.json({ ok: false, error: 'invalid_data_url' }, { status: 400 });
  }

  const sniffed = sniffImage(bytes);
  if (!sniffed) {
    return NextResponse.json({ ok: false, error: 'unsupported_image_format' }, { status: 415 });
  }

  const objectKey = `${claimId ?? UNASSIGNED_SENTINEL}/${randomUUID()}.${sniffed.ext}`;

  const uploaded = await uploadToStorage(objectKey, bytes, sniffed.mime);
  if (!uploaded.ok) {
    // eslint-disable-next-line no-console
    console.error('[claim-photo-upload] upload_failed', {
      objectKey,
      sizeBytes: bytes.length,
      mime: sniffed.mime,
      platform,
      error: uploaded.error,
    });
    return NextResponse.json({ ok: false, error: 'upload_failed' }, { status: 502 });
  }

  // Only persist a row when we actually have a claim to attach to.
  // Pre-claim photos are uploaded to the `unassigned/` prefix and a
  // future PendingClaimPhoto table (Phase 2b, keyed by deviceId) will
  // reconcile them; for now we return the object key as a temp reference.
  if (!claimId) {
    // eslint-disable-next-line no-console
    console.info('[claim-photo-upload] stored_unassigned', {
      objectKey,
      sizeBytes: bytes.length,
      mime: sniffed.mime,
      platform,
      appVersion,
      hasGeo: Boolean(geo),
    });
    return NextResponse.json({ ok: true, id: objectKey }, { status: 201 });
  }

  try {
    const stored = await prisma.claimPhotoAttachment.create({
      data: {
        claimId,
        objectKey,
        platform,
        capturedAt: new Date(capturedAt),
        geoLat: geo?.lat,
        geoLng: geo?.lng,
        geoAccuracyM: geo?.accuracyMeters,
        sizeBytes: bytes.length,
        mimeType: sniffed.mime,
      },
      select: { id: true },
    });

    // eslint-disable-next-line no-console
    console.info('[claim-photo-upload] stored', {
      id: stored.id,
      objectKey,
      sizeBytes: bytes.length,
      mime: sniffed.mime,
      platform,
      appVersion,
      hasGeo: Boolean(geo),
    });

    return NextResponse.json({ ok: true, id: stored.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[claim-photo-upload] store_failed', { message, objectKey });
    captureException(error, {
      tags: { route: '/api/native/claim-photo-upload' },
      extra: { requestId: log.requestId, objectKey },
    });
    return NextResponse.json({ ok: false, error: 'store_failed' }, { status: 500 });
  }
}
