import { NextRequest, NextResponse } from 'next/server';
import { randomUUID, createHash } from 'crypto';
import { prisma } from '@/lib/prisma';
import { signEquippedHandoffToken } from '@/lib/finance/jwt-handoff';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const AU_MOBILE = /^(?:\+?61|0)4\d{2}\s?\d{3}\s?\d{3}$/;
const POSTCODE = /^\d{4}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FUNDING_BANDS = ['<10k', '10-25k', '25-50k', '50-100k', '100-250k', '>250k'] as const;
const DISASTER_CATS = ['water', 'fire', 'storm', 'mould', 'biohazard', 'other'] as const;
const CONTACT_SLOTS = ['asap', 'morning', 'afternoon', 'evening'] as const;
const CUSTOMER_TYPES = ['business', 'consumer'] as const;

/**
 * Whitelist of permitted `source` values the form may send. Anything else
 * is ignored and we fall back to the default consumer/commercial surface.
 * Contractor channel lands here when the NRPG contractor equipment-finance
 * page hands off to `/finance/referral?channel=contractor`.
 */
const ALLOWED_SOURCES = new Set<string>([
  'disasterrecovery.com.au/finance',
  'disasterrecovery.com.au/contractor/equipment-finance',
]);
const DEFAULT_SOURCE = 'disasterrecovery.com.au/finance';

interface IncomingPayload {
  full_name?: unknown;
  mobile?: unknown;
  email?: unknown;
  postcode?: unknown;
  country?: unknown;
  customer_type?: unknown;
  abn?: unknown;
  disaster_category?: unknown;
  job_reference?: unknown;
  purpose?: unknown;
  funding_band?: unknown;
  preferred_contact?: unknown;
  consent_share_equipped?: unknown;
  consent_referral_disclosure?: unknown;
  consent_marketing?: unknown;
  source?: unknown;
}

/**
 * Resolve the `source` field from an incoming body. Unknown / missing
 * values fall back to the default `/finance` surface; a contractor-channel
 * submission must send the exact matching string.
 */
