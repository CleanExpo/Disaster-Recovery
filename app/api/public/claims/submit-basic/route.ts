import { NextResponse } from 'next/server';

/**
 * Noscript / progressive-enhancement target for the claim page SSR form.
 * Forwards to the canonical claim submit handler so we do not invent a fourth claim shape.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') || '';
  let payload: Record<string, unknown> = {};

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const form = await request.formData();
    const damageType = String(form.get('damageType') || 'other');
    payload = {
      fullName: form.get('name') || form.get('fullName') || '',
      phone: form.get('phone') || '',
      email: form.get('email') || '',
      propertyAddress: form.get('address') || form.get('propertyAddress') || '',
      suburb: form.get('suburb') || '',
      state: form.get('state') || 'QLD',
      postcode: form.get('postcode') || '',
      damageTypes: [damageType],
      damageDescription: form.get('description') || form.get('damageDescription') || '',
      urgencyLevel: 'standard',
      hasInsurance: false,
      paymentConfirmed: false,
      paymentAmount: 0,
    };
  } else {
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid body' }, { status: 400 });
    }
  }

  const origin = new URL(request.url).origin;
  const res = await fetch(`${origin}/api/claims/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  // Form POST from noscript: redirect to track or claim with error query
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    if (res.ok && data.claimId) {
      return NextResponse.redirect(new URL(`/track/${data.claimId}`, origin), 303);
    }
    return NextResponse.redirect(new URL('/claim?error=submit_failed', origin), 303);
  }

  return NextResponse.json(data, { status: res.status });
}
