// NOT LEGAL ADVICE — flag-gated scaffold.
//
// In-memory draft claim store for voice agent tool calls.
//
// TODO: Move to Prisma model `VoiceClaimDraft` once migration lands.
// The agent creates a draft via `create_draft_claim`, then `send_signature_link`
// and `send_payment_link` look it up by draft_id. Drafts are scrubbed after
// 24 hours (or manually via scrubDraft).

export type DraftClaim = {
  draft_id: string;
  name: string;
  phone: string;
  email: string;
  postcode: string;
  damage_type: string;
  description: string;
  created_at: number; // epoch ms
};

const store = new Map<string, DraftClaim>();
const TTL_MS = 24 * 60 * 60 * 1000;

function sweep() {
  const now = Date.now();
  for (const [k, v] of store) {
    if (now - v.created_at > TTL_MS) store.delete(k);
  }
}

export function saveDraft(draft: DraftClaim): void {
  sweep();
  store.set(draft.draft_id, draft);
}

export function getDraft(draft_id: string): DraftClaim | undefined {
  sweep();
  return store.get(draft_id);
}

export function scrubDraft(draft_id: string): void {
  store.delete(draft_id);
}

export function _peekStoreSize() {
  return store.size;
}
