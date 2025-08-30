/**
 * Australian Business Compliance Utilities
 * Handles GST, ABN validation, and Australian Consumer Law requirements
 */

/**
 * Calculate GST (Goods and Services Tax) for Australian transactions
 * GST is 10% in Australia
 */
export function calculateGST(amount: number): {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
} {
  const GST_RATE = 0.10; // 10% GST
  const baseAmount = amount;
  const gstAmount = Math.round(baseAmount * GST_RATE * 100) / 100;
  const totalAmount = baseAmount + gstAmount;
  
  return {
    baseAmount,
    gstAmount,
    totalAmount
  };
}

/**
 * Extract GST from a GST-inclusive amount
 */
export function extractGST(totalAmount: number): {
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
} {
  const GST_RATE = 0.10;
  const baseAmount = Math.round((totalAmount / (1 + GST_RATE)) * 100) / 100;
  const gstAmount = Math.round((totalAmount - baseAmount) * 100) / 100;
  
  return {
    baseAmount,
    gstAmount,
    totalAmount
  };
}

/**
 * Validate Australian Business Number (ABN)
 * ABN is 11 digits with a check digit algorithm
 */
export function validateABN(abn: string): boolean {
  // Remove spaces and non-digits
  const cleanABN = abn.replace(/\s/g, '').replace(/\D/g, '');
  
  // ABN must be 11 digits
  if (cleanABN.length !== 11) {
    return false;
  }
  
  // Weighting factor for ABN validation
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  
  // Subtract 1 from first digit
  const digits = cleanABN.split('').map(Number);
  digits[0] -= 1;
  
  // Calculate weighted sum
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += digits[i] * weights[i];
  }
  
  // Valid if divisible by 89
  return sum % 89 === 0;
}

/**
 * Format ABN for display (XX XXX XXX XXX)
 */
export function formatABN(abn: string): string {
  const clean = abn.replace(/\D/g, '');
  if (clean.length !== 11) return abn;
  
  return `${clean.slice(0, 2)} ${clean.slice(2, 5)} ${clean.slice(5, 8)} ${clean.slice(8, 11)}`;
}

/**
 * Validate Australian Company Number (ACN)
 * ACN is 9 digits with a check digit algorithm
 */
export function validateACN(acn: string): boolean {
  const cleanACN = acn.replace(/\s/g, '').replace(/\D/g, '');
  
  if (cleanACN.length !== 9) {
    return false;
  }
  
  const weights = [8, 7, 6, 5, 4, 3, 2, 1];
  const digits = cleanACN.slice(0, 8).split('').map(Number);
  const checkDigit = Number(cleanACN[8]);
  
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += digits[i] * weights[i];
  }
  
  const calculatedCheck = (10 - (sum % 10)) % 10;
  return calculatedCheck === checkDigit;
}

/**
 * Generate tax invoice number
 */
export function generateInvoiceNumber(prefix: string = 'INV'): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return `${prefix}-${year}${month}-${random}`;
}

/**
 * Format currency for Australian dollars
 */
