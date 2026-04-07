/**
 * /api/translate/supported-languages
 *
 * DR-386: Simple GET endpoint returning the list of supported translation languages.
 * Useful for the language selector to dynamically fetch available languages.
 *
 * GET → { languages: Record<string, string>, rtl: string[] }
 */

import { NextResponse } from 'next/server';
import { SUPPORTED_LANGUAGES, RTL_LANGUAGES } from '@/lib/supported-languages';

export async function GET() {
  return NextResponse.json({
    languages: SUPPORTED_LANGUAGES,
    rtl: Array.from(RTL_LANGUAGES),
  });
}
