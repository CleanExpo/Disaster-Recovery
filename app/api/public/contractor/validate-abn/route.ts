/**
 * ABN Validation API
 *
 * POST /api/public/contractor/validate-abn
 * Validates Australian Business Numbers using ABN Lookup API
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { abn } = await request.json();

    if (!abn) {
      return NextResponse.json(
        { valid: false, error: 'ABN is required' },
        { status: 400 }
      );
    }

    // Remove spaces and formatting
    const cleanABN = abn.replace(/\s/g, '');

    // Basic validation: Must be 11 digits
    if (!/^\d{11}$/.test(cleanABN)) {
      return NextResponse.json({
        valid: false,
        error: 'ABN must be 11 digits',
      });
    }

    // Calculate ABN checksum
    const isValidChecksum = validateABNChecksum(cleanABN);

    if (!isValidChecksum) {
      return NextResponse.json({
        valid: false,
        error: 'Invalid ABN checksum',
      });
    }

    // TODO: Integrate with official ABN Lookup API
    // https://abr.business.gov.au/abrxmlsearch/
    // Requires GUID registration

    // For now, return valid if checksum is correct
    // In production, you would call the ABN Lookup API here

    // Example ABN Lookup API call (requires GUID):
    // const abnLookupUrl = `https://abr.business.gov.au/abrxmlsearch/AbrXmlSearch.asmx/SearchByABNv202001?searchString=${cleanABN}&includeHistoricalDetails=N&authenticationGuid=${process.env.ABN_LOOKUP_GUID}`;
    // const response = await fetch(abnLookupUrl);
    // const data = await response.text(); // XML response
    // Parse XML and validate

    return NextResponse.json({
      valid: true,
      abn: cleanABN,
      formatted: formatABN(cleanABN),
      // In production, include business details from ABN Lookup:
      // businessName: 'Example Company Pty Ltd',
      // entityType: 'Australian Private Company',
      // gst: true,
    });
  } catch (error) {
    console.error('ABN validation error:', error);
    return NextResponse.json(
      {
        valid: false,
        error: 'Failed to validate ABN',
      },
      { status: 500 }
    );
  }
}

/**
 * Validate ABN using checksum algorithm
 * https://abr.business.gov.au/Help/AbnFormat
 */
function validateABNChecksum(abn: string): boolean {
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  const digits = abn.split('').map(Number);

  // Subtract 1 from first digit
  digits[0] = digits[0] - 1;

  // Multiply each digit by its weight and sum
  const sum = digits.reduce((acc, digit, index) => {
    return acc + digit * weights[index];
  }, 0);

  // Check if sum is divisible by 89
  return sum % 89 === 0;
}

/**
 * Format ABN with spaces for display
 * e.g., 51824753556 -> 51 824 753 556
 */
function formatABN(abn: string): string {
  return abn.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
}
