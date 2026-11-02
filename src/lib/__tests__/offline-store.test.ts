/**
 * Draft slot ordering (DR-966). Each saveDraft / clearDraft call opens its own
 * IndexedDB connection, so without serialisation a save issued before a clear
 * can commit after it and put a sent claim back in the slot.
 *
 * The stub below lets each open() answer after a chosen delay, so a slow first
 * open and a fast second open reproduce the reordering deterministically.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function createDraftIdbStub(openDelays: number[]) {
  const data = new Map<string, unknown>();
  let opens = 0;

  function request<T>(run: () => T) {
    const req = {
      onsuccess: null as null | (() => void),
      onerror: null as null | (() => void),
      result: undefined as T | undefined,
      error: null as unknown,
    };
    queueMicrotask(() => {
      req.result = run();
      req.onsuccess?.();
    });
    return req;
  }

  const db = {
    objectStoreNames: { contains: () => true },
    createObjectStore: () => ({}),
    close: () => {},
    transaction: () => ({
      objectStore: () => ({
        put: (value: { id: string }) => request(() => data.set(value.id, value)),
        delete: (key: string) => request(() => data.delete(key)),
        get: (key: string) => request(() => data.get(key)),
        getAll: () => request(() => Array.from(data.values())),
      }),
    }),
  };

  return {
    data,
    open() {
      const delay = openDelays[opens] ?? 0;
      opens += 1;
      const req = {
        onsuccess: null as null | ((e: { target: unknown }) => void),
        onerror: null as null | (() => void),
        onupgradeneeded: null as null | ((e: { target: unknown }) => void),
        result: db,
        error: null as unknown,
      };
      setTimeout(() => req.onsuccess?.({ target: req }), delay);
      return req;
    },
  };
}

let stub: ReturnType<typeof createDraftIdbStub>;

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('offline-store draft slot', () => {
  it('R1 a clear issued after a save always wins, even when the save opens slowly', async () => {
    stub = createDraftIdbStub([30, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');

    const save = store.saveDraft({ formData: { fullName: 'Sent Claim' }, step: 4 });
    const clear = store.clearDraft();
    await Promise.all([save, clear]);

    expect(stub.data.has('current')).toBe(false);
    expect(await store.loadDraft()).toBeNull();
  });

  it('R1 a failed save does not block the clear behind it', async () => {
    stub = createDraftIdbStub([0, 0]);
    vi.stubGlobal('indexedDB', stub);
    const store = await import('../offline-store');
    stub.data.set('current', { id: 'current', formData: {}, step: 1, savedAt: 1, synced: false });
    const original = stub.open.bind(stub);
    let first = true;
    stub.open = () => {
      if (first) {
        first = false;
        throw new Error('open failed');
      }
      return original();
    };

    await expect(store.saveDraft({ formData: {}, step: 1 })).rejects.toThrow('open failed');
    await store.clearDraft();
    expect(stub.data.has('current')).toBe(false);
  });
});
