import type { AnchorHTMLAttributes } from 'react';
import { DR_PHONE_DISPLAY, DR_PHONE_E164 } from '@/config/contact';

/**
 * "Call <number>" link for the public DR phone number. Renders nothing when the
 * number is not configured. Has no hooks, so server and client pages can both use it.
 */
export function DrPhoneLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!DR_PHONE_DISPLAY || !DR_PHONE_E164) return null;
  return (
    <a
      {...props}
      href={`tel:${DR_PHONE_E164}`}
      aria-label={`Call Disaster Recovery on ${DR_PHONE_DISPLAY}`}
    >
      Call {DR_PHONE_DISPLAY}
    </a>
  );
}
