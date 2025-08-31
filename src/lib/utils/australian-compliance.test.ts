/**
 * Australian Compliance Utilities Tests
 * Critical business logic tests for GST, ABN, and consumer law compliance
 */

import {
  calculateGST,
  extractGST,
  validateABN,
  formatABN,
  validateACN,
  calculateCoolingOffPeriod,
  validatePostcode,
  validatePhoneNumber,
  formatPhoneNumber,
  generateTaxInvoice,
  formatAUD
} from './australian-compliance';

describe('Australian GST Calculations', () => {
  test('should calculate GST correctly (10%)', () => {
    const result = calculateGST(1000);
    
    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(100);
    expect(result.totalAmount).toBe(1100);
  });

  test('should calculate GST for booking amount ($2,750)', () => {
    const result = calculateGST(2750);
    
    expect(result.baseAmount).toBe(2750);
    expect(result.gstAmount).toBe(275);
    expect(result.totalAmount).toBe(3025);
  });

  test('should extract GST from inclusive amount', () => {
    const result = extractGST(1100);
    
    expect(result.baseAmount).toBe(1000);
    expect(result.gstAmount).toBe(100);
    expect(result.totalAmount).toBe(1100);
  });

  test('should handle small amounts correctly', () => {
    const result = calculateGST(10);
    
    expect(result.baseAmount).toBe(10);
    expect(result.gstAmount).toBe(1);
    expect(result.totalAmount).toBe(11);
  });
});

describe('ABN Validation', () => {
  test('should validate correct ABN', () => {
    // Test with known valid ABN (Australian Business Number algorithm)
    expect(validateABN('11 004 085 616')).toBe(true);
    expect(validateABN('53004085616')).toBe(true); // Same ABN without spaces
  });

  test('should reject invalid ABN', () => {
    expect(validateABN('11 004 085 617')).toBe(false); // Wrong check digit
    expect(validateABN('1234567890')).toBe(false); // Invalid format
    expect(validateABN('123')).toBe(false); // Too short
    expect(validateABN('123456789012')).toBe(false); // Too long
    expect(validateABN('abc def ghi jkl')).toBe(false); // Non-numeric
  });

  test('should format ABN correctly', () => {
    expect(formatABN('11004085616')).toBe('11 004 085 616');
    expect(formatABN('11 004 085 616')).toBe('11 004 085 616'); // Already formatted
    expect(formatABN('invalid')).toBe('invalid'); // Invalid input
  });
});

describe('ACN Validation', () => {
  test('should validate correct ACN', () => {
    // Test with known valid ACN format
    expect(validateACN('004085616')).toBe(true);
  });

  test('should reject invalid ACN', () => {
    expect(validateACN('004085617')).toBe(false); // Wrong check digit
    expect(validateACN('12345678')).toBe(false); // Too short
    expect(validateACN('1234567890')).toBe(false); // Too long
  });
});

describe('Australian Consumer Law - Cooling Off Period', () => {
  test('should calculate 10 business days cooling off period', () => {
    const startDate = new Date('2024-01-15'); // Monday
    const result = calculateCoolingOffPeriod(startDate);
    
    expect(result.businessDays).toBe(10);
    expect(result.startDate).toEqual(startDate);
    expect(result.endDate.getTime()).toBeGreaterThan(startDate.getTime());
  });

  test('should exclude weekends from cooling off period', () => {
    const friday = new Date('2024-01-12'); // Friday
    const result = calculateCoolingOffPeriod(friday);
    
    // Should skip weekends in calculation
    expect(result.businessDays).toBe(10);
    expect(result.canCancel).toBe(true); // Within cooling off period
  });

  test('should determine if still in cooling off period', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const result = calculateCoolingOffPeriod(yesterday);
    expect(result.canCancel).toBe(true);
  });

  test('should determine if cooling off period has expired', () => {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    
    const result = calculateCoolingOffPeriod(threeWeeksAgo);
    expect(result.canCancel).toBe(false);
  });
});

