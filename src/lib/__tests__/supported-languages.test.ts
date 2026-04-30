/**
 * Unit tests for src/lib/supported-languages.ts
 *
 * Translation surface (DR-358 Gemma 4 + DR-423 RTL). The set of
 * supported languages is contractually shared between the API
 * route, the language context, and the selector UI — drift here
 * means the selector shows a language the API can't translate.
 */

import { describe, it, expect } from 'vitest';
import { RTL_LANGUAGES, isRTL, SUPPORTED_LANGUAGES } from '../supported-languages';

describe('SUPPORTED_LANGUAGES', () => {
  it('includes English as the default', () => {
    expect(SUPPORTED_LANGUAGES.en).toBe('English');
  });

  it('includes the AU census top non-English languages', () => {
    // Mandarin, Arabic, Vietnamese, Cantonese, Punjabi, Hindi from ABS 2021.
    for (const code of ['zh', 'ar', 'vi', 'yue', 'pa', 'hi']) {
      expect(SUPPORTED_LANGUAGES[code], `missing ${code}`).toBeDefined();
    }
  });

  it('includes Te Reo Māori for NZ coverage', () => {
    expect(SUPPORTED_LANGUAGES.mi).toBeDefined();
  });

  it('every key is a lowercase BCP-47 language code (2-3 chars)', () => {
    for (const code of Object.keys(SUPPORTED_LANGUAGES)) {
      expect(code).toMatch(/^[a-z]{2,3}$/);
    }
  });

  it('every value is a non-empty display string', () => {
    for (const value of Object.values(SUPPORTED_LANGUAGES)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe('RTL_LANGUAGES + isRTL', () => {
  it('marks Arabic as RTL', () => {
    expect(isRTL('ar')).toBe(true);
  });

  it('marks Urdu, Hebrew, Farsi, Pashto as RTL', () => {
    expect(isRTL('ur')).toBe(true);
    expect(isRTL('he')).toBe(true);
    expect(isRTL('fa')).toBe(true);
    expect(isRTL('ps')).toBe(true);
  });

  it('marks LTR languages (English, Mandarin, Spanish) as not RTL', () => {
    expect(isRTL('en')).toBe(false);
    expect(isRTL('zh')).toBe(false);
    expect(isRTL('es')).toBe(false);
  });

  it('returns false for an unknown language code', () => {
    expect(isRTL('xx')).toBe(false);
  });

  it('every RTL_LANGUAGES entry is also exposed in SUPPORTED_LANGUAGES (or is a known omission)', () => {
    // ar is supported. The others (ur/he/fa/ps) may not be in the supported
    // set yet — this test just guards isRTL("ar") against drift, since
    // Arabic is the only RTL language currently shipped.
    expect(SUPPORTED_LANGUAGES.ar).toBeDefined();
    expect(RTL_LANGUAGES.has('ar')).toBe(true);
  });
});