export function formatAUD(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Australian Consumer Law - Cooling Off Period
 * Returns the cooling off end date (typically 10 business days)
 */
export function calculateCoolingOffPeriod(startDate: Date = new Date()): {
  startDate: Date;
  endDate: Date;
  businessDays: number;
  canCancel: boolean;
} {
  const COOLING_OFF_DAYS = 10; // 10 business days for unsolicited consumer agreements
  
  let businessDays = 0;
  const endDate = new Date(startDate);
  
  while (businessDays < COOLING_OFF_DAYS) {
    endDate.setDate(endDate.getDate() + 1);
    
    // Skip weekends
    if (endDate.getDay() !== 0 && endDate.getDay() !== 6) {
      businessDays++;
    }
  }
  
  const now = new Date();
  const canCancel = now <= endDate;
  
  return {
    startDate,
    endDate,
    businessDays: COOLING_OFF_DAYS,
    canCancel
  };
}

/**
 * Check if date is Australian public holiday
 * Simplified - would need holiday API for accuracy
 */
export function isPublicHoliday(date: Date, state: string): boolean {
  // National holidays (simplified list)
  const nationalHolidays = [
    { month: 0, day: 1 },   // New Year's Day
    { month: 0, day: 26 },  // Australia Day
    { month: 3, day: 25 },  // ANZAC Day
    { month: 11, day: 25 }, // Christmas Day
    { month: 11, day: 26 }, // Boxing Day
  ];
  
  const month = date.getMonth();
  const day = date.getDate();
  
  return nationalHolidays.some(h => h.month === month && h.day === day);
}

/**
 * Validate Australian postcode
 */
export function validatePostcode(postcode: string, state?: string): boolean {
  const code = postcode.replace(/\D/g, '');
  
  if (code.length !== 4) {
    return false;
  }
  
  const num = parseInt(code);
  
  // Australian postcode ranges by state (accurate ranges)
  const ranges: Record<string, [number, number][]> = {
    NSW: [[1000, 2599], [2619, 2899], [2921, 2999]],
    VIC: [[3000, 3999], [8000, 8999]],
    QLD: [[4000, 4999], [9000, 9799]], // QLD doesn't go to 9999
    SA: [[5000, 5799], [5800, 5999]],
    WA: [[6000, 6797], [6800, 6999]],
    TAS: [[7000, 7799], [7800, 7999]],
    NT: [[800, 899], [900, 999]],
    ACT: [[200, 299], [2600, 2618], [2900, 2920]]
  };
  
  if (state) {
    const stateRanges = ranges[state.toUpperCase()];
    if (!stateRanges) return false;
    
    return stateRanges.some(([min, max]) => num >= min && num <= max);
  }
  
  // Check if postcode is in any valid range
  return Object.values(ranges).some(stateRanges =>
    stateRanges.some(([min, max]) => num >= min && num <= max)
  );
}

/**
 * Validate Australian phone number
 */
export function validatePhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Australian mobile: 04XX XXX XXX (10 digits starting with 04)
  if (cleaned.startsWith('04') && cleaned.length === 10) {
    return true;
  }
  
  // Australian landline: 0X XXXX XXXX (10 digits starting with 02,03,07,08)
  if (/^0[2378]\d{8}$/.test(cleaned)) {
    return true;
  }
  
  // International format: +614XX XXX XXX or +612 XXXX XXXX
  if (cleaned.startsWith('61')) {
    const withoutCountry = cleaned.slice(2);
    if (withoutCountry.startsWith('4') && withoutCountry.length === 9) {
      return true;
    }
    if (/^[2378]\d{8}$/.test(withoutCountry)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Format Australian phone number
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('04') && cleaned.length === 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  if (/^0[2378]\d{8}$/.test(cleaned)) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Generate compliant tax invoice
 */
export interface TaxInvoice {
  invoiceNumber: string;
  date: Date;
  businessName: string;
  abn: string;
  customerName: string;
  customerAddress: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    gstInclusive: boolean;
  }>;
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  paymentTerms: string;
  coolingOffNotice?: string;
}

export function generateTaxInvoice(data: Partial<TaxInvoice>): TaxInvoice {
  const items = data.items || [];
  
  let subtotal = 0;
  let gstAmount = 0;
  
  items.forEach(item => {
    const lineTotal = item.quantity * item.unitPrice;
    if (item.gstInclusive) {
      const extracted = extractGST(lineTotal);
      subtotal += extracted.baseAmount;
      gstAmount += extracted.gstAmount;
    } else {
      subtotal += lineTotal;
      gstAmount += lineTotal * 0.10;
    }
  });
  
  const totalAmount = subtotal + gstAmount;
  
  return {
    invoiceNumber: data.invoiceNumber || generateInvoiceNumber(),
    date: data.date || new Date(),
    businessName: data.businessName || 'Disaster Recovery Pty Ltd',
    abn: data.abn || '11 234 567 890',
    customerName: data.customerName || '',
    customerAddress: data.customerAddress || '',
    items,
    subtotal: Math.round(subtotal * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    paymentTerms: data.paymentTerms || 'Due on receipt',
    coolingOffNotice: 'You have the right to cancel this agreement within 10 business days (cooling-off period) as per Australian Consumer Law.'
  };
}