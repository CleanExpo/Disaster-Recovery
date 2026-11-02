# Saved-claim lifecycle on `/claim` (DR-966)

_Written 2 November 2026, before any code changed. Base: `origin/main` e8293584 (#392)._

## Why this exists

PR #392 left two problems on the claim page:

1. A homeowner whose claim was queued offline before the call-out fee tick existed has no
   way to send it. Replay holds it (never sent, never dead-lettered), and the form copies it
   into the claim form on page load.
2. The claim form's draft slot is overwritten on every visit. Autosave runs 500 ms after the
   page loads, before the homeowner has chosen "Resume" or "Start Fresh", so the saved draft
   is replaced with an empty form and "Resume" restores nothing.

Six earlier attempts (old branch `feat/remove-platform-fee`) failed review. Every finding came
from one cause: the form, its draft slot and the offline queue shared state. A held queue item
was loaded into the form, so the form's autosave, submit and "Start Fresh" all had to know
about it, and each fix opened a new race. This design removes the sharing.

## Production exposure (checked read-only, 2 November 2026)

The offline queue only runs when `NEXT_PUBLIC_IOS_NATIVE_BRIDGE_ENABLED === 'true'`.

- Vercel project `disaster-recovery`: 54 environment variables across all targets; the flag
  is not among them. Positive control: `NEXT_PUBLIC_VOICE_WIDGET_ENABLED` is listed for
  production and development, so the lookup does see `NEXT_PUBLIC_*` flags.
- `vercel.json` `env` / `build.env`: not set.
- No native iOS project is generated (`capacitor.config.ts` says so); the app would load the
  live site.

So no production web build has had the queue switched on in its current configuration, and
no homeowner device should hold a legacy queued claim. Not proven: whether the flag was ever
set and later removed (Vercel does not list deleted variables). The recovery panel below is
therefore built for correctness when the flag is turned on, not as an incident fix.

## Two separate stores, two separate owners

| Store                                                        | Key       | Owner                                                                                  | Nothing else may write it |
| ------------------------------------------------------------ | --------- | -------------------------------------------------------------------------------------- | ------------------------- |
| Draft slot (`dr-australia-offline` / `claim-drafts`)         | `current` | Claim form                                                                             | yes                       |
| Offline queue (`dr-offline-queue` / `pending`, `deadletter`) | queue id  | Queue module, driven by the form's submit (enqueue), replay, and the held-claims panel | yes                       |

The form never reads held queue items and never deletes queue items. The held-claims panel
never touches the form or the draft slot.

## Machine 1: the draft slot (claim form)

States, held in `slot` (a ref plus state for rendering):

```
checking   ──(no draft, or expired draft)──────────────▶ owned
checking   ──(draft < 24 h)─────────────────────────────▶ offered
checking   ──(read fails)───────────────────────────────▶ unreadable (no form; "Try again", "Start a new claim")
checking   ──(3 s, no answer yet)──────────────────────▶ slow       (no form; "Start a new claim")
slow       ──(answer arrives)──────────────────────────▶ offered | owned | unreadable, as from checking
unreadable ──(Try again)────────────────────────────────▶ checking
offered    ──(Resume)───────────────────────────────────▶ owned      (form = saved draft)
offered | slow | unreadable ──(Start a new claim, removal commits)──▶ owned (slot cleared, form empty)
offered | slow | unreadable ──(removal fails or is slow, homeowner
                               picks "Continue without saving")────▶ owned, nothing saved on this device
owned      ──(server accepted claim, or claim queued)──▶ closed     (slot cleared)
```

The governing rule, after four review rounds found variants of one root cause: **the page
never treats an unknown storage result as an answer.** A failed read is not "no draft", a
removal still running is neither done nor failed, and no timer ever decides what storage has
not confirmed. Timers only change what the page says.

Rules:

1. **The form is only editable in `owned`.** In `checking`, `slow` and `unreadable` the page
   says what it is doing instead of showing the form; in `offered` it shows the choice. The
   form is never shown while an unread or undecided draft sits in the slot. The only form whose
   typing is not saved is the one the homeowner explicitly chose with "Continue without saving
   on this device", which says so on screen.
2. **Autosave writes only in `owned`, only after a change, and never after "Continue without
   saving".** The baseline is the form and step at the moment the slot became `owned`. A page
   visit with no typing writes nothing, so an untouched visit can no longer create or
   overwrite a draft.
3. **`closed` is terminal.** The pending autosave timer is cancelled, autosave stops, and the
   slot is cleared. The page shows the success screen (server accepted) or the "saved on this
   device" screen (queued). Neither screen has form fields.
4. **Draft reads and writes report the truth.** `loadDraft` resolves null only when there is
   no IndexedDB on the device or the slot is empty; a failed open or read rejects. `saveDraft`
   and `clearDraft` resolve only when the transaction commits and reject on abort or when
   storage cannot be opened.
5. **Draft writes are serialised.** `saveDraft` and `clearDraft` run one after another in call
   order inside `offline-store`, so a save started before a clear can never land after it.
6. **Resume uses the draft read at page load,** not a second read, so it cannot be raced.
   Resume is off while a removal is running, so a late removal can never delete a claim the
   homeowner has just resumed (review round 4 on f5a997a5).
7. **"Start a new claim" opens the form only after the removal commits.** There is no time
   limit on the removal itself. After 5 s the page says it is taking longer; on failure it says
   the saved claim was not removed. In both cases it offers the phone line, a retry (on
   failure) and "Continue without saving on this device", which opens a form that writes
   nothing to this device, so no saved claim is replaced. Added after review rounds 3 and 4.
8. **Only the latest lookup, answering before the homeowner chooses, is acted on.** "Try
   again" starts a new lookup; an older answer, or any answer after a choice, is ignored.

Failures:

| Failure                                        | What happens                                                                                                                          | Why it is safe                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| No IndexedDB on the device                     | `loadDraft` returns null → `owned`; saves fail silently as today                                                                      | nothing can have been saved here, so nothing can be overwritten                                               |
| Read error (open or get fails)                 | `unreadable`: no form; "Try again", "Start a new claim" and the phone line                                                            | a claim that could not be read is never treated as absent and overwritten (round 4 on f5a997a5)               |
| Read slower than 3 s                           | `slow`: no form; the page says it is taking longer and offers "Start a new claim" (which replaces any saved claim) and the phone line | nothing can be typed and lost (5416ace0), and nothing is written over an unchosen draft (round 2 on 0515f787) |
| Read answers while `slow`                      | same as answering in `checking`                                                                                                       | the homeowner has not chosen yet                                                                              |
| Read answers after a choice, or a stale lookup | ignored                                                                                                                               | rule 8                                                                                                        |
| Removal fails on "Start a new claim"           | the choice stays, with an error, the phone line, retry, and "Continue without saving on this device"                                  | the page never says a saved claim is gone when it is not (round 3 on ca3bbb5b)                                |
| Removal still running after 5 s                | the page says so; Resume stays off; "Continue without saving on this device" is offered; the form opens if the removal later commits  | no timer decides the outcome, and a late removal cannot follow Resume (round 4 on f5a997a5)                   |
| `clearDraft` fails after acceptance            | slot may still hold the sent claim; the next visit offers it and the homeowner chooses                                                | best-effort, as on main; the success screen still shows. Logged as a follow-up, not hidden                    |
| Save after close                               | impossible: timer cancelled and writer checks `closed` first                                                                          | rule 3                                                                                                        |

Readers and writers of the draft slot after this change:

| Code                    | Reads                                   | Writes                                                                |
| ----------------------- | --------------------------------------- | --------------------------------------------------------------------- |
| Page-load effect        | `loadDraft` (again on "Try again")      | —                                                                     |
| Autosave effect         | —                                       | `saveDraft` (owned, after a change, unless "Continue without saving") |
| Resume                  | in-memory draft                         | — (autosave then saves it)                                            |
| Start a new claim       | —                                       | `clearDraft`                                                          |
| Submit success / queued | —                                       | `clearDraft` (then closed)                                            |
| `online` handler        | `getUnsynced` (unchanged, display only) | —                                                                     |

## Machine 2: a queue item

```
                      enqueue (offline submit, tick present)
                                   │
                                   ▼
 legacy item (no tick) ──▶ held ──(homeowner ticks in panel)──▶ queued
                            │                                     │
                            └──(homeowner removes)──▶ gone        ├─(replay 2xx)──▶ sent ──▶ gone
                                                                  ├─(replay 5xx / network)──▶ queued (attempts + 1)
                                                                  └─(replay 4xx)──▶ dead-letter (existing banner)
```

Rules:

1. **Consent is never inferred.** An item is `held` while `payload.calloutFeeAcknowledged !== true`.
   Replay skips it. Only the panel's tick, per claim, sets it to `true`.
2. **The tick turns a held item into an ordinary queued item.** Recovery is "acknowledge, then
   replay", so a held claim gets exactly the same send, retry and dead-letter handling as any
   queued claim. If the device is offline when ticked, it is sent on the next replay.
3. **Replay is single-flight, across tabs.** The page-load replay, the `online` handler, the
   banner's "Retry now" and the panel can all call `replayQueue`. Only one run happens at a
   time; a call during a run waits for it and then runs once more, so an item acknowledged
   mid-run is still sent and no item is posted twice by overlapping runs. Each run also holds
   the Web Locks API lock `dr-offline-queue-replay`, so a second tab of the site waits and then
   reads the queue afresh (added after review round 3 on ca3bbb5b: two tabs could each post
   the same claim). Where `navigator.locks` is missing, runs are single-flight within the
   page only.
4. **An accepted claim is never sent twice.** On a 2xx the item's id is first written to an
   accepted marker held outside IndexedDB (localStorage, plus memory for the page), then the
   item is deleted. If the delete fails, the item is also marked `acceptedAt` where possible.
   Every later replay skips a marked item and only retries the delete. A marker is removed
   only after a confirmed delete, or when a successful read shows the item gone; a failed
   read never removes one. The run counts it as a success, so the homeowner is told it was
   sent, and it is not counted as waiting. Added after review round 1 on 02d100d2 (both
   cleanup writes failing let a reload resend the claim). Residual: if IndexedDB and
   localStorage both fail and the page reloads, or the page closes between the server's 2xx
   and the marker write, the claim can be sent again. Every replay now sends the queue id as
   `x-offline-claim-id`; a server that records that key with a unique constraint would close
   the gap. That needs a database migration, so it is a founder-gated follow-up.
5. **A failed read is not an empty read.** The panel uses `readHeldClaims()`, which returns
   `{ ok: false }` on an IndexedDB error. The panel then says it could not check, instead of
   showing nothing.
6. **Every queue write resolves on commit.** The shared transaction helper and `deleteExisting` resolve
   only when the transaction commits, not at request success. A write whose transaction aborts is not
   recorded as done; this also makes "removed" and the accepted-marker cleanup truthful.

7. **Queue writes report the truth.** `acknowledgeHeldClaim` and `removeQueuedClaim` return
   `false` when the flag is off, IndexedDB is unavailable, the item is not on the device
   (checked in the same transaction as the delete), or the write fails. The panel only says "removed" or "sending" on `true`.

Failures:

| Failure                             | What happens                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| IndexedDB unavailable at panel load | "We couldn't check this device for claims saved earlier" notice; nothing else changes |
| Acknowledge write fails             | panel shows an error, item stays held, tick stays as the homeowner left it            |
| Offline when ticked                 | item is queued; panel says it will be sent when back online                           |
| Server 5xx / network error          | item stays queued; panel says it will retry                                           |
| Server 4xx                          | item moves to dead-letter; the existing `OfflineQueueBanner` shows it                 |
| Delete fails after 2xx              | accepted marker written first; never resent; panel says sent                          |
| Remove fails                        | panel shows an error; item stays                                                      |

## Regression tests

Each earlier finding gets a test that fails on the code that had the defect's shape:

| Test | Finding                                                                     |
| ---- | --------------------------------------------------------------------------- |
| R1   | 7a18bd8f: a sent claim is autosaved back as a draft                         |
| R2   | d319d69a: cleanup failure after server acceptance shown as failure / resent |
| R3   | efb8fcd7: a new claim deletes a waiting draft                               |
| R4   | efb8fcd7: a failed queue read is treated as empty                           |
| R5   | bf956176: typing not saved while a draft waits                              |
| R6   | bf956176: queue delete reports success when IndexedDB is unavailable        |
| R7   | 682ff4b1: a late lookup overwrites typing                                   |
| R8   | 5416ace0: after the 3 s timeout the form is editable with autosave off      |
| R9   | main: autosave overwrites the saved draft before the homeowner chooses      |
| R10  | new: held-claim tick-and-resend panel; single-flight replay                 |
