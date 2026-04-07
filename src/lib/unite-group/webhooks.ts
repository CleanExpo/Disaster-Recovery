/**
 * Unite-Group Webhooks & Real-time Events
 * DR-287: Register endpoint; handle inbound events
 */

import { getUniteGroupClient } from './client';
import crypto from 'crypto';

interface WebhookRegistration {
  id?: string;
  url: string;
  events: string[];
  secret?: string;
  active?: boolean;
}

interface WebhookEvent {
  id: string;
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
  signature: string;
}

export async function registerWebhook(registration: Omit<WebhookRegistration, 'id'>) {
  const client = getUniteGroupClient();
  return client.post<WebhookRegistration>('/webhooks', { ...registration });
}

export async function listWebhooks() {
  const client = getUniteGroupClient();
  return client.get<WebhookRegistration[]>('/webhooks');
}

export async function deleteWebhook(webhookId: string) {
  const client = getUniteGroupClient();
  return client.delete(`/webhooks/${webhookId}`);
}

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
