import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';
import { env } from '@/lib/env';

const deleteAccountSchema = z.object({
  full_name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  abn: z
    .string()
    .regex(/^[\d\s]{11,14}$/, 'ABN must be 11 digits')
    .transform((v) => v.replace(/\s/g, '')),
  reason: z.string().optional(),
  confirm: z.union([z.literal('on'), z.literal('true'), z.boolean()]),
});

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const limit = await rateLimit(ip, 'restoreassist-delete-account');
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter ?? 60) } },
    );
  }

  try {
    // Handle both JSON (fetch) and form-encoded (HTML form POST) bodies
    const contentType = request.headers.get('content-type') ?? '';
    let raw: Record<string, unknown>;

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      raw = Object.fromEntries(params.entries());
    } else {
      raw = (await request.json()) as Record<string, unknown>;
    }

    const parsed = deleteAccountSchema.safeParse(raw);
    if (!parsed.success) {
      const errors = parsed.error.errors.map((e) => e.message).join(', ');
      if (contentType.includes('application/x-www-form-urlencoded')) {
        return NextResponse.redirect(
          new URL(
            `/restoreassist/delete-account?error=${encodeURIComponent(errors)}`,
            request.url,
          ),
          303,
        );
      }
      return NextResponse.json({ success: false, message: errors }, { status: 400 });
    }

    const { full_name, email, abn, reason } = parsed.data;

    // Send notification to privacy officer
    const notificationEmail = env.claimNotificationEmail();
    await sendEmail(notificationEmail, {
      subject: `[RestoreAssist] Account Deletion Request — ${full_name}`,
      html: `
        <h2>RestoreAssist Account Deletion Request</h2>
        <p><strong>Full name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>ABN:</strong> ${abn}</p>
        <p><strong>Reason:</strong> ${reason ?? 'Not specified'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })} AEST</p>
        <hr />
        <p>Process this request within 30 days per the RestoreAssist Privacy Policy.</p>
        <p>Retain job records for 7 years as required by Australian tax law.</p>
      `,
    });

    // Send confirmation to requester
    await sendEmail(email, {
      subject: 'RestoreAssist — Account Deletion Request Received',
      html: `
        <p>Hi ${full_name},</p>
        <p>Your account deletion request has been received and will be processed within 30 days.</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>Your account profile, credentials, and usage data will be deleted.</li>
          <li>Completed job records may be retained for up to 7 years for legal compliance.</li>
          <li>You will receive a confirmation email once deletion is complete.</li>
        </ul>
        <p>If you have any questions, contact the Privacy Officer at
        <a href="https://disasterrecovery.com.au/contact">disasterrecovery.com.au/contact</a>.</p>
        <p>Unite-Group NEXUS Pty Ltd<br />ABN 95 691 477 844</p>
      `,
    });

    if (contentType.includes('application/x-www-form-urlencoded')) {
      return NextResponse.redirect(
        new URL('/restoreassist/delete-account?submitted=true', request.url),
        303,
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your deletion request has been received. You will receive a confirmation email.',
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[restoreassist/delete-account] Error:', message);
    return NextResponse.json({ success: false, message: 'Failed to submit request. Please try again.' }, { status: 500 });
  }
}