describe('Australian Postcode Validation', () => {
  test('should validate NSW postcodes', () => {
    expect(validatePostcode('2000', 'NSW')).toBe(true); // Sydney
    expect(validatePostcode('2150', 'NSW')).toBe(true); // Parramatta
    expect(validatePostcode('2500', 'NSW')).toBe(true); // Wollongong
  });

  test('should validate VIC postcodes', () => {
    expect(validatePostcode('3000', 'VIC')).toBe(true); // Melbourne
    expect(validatePostcode('3140', 'VIC')).toBe(true); // Lilydale
  });

  test('should validate QLD postcodes', () => {
    expect(validatePostcode('4000', 'QLD')).toBe(true); // Brisbane
    expect(validatePostcode('4217', 'QLD')).toBe(true); // Gold Coast
  });

  test('should reject invalid postcodes for state', () => {
    expect(validatePostcode('3000', 'NSW')).toBe(false); // VIC postcode for NSW
    expect(validatePostcode('2000', 'VIC')).toBe(false); // NSW postcode for VIC
  });

  test('should validate postcodes without state', () => {
    expect(validatePostcode('2000')).toBe(true); // Valid Australian postcode
    expect(validatePostcode('9999')).toBe(false); // Invalid range
    expect(validatePostcode('123')).toBe(false); // Too short
  });
});

describe('Australian Email Address Validation', () => {
  test('should validate mobile numbers', () => {
    expect(validatePhoneNumber('')).toBe(true);
    expect(validatePhoneNumber('04 1234 5678')).toBe(true); // With spaces
    expect(validatePhoneNumber('Contact Form')).toBe(true); // International format
  });

  test('should validate landline numbers', () => {
    expect(validatePhoneNumber('')).toBe(true); // NSW landline
    expect(validatePhoneNumber('')).toBe(true); // VIC landline
    expect(validatePhoneNumber('')).toBe(true); // QLD landline
  });

  test('should reject invalid email numbers', () => {
    expect(validatePhoneNumber('0112345678')).toBe(false); // Invalid area code
    expect(validatePhoneNumber('12345')).toBe(false); // Too short
    expect(validatePhoneNumber('abc123')).toBe(false); // Non-numeric
  });

  test('should format email numbers correctly', () => {
    expect(formatPhoneNumber('')).toBe('');
    expect(formatPhoneNumber('')).toBe('(02) 8765 4321');
    expect(formatPhoneNumber('invalid')).toBe('invalid'); // Invalid input unchanged
  });
});

describe('Currency Formatting', () => {
  test('should format AUD correctly', () => {
    expect(formatAUD(1000)).toBe('$1,000.00');
    expect(formatAUD(2750)).toBe('$2,750.00'); // Booking amount
    expect(formatAUD(550)).toBe('$550.00'); // Service fee
    expect(formatAUD(12.50)).toBe('$12.50');
  });

  test('should handle large amounts', () => {
    expect(formatAUD(1000000)).toBe('$1,000,000.00');
    expect(formatAUD(1234567.89)).toBe('$1,234,567.89');
  });
});

describe('Tax Invoice Generation', () => {
  test('should generate compliant tax invoice', () => {
    const invoice = generateTaxInvoice({
      customerName: 'John Smith',
      customerAddress: '123 Test St, Sydney NSW 2000',
      items: [
        {
          description: 'Emergency Water Damage Restoration',
          quantity: 1,
          unitPrice: 2750,
          gstInclusive: false
        }
      ]
    });

    expect(invoice.businessName).toBe('Disaster Recovery Pty Ltd');
    expect(invoice.abn).toBe('11 234 567 890');
    expect(invoice.customerName).toBe('John Smith');
    expect(invoice.subtotal).toBe(2750);
    expect(invoice.gstAmount).toBe(275);
    expect(invoice.totalAmount).toBe(3025);
    expect(invoice.coolingOffNotice).toContain('10 business days');
    expect(invoice.invoiceNumber).toMatch(/^INV-\d{6}-[A-Z0-9]{6}$/);
  });

  test('should handle GST inclusive items', () => {
    const invoice = generateTaxInvoice({
      items: [
        {
          description: 'Service Fee (GST Inclusive)',
          quantity: 1,
          unitPrice: 1100, // $1000 + $100 GST
          gstInclusive: true
        }
      ]
    });

    expect(invoice.subtotal).toBe(1000);
    expect(invoice.gstAmount).toBe(100);
    expect(invoice.totalAmount).toBe(1100);
  });

  test('should calculate multiple line items correctly', () => {
    const invoice = generateTaxInvoice({
      items: [
        {
          description: 'Water Extraction',
          quantity: 1,
          unitPrice: 1000,
          gstInclusive: false
        },
        {
          description: 'Structural Drying',
          quantity: 1,
          unitPrice: 1500,
          gstInclusive: false
        }
      ]
    });

    expect(invoice.subtotal).toBe(2500);
    expect(invoice.gstAmount).toBe(250);
    expect(invoice.totalAmount).toBe(2750);
  });
});