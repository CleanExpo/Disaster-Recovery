/**
 * Unite-Group Contact & CRM Sync
 * DR-282: Push/pull contacts on registration and update
 */

import { getUniteGroupClient } from './client';

interface Contact {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  type: 'client' | 'contractor' | 'lead';
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export async function syncContact(contact: Contact) {
  const client = getUniteGroupClient();
  return client.post<Contact>('/contacts', { ...contact });
}

export async function getContact(contactId: string) {
  const client = getUniteGroupClient();
  return client.get<Contact>(`/contacts/${contactId}`);
}

export async function updateContact(contactId: string, updates: Partial<Contact>) {
  const client = getUniteGroupClient();
  return client.patch<Contact>(`/contacts/${contactId}`, { ...updates });
}

export async function searchContacts(query: string, type?: Contact['type']) {
  const client = getUniteGroupClient();
  const params: Record<string, string> = { q: query };
  if (type) params.type = type;
  return client.get<Contact[]>('/contacts/search', params);
}
