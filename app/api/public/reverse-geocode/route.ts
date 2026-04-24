/**
 * POST /api/public/reverse-geocode
 *
 * Accepts `{ lat, lng }` from the "Use my current location" button on
 * /claim and returns a structured AU address component set so the
 * client can pre-fill the property-address fields.
 *
 * DR-725 iOS App epic, Phase 2 PR #3.
 *
 * Privacy notes (.claude/rules/privacy.md APP 3 + APP 5):
 * - Coordinates are CONFIDENTIAL. Collect only on user tap (UI
 *   enforces this; button is not rendered on page load).
 * - The route NEVER logs the coordinates or the geocoder response
 *   body. Logs carry only `{ ok, hasResult }`.
 * - Failure modes (permission denied, API failure, no result) return
 *   a shaped error so the client can fall back silently.
 *
 * NOT LEGAL ADVICE.
 */

import { NextRequest, NextResponse } from 'next/server';

import { reverseGeocodeRequestSchema } from '@/lib/validation/schemas';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type GoogleGeocodeComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type GoogleGeocodeResult = {
  address_components: GoogleGeocodeComponent[];
  formatted_address?: string;
};

type GoogleGeocodeResponse = {
  status: string;
  results?: GoogleGeocodeResult[];
};

type AddressOut = {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
};

function pickComponent(
  components: GoogleGeocodeComponent[],
  types: string[],
): GoogleGeocodeComponent | undefined {
  return components.find((c) => types.every((t) => c.types.includes(t)));
}

function mapToAddress(result: GoogleGeocodeResult): AddressOut {
  const c = result.address_components;
  const streetNumber = pickComponent(c, ['street_number'])?.long_name ?? '';
  const route = pickComponent(c, ['route'])?.long_name ?? '';
  const street = [streetNumber, route].filter(Boolean).join(' ').trim();

  const suburb =
    pickComponent(c, ['locality'])?.long_name ??
    pickComponent(c, ['postal_town'])?.long_name ??
    pickComponent(c, ['sublocality'])?.long_name ??
    '';

  const state =
    pickComponent(c, ['administrative_area_level_1'])?.short_name ?? '';

  const postcode = pickComponent(c, ['postal_code'])?.long_name ?? '';
  const country = pickComponent(c, ['country'])?.short_name ?? '';

  return { street, suburb, state, postcode, country };
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid_json' },
      { status: 400 },
    );
  }

  const parsed = reverseGeocodeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_payload' },
      { status: 400 },
    );
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.warn('[reverse-geocode] geocoder_unavailable', { ok: false });
    return NextResponse.json(
      { ok: false, error: 'geocoder_unavailable' },
      { status: 503 },
    );
  }

  const { lat, lng } = parsed.data;

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    url.searchParams.set('latlng', `${lat},${lng}`);
    url.searchParams.set('key', apiKey);

    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.warn('[reverse-geocode] upstream_failed', {
        ok: false,
        hasResult: false,
      });
      return NextResponse.json(
        { ok: false, error: 'upstream_failed' },
        { status: 502 },
      );
    }

    const data = (await response.json()) as GoogleGeocodeResponse;
    const first = data.results?.[0];
    if (data.status !== 'OK' || !first) {
      // eslint-disable-next-line no-console
      console.info('[reverse-geocode] done', { ok: true, hasResult: false });
      return NextResponse.json(
        { ok: false, error: 'no_result' },
        { status: 200 },
      );
    }

    const address = mapToAddress(first);
    // eslint-disable-next-line no-console
    console.info('[reverse-geocode] done', { ok: true, hasResult: true });

    return NextResponse.json({ ok: true, address });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    // eslint-disable-next-line no-console
    console.error('[reverse-geocode] request_failed', { message });
    return NextResponse.json(
      { ok: false, error: 'request_failed' },
      { status: 500 },
    );
  }
}
