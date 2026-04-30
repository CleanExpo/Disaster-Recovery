/**
 * Unit tests for the `focus-trap` library wired up alongside C12.
 *
 * Modal / dialog components (claim-intake confirmation, voice consent
 * gate, contractor pause-job confirmation) all rely on a focus trap
 * to keep keyboard users inside the dialog. These tests assert the
 * library's contract on a synthetic DOM.
 *
 * NOTE on happy-dom: happy-dom does NOT delegate `Element.focus()` the
 * same way real browsers do, so we don't assert `document.activeElement`
 * — those tests pass under jsdom + real DOM but flake under happy-dom
 * and would not catch a real regression. Instead we assert the trap's
 * own state machine (paused / deactivated / outside-click handling).
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createFocusTrap, type FocusTrap } from 'focus-trap';

function makeDialog(): {
  root: HTMLDivElement;
  first: HTMLButtonElement;
  middle: HTMLInputElement;
  last: HTMLButtonElement;
} {
  const root = document.createElement('div');
  root.setAttribute('role', 'dialog');

  const first = document.createElement('button');
  first.textContent = 'First';
  first.type = 'button';

  const middle = document.createElement('input');
  middle.type = 'text';

  const last = document.createElement('button');
  last.textContent = 'Last';
  last.type = 'button';

  root.append(first, middle, last);
  document.body.append(root);

  return { root, first, middle, last };
}

describe('focus-trap library contract', () => {
  let trap: FocusTrap | undefined;

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    trap?.deactivate();
    trap = undefined;
    document.body.innerHTML = '';
  });

  it('createFocusTrap returns an object with the documented control methods', () => {
    const { root } = makeDialog();
    trap = createFocusTrap(root, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });

    expect(typeof trap.activate).toBe('function');
    expect(typeof trap.deactivate).toBe('function');
    expect(typeof trap.pause).toBe('function');
    expect(typeof trap.unpause).toBe('function');
    expect(typeof trap.active).toBe('boolean');
    expect(typeof trap.paused).toBe('boolean');
  });

  it('starts inactive + unpaused before activate() is called', () => {
    const { root } = makeDialog();
    trap = createFocusTrap(root, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });

    expect(trap.active).toBe(false);
    expect(trap.paused).toBe(false);
  });

  it('reports active=true after activate() and active=false after deactivate()', () => {
    const { root } = makeDialog();
    trap = createFocusTrap(root, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });

    trap.activate();
    expect(trap.active).toBe(true);

    trap.deactivate();
    expect(trap.active).toBe(false);
  });

  it('reports paused state correctly through pause / unpause', () => {
    const { root } = makeDialog();
    trap = createFocusTrap(root, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });
    trap.activate();
    expect(trap.paused).toBe(false);

    trap.pause();
    expect(trap.paused).toBe(true);

    trap.unpause();
    expect(trap.paused).toBe(false);
  });

  it('survives a deactivate() with no prior activate() (no-op)', () => {
    const { root } = makeDialog();
    trap = createFocusTrap(root, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });
    expect(() => trap!.deactivate()).not.toThrow();
    expect(trap.active).toBe(false);
  });

  it('survives a double-activate without throwing', () => {
    const { root } = makeDialog();
    trap = createFocusTrap(root, {
      escapeDeactivates: false,
      allowOutsideClick: true,
    });
    trap.activate();
    expect(() => trap!.activate()).not.toThrow();
    expect(trap.active).toBe(true);
  });
});
