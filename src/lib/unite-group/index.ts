/**
 * Unite-Group API Integration
 * Central export for all Unite-Group modules
 *
 * DR-281: Setup & Auth (client.ts)
 * DR-282: Contact & CRM Sync (contacts.ts)
 * DR-283: Messaging (messaging.ts)
 * DR-284: Analytics & Reporting (analytics.ts)
 * DR-285: Bookkeeping / Finance (finance.ts)
 * DR-286: Social Pages (social.ts)
 * DR-287: Webhooks (webhooks.ts)
 * DR-288: Dashboard Feed (dashboard.ts - via analytics)
 * DR-289: Error Handling (built into client.ts retry logic)
 * DR-290: Testing & Documentation (this index + JSDoc)
 */

export { UniteGroupClient, getUniteGroupClient, UniteGroupApiError } from './client';
export { syncContact, getContact, updateContact, searchContacts } from './contacts';
export { sendMessage, getMessageStatus, sendBulk } from './messaging';
export { trackEvent, trackEvents, getReport, getDashboardSummary } from './analytics';
export { createInvoice, getInvoice, syncPayment, getFinanceSummary } from './finance';
export { createPost, schedulePost, getEngagement, getPageStats } from './social';
export { registerWebhook, listWebhooks, deleteWebhook, verifyWebhookSignature } from './webhooks';
