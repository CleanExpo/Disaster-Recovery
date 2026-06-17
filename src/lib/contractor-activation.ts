import crypto from 'crypto';

const ACTIVATION_TOKEN_TTL_DAYS = 7;

type ActivationPayload = {
  contractorId: string;
  exp: number;
  purpose: 'contractor_activation';
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getActivationSecret(): string {
  const secret = process.env.CONTRACTOR_ACTIVATION_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('CONTRACTOR_ACTIVATION_SECRET or NEXTAUTH_SECRET must be configured');
  }
  return secret;
}

function sign(payloadPart: string): string {
  return crypto.createHmac('sha256', getActivationSecret()).update(payloadPart).digest('base64url');
}

export function createContractorActivationToken(contractorId: string, now = new Date()): string {
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + ACTIVATION_TOKEN_TTL_DAYS);

  const payload: ActivationPayload = {
    contractorId,
    exp: expiresAt.getTime(),
    purpose: 'contractor_activation',
  };
  const payloadPart = base64UrlEncode(JSON.stringify(payload));
  return `${payloadPart}.${sign(payloadPart)}`;
}

export function verifyContractorActivationToken(token: string): ActivationPayload {
  const [payloadPart, signature] = token.split('.');
  if (!payloadPart || !signature) {
    throw new Error('Invalid activation token');
  }

  const expected = sign(payloadPart);
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(signature);
  if (
    expectedBuffer.length !== actualBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, actualBuffer)
  ) {
    throw new Error('Invalid activation token');
  }

  const payload = JSON.parse(base64UrlDecode(payloadPart)) as ActivationPayload;
  if (payload.purpose !== 'contractor_activation' || !payload.contractorId) {
    throw new Error('Invalid activation token');
  }
  if (payload.exp < Date.now()) {
    throw new Error('Activation token expired');
  }

  return payload;
}

export function buildContractorActivationUrl(contractorId: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const token = createContractorActivationToken(contractorId);
  return `${appUrl}/contractor/activate?token=${encodeURIComponent(token)}`;
}
