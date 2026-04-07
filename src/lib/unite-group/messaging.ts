/**
 * Unite-Group Messaging
 * DR-283: Route emails/SMS/notifications; inbound webhooks
 */

import { getUniteGroupClient } from './client';

interface Message {
  id?: string;
  to: string;
  from?: string;
  channel: 'email' | 'sms' | 'push';
  subject?: string;
  body: string;
  templateId?: string;
  metadata?: Record<string, unknown>;
}

interface MessageStatus {
  id: string;
  status: 'queued' | 'sent' | 'delivered' | 'failed';
  sentAt?: string;
  deliveredAt?: string;
}

export async function sendMessage(message: Message) {
  const client = getUniteGroupClient();
  return client.post<MessageStatus>('/messaging/send', { ...message });
}

export async function getMessageStatus(messageId: string) {
  const client = getUniteGroupClient();
  return client.get<MessageStatus>(`/messaging/${messageId}/status`);
}

export async function sendBulk(messages: Message[]) {
  const client = getUniteGroupClient();
  return client.post<{ queued: number; failed: number }>('/messaging/bulk', { messages });
}