export function resolveIncomingSource(raw: unknown): string {
  if (typeof raw !== 'string') return DEFAULT_SOURCE;
  return ALLOWED_SOURCES.has(raw) ? raw : DEFAULT_SOURCE;
}

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function stringField(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t || t.length > max) return null;
  return t;
}

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/finance/referral' });
  let body: IncomingPayload;
  try {
    body = (await req.json()) as IncomingPayload;
  } catch {
    return bad('Invalid JSON body.');
  }

  const full_name = stringField(body.full_name, 120);
  const mobileRaw = stringField(body.mobile, 30);
  const email = stringField(body.email, 200);
  const postcode = stringField(body.postcode, 4);
  const purpose = stringField(body.purpose, 500);
  const customer_type =
    typeof body.customer_type === 'string' &&
    (CUSTOMER_TYPES as readonly string[]).includes(body.customer_type)
      ? (body.customer_type as (typeof CUSTOMER_TYPES)[number])
      : null;
  const disaster_category =
    typeof body.disaster_category === 'string' &&
    (DISASTER_CATS as readonly string[]).includes(body.disaster_category)
      ? (body.disaster_category as (typeof DISASTER_CATS)[number])
      : null;
  const funding_band =
    typeof body.funding_band === 'string' &&
    (FUNDING_BANDS as readonly string[]).includes(body.funding_band)
      ? (body.funding_band as (typeof FUNDING_BANDS)[number])
      : null;
  const preferred_contact =
    typeof body.preferred_contact === 'string' &&
    (CONTACT_SLOTS as readonly string[]).includes(body.preferred_contact)
      ? (body.preferred_contact as (typeof CONTACT_SLOTS)[number])
      : null;
  const consent_share_equipped = body.consent_share_equipped === true;
  const consent_referral_disclosure = body.consent_referral_disclosure === true;
  const consent_marketing = body.consent_marketing === true;
  const job_reference =
    typeof body.job_reference === 'string' ? body.job_reference.trim().slice(0, 120) || null : null;
  const abn =
    typeof body.abn === 'string' ? body.abn.replace(/\s+/g, '').slice(0, 14) || null : null;

  const missing: string[] = [];
  if (!full_name) missing.push('full_name');
  if (!email || !EMAIL.test(email)) missing.push('email');
  if (!mobileRaw || !AU_MOBILE.test(mobileRaw.replace(/\s+/g, ''))) missing.push('mobile');
  if (!postcode || !POSTCODE.test(postcode)) missing.push('postcode');
  if (!customer_type) missing.push('customer_type');
  if (!disaster_category) missing.push('disaster_category');
  if (!funding_band) missing.push('funding_band');
  if (!preferred_contact) missing.push('preferred_contact');
  if (!purpose) missing.push('purpose');
  if (!consent_share_equipped) missing.push('consent_share_equipped');
  if (!consent_referral_disclosure) missing.push('consent_referral_disclosure');

  if (missing.length) {
    return bad(`Missing or invalid fields: ${missing.join(', ')}`);
  }

  const referralId = randomUUID();
  const mobile = mobileRaw!.replace(/\s+/g, '');

  // Build the minimal payload that will actually go to Equipped.
  const equippedPayload = {
    referral_id: referralId,
    full_name,
    mobile,
    email,
    postcode,
    country: 'AU' as const,
    customer_type,
    abn,
    disaster_category,
    job_reference,
    purpose,
    funding_band,
    preferred_contact,
    source: resolveIncomingSource(body.source),
    disclosure_version: '2026-04-20.v1',
    privacy_notice_version: '2026-04-20.v1',
    issued_at: new Date().toISOString(),
  };

  // Sign a short-lived JWT for the iframe/postMessage handoff.
  // Uses JWT_SECRET_KEY if set (already wired for jwt-auth.ts), otherwise a dev fallback.
  // L6 (2026-04-30): centralised in src/lib/finance/jwt-handoff.ts; adds `kid`
  // header for forward-compatible key rotation.
  const secret = process.env.JWT_SECRET_KEY || 'dev-only-jwt-secret-change-me';
  const kid = process.env.EQUIPPED_JWT_KID || 'dr-2026-04';
  const handoff_token = await signEquippedHandoffToken({
    secret,
    kid,
    claims: {
      ref: referralId,
      email: email!,
      mobile,
      name: full_name!,
      amt: funding_band ?? undefined,
      typ: customer_type ?? undefined,
      src: 'disasterrecovery.com.au',
    },
  });

  // Audit log: payload HASH (not plaintext) + header metadata.
  const payloadHash = createHash('sha256').update(JSON.stringify(equippedPayload)).digest('hex');

  const auditEntry = {
    referral_id: referralId,
    created_at: equippedPayload.issued_at,
    country: 'AU',
    customer_type,
    funding_band,
    disaster_category,
    source: equippedPayload.source,
    disclosure_version: equippedPayload.disclosure_version,
    privacy_notice_version: equippedPayload.privacy_notice_version,
    consent_share_equipped: true,
    consent_referral_disclosure: true,
    consent_marketing,
    payload_hash: payloadHash,
    ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
    user_agent: req.headers.get('user-agent') || null,
    receiver: 'equippedcf.com.au',
  };

  // L9 (2026-04-29): persist to FinanceReferral table. Best-effort —
  // if the migration hasn't been deployed yet (e.g. Equipped flag still
  // off and ops hasn't run `prisma migrate deploy`), the stdout audit
  // line below remains the fallback record-of-transmission.
  // See docs/prd/loops/2026-04-29-finance-referral-persistence/.
  try {
    await prisma.financeReferral.create({
      data: {
        id: referralId,
        country: 'AU',
        customerType: customer_type!,
        fundingBand: funding_band!,
        disasterCategory: disaster_category!,
        source: equippedPayload.source,
        disclosureVersion: equippedPayload.disclosure_version,
        privacyNoticeVersion: equippedPayload.privacy_notice_version,
        consentShareEquipped: true,
        consentReferralDisclosure: true,
        consentMarketing: consent_marketing,
        payloadHash,
        ip: auditEntry.ip,
        userAgent: auditEntry.user_agent,
        receiver: auditEntry.receiver,
      },
    });
  } catch (err) {
    log.error('finance.referral persistence failed', {
      referralId,
      error: err instanceof Error ? err.message : String(err),
    });
    captureException(err, {
      tags: { route: '/api/finance/referral', stage: 'persistence' },
      extra: { requestId: log.requestId, referralId },
    });
    // continue — stdout audit log below remains the fallback record.
  }

  // Surface-treatment (RA-1109): structured stdout fallback. Mirrors the
  // Prisma row above; preserved as belt-and-braces for ops visibility.
  log.info('finance.referral audit', auditEntry);

  await logComplianceEvent({
    eventType: 'finance_referral_handoff',
    correlationId: referralId,
    correlationType: 'finance_referral',
    entityType: 'customer',
    entityIdentifier: email!,
    metadata: {
      route: '/api/finance/referral',
      request_id: log.requestId,
      email_hash: hashIdentifier(email!),
      funding_band,
      disaster_category,
      customer_type,
      source: equippedPayload.source,
      payload_hash: payloadHash,
    },
  });

  return NextResponse.json({
    ok: true,
    referral_id: referralId,
    handoff_token,
    expires_in: 900,
  });
}
