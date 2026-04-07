/**
 * Unite-Group Bookkeeping / Finance Sync
 * DR-285: Invoices, payments, expenses, status sync
 */

import { getUniteGroupClient } from './client';

interface Invoice {
  id?: string;
  contactId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  lineItems: { description: string; quantity: number; unitPrice: number }[];
  dueDate: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paidAt: string;
  method: string;
}

export async function createInvoice(invoice: Omit<Invoice, 'id'>) {
  const client = getUniteGroupClient();
  return client.post<Invoice>('/finance/invoices', { ...invoice });
}

export async function getInvoice(invoiceId: string) {
  const client = getUniteGroupClient();
  return client.get<Invoice>(`/finance/invoices/${invoiceId}`);
}

export async function syncPayment(payment: Omit<Payment, 'id'>) {
  const client = getUniteGroupClient();
  return client.post<Payment>('/finance/payments', { ...payment });
}

export async function getFinanceSummary(period?: string) {
  const client = getUniteGroupClient();
  const params = period ? { period } : undefined;
  return client.get<{ revenue: number; expenses: number; outstanding: number }>('/finance/summary', params);
}
