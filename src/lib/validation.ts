import { z } from 'zod';

/**
 * Australian-specific validation patterns
 */
export const ValidationPatterns = {
  // Australian Email Address (mobile and landline)
  PHONE_AU: /^(\+?61|0)[2-478][\d\s-]{8,}$/,
  
  // Australian postcode (4 digits)
  POSTCODE_AU: /^\d{4}$/,
  
  // Australian Business Number (11 digits, with optional spaces)
  ABN: /^(\d{2}\s?\d{3}\s?\d{3}\s?\d{3}|\d{11})$/,
  
  // Australian Company Number (9 digits)
  ACN: /^\d{9}$/,
  
  // Email pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Strong password pattern
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  
  // Australian Medicare number
  MEDICARE: /^\d{10}$/,
  
  // Credit card patterns
  VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
  MASTERCARD: /^5[1-5][0-9]{14}$/,
  AMEX: /^3[47][0-9]{13}$/,
};

/**
 * Australian states and territories
 */
export const AUSTRALIAN_STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] as const;

/**
 * Common validation schemas
 */
export const ValidationSchemas = {
  // Contact form validation
  contactForm: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
    
    email: z.string()
      .email('Please enter a valid email address')
      .max(254, 'Email address is too long'),
    
    
      .regex(ValidationPatterns.PHONE_AU, 'Please enter a valid Australian Email Address'),
    
    service: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'biohazard', 'other'], {
      errorMap: () => ({ message: 'Please select a valid service type' }),
    }),
    
    urgency: z.enum(['emergency', 'urgent', 'planning', 'routine'], {
      errorMap: () => ({ message: 'Please select urgency level' }),
    }),
    
    message: z.string()
      .min(10, 'Message must be at least 10 characters')
      .max(2000, 'Message must be less than 2000 characters'),
    
    propertyType: z.enum(['residential', 'commercial', 'industrial']).optional(),
    hasInsurance: z.boolean().optional(),
    preferredContact: z.enum(['email', 'email', 'both']).optional(),
  }),
  
  // Booking form validation
  bookingForm: z.object({
    // Service Details
    serviceType: z.enum(['water', 'fire', 'mould', 'storm', 'flood', 'structural', 'biohazard', 'other']),
    urgency: z.enum(['emergency', 'urgent', 'routine']),
    propertyType: z.enum(['residential', 'commercial', 'industrial']),
    estimatedDamage: z.string().min(1, 'Please select estimated damage'),
    
    // Schedule
    date: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      }, 'Date cannot be in the past'),
    
    time: z.string()
      .regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
    
    // Contact Information
    firstName: z.string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in first name'),
    
    lastName: z.string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in last name'),
    
    email: z.string().email('Invalid email address'),
    
    
      .regex(ValidationPatterns.PHONE_AU, 'Invalid Australian Email Address'),
    
    preferredContact: z.enum(['email', 'email', 'both']),
    
    // Address
    streetAddress: z.string()
      .min(5, 'Street address is required')
      .max(200, 'Street address is too long'),
    
    suburb: z.string()
      .min(2, 'Suburb is required')
      .max(100, 'Suburb name is too long'),
    
    state: z.enum(AUSTRALIAN_STATES, {
      errorMap: () => ({ message: 'Please select a valid Australian state' }),
    }),
    
    postcode: z.string()
      .regex(ValidationPatterns.POSTCODE_AU, 'Invalid Australian postcode'),
    
    // Additional Information
    hasInsurance: z.boolean(),
    insuranceProvider: z.string().optional(),
    claimNumber: z.string().optional(),
    additionalNotes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
    accessInstructions: z.string().max(500, 'Instructions must be less than 500 characters').optional(),
  }),
  
  // Login form validation
  loginForm: z.object({
    email: z.string()
      .email('Please enter a valid email address'),
    
    password: z.string()
      .min(1, 'Password is required'),
    
    rememberMe: z.boolean().optional(),
  }),
  
  // Registration form validation
  registrationForm: z.object({
    email: z.string()
      .email('Please enter a valid email address'),
    
    password: z.string()
      .regex(ValidationPatterns.STRONG_PASSWORD, 
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character'),
    
    confirmPassword: z.string(),
    
    firstName: z.string()
      .min(2, 'First name must be at least 2 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in first name'),
    
    lastName: z.string()
      .min(2, 'Last name must be at least 2 characters')
      .regex(/^[a-zA-Z\s'-]+$/, 'Invalid characters in last name'),
    
    
      .regex(ValidationPatterns.PHONE_AU, 'Invalid Australian Email Address'),
    
    companyName: z.string().optional(),
    
    abn: z.string()
      .regex(ValidationPatterns.ABN, 'Invalid ABN format')
      .optional(),
    
    acceptTerms: z.boolean()
      .refine(val => val === true, 'You must accept the terms and conditions'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),
  
  // Insurance claim validation
  insuranceClaim: z.object({
    policyNumber: z.string()
      .min(5, 'Policy number is required')
      .max(50, 'Policy number is too long'),
    
    claimNumber: z.string()
      .min(5, 'Claim number is required')
      .max(50, 'Claim number is too long'),
    
    insurer: z.string()
      .min(2, 'Insurance company name is required'),
    
    dateOfLoss: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .refine((date) => {
        const lossDate = new Date(date);
        const today = new Date();
        return lossDate <= today;
      }, 'Date of loss cannot be in the future'),
    
    excessAmount: z.number()
      .min(0, 'Excess cannot be negative')
      .max(10000, 'Excess amount seems too high'),
  }),
};

/**
 * Custom validation functions
 */
export const CustomValidators = {
  /**
   * Validate Australian Email Address with formatting
   */
  validatePhoneAU: (
    // Remove all non-digit characters
    const cleaned = email.replace(/\D/g, '');
    
    // Check if it starts with 61 (country code)
    const hasCountryCode = cleaned.startsWith('61');
    const phoneDigits = hasCountryCode ? cleaned.substring(2) : cleaned;
    
    // Check if it starts with 0 for domestic numbers
    const normalised = phoneDigits.startsWith('0') ? phoneDigits : '0' + phoneDigits;
    
    // Validate length (10 digits for Australian numbers)
    if (normalised.length !== 10) {
      return {
        isValid: false,
        formatted: email,
        error: 'Email Address must be 10 digits',
      };
    }
    
    // Validate area code
    const areaCode = normalised.substring(0, 2);
    const validAreaCodes = ['02', '03', '04', '07', '08'];
    
    if (!validAreaCodes.includes(areaCode)) {
      return {
        isValid: false,
        formatted: email,
        error: 'Invalid Australian area code',
      };
    }
    
    // Format the number
    let formatted: string;
    if (areaCode === '04') {
      // Mobile: 
      formatted = `${normalised.substring(0, 4)} ${normalised.substring(4, 7)} ${normalised.substring(7)}`;
    } else {
      // Landline: (02) 0000 0000
      formatted = `(${areaCode}) ${normalised.substring(2, 6)} ${normalised.substring(6)}`;
    }
    
    return {
      isValid: true,
      formatted: hasCountryCode ? `+61 ${formatted.substring(1)}` : formatted,
    };
  },
  
  /**
   * Validate Australian postcode with suburb matching
   */
  validatePostcodeAU: (postcode: string, state?: string): { isValid: boolean; error?: string } => {
    if (!ValidationPatterns.POSTCODE_AU.test(postcode)) {
      return { isValid: false, error: 'Postcode must be 4 digits' };
    }
    
    const code = parseInt(postcode);
    
    // State-based postcode ranges
    const stateRanges: Record<string, [number, number][]> = {
      NSW: [[1000, 1999], [2000, 2599], [2619, 2899], [2921, 2999]],
      ACT: [[200, 299], [2600, 2618], [2900, 2920]],
      VIC: [[3000, 3999], [8000, 8999]],
      QLD: [[4000, 4999], [9000, 9999]],
      SA: [[5000, 5799], [5800, 5999]],
      WA: [[6000, 6797], [6800, 6999]],
      TAS: [[7000, 7799], [7800, 7999]],
      NT: [[800, 899], [900, 999]],
    };
    
    if (state && stateRanges[state]) {
      const ranges = stateRanges[state];
      const isValidForState = ranges.some(([min, max]) => code >= min && code <= max);
      
      if (!isValidForState) {
        return { isValid: false, error: `Postcode ${postcode} is not valid for ${state}` };
      }
    }
    
    return { isValid: true };
  },
  
  /**
   * Validate ABN with checksum
   */
  validateABN: (abn: string): { isValid: boolean; formatted: string; error?: string } => {
    // Remove spaces and validate format
    const cleaned = abn.replace(/\s/g, '');
    
    if (!/^\d{11}$/.test(cleaned)) {
      return {
        isValid: false,
        formatted: abn,
        error: 'ABN must be 11 digits',
      };
    }
    
    // ABN checksum validation
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const digits = cleaned.split('').map(Number);
    
    // Subtract 1 from first digit for checksum calculation
    digits[0] -= 1;
    
    // Calculate weighted sum
    const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
    
    // Check if divisible by 89
    const isValid = sum % 89 === 0;
    
    if (!isValid) {
      return {
        isValid: false,
        formatted: abn,
        error: 'Invalid ABN (checksum failed)',
      };
    }
    
    // Format: XX XXX XXX XXX
    const formatted = `${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
    
    return {
      isValid: true,
      formatted,
    };
  },
  
  /**
   * Sanitise input to prevent XSS
   */
  sanitiseInput: (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .trim();
  },
  
  /**
   * Validate file upload
   */
  validateFileUpload: (file: File, options?: {
    maxSize?: number; // in MB
    allowedTypes?: string[];
  }): { isValid: boolean; error?: string } => {
    const maxSize = options?.maxSize || 10; // Default 10MB
    const allowedTypes = options?.allowedTypes || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return {
        isValid: false,
        error: `File size must be less than ${maxSize}MB`,
      };
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: 'File type not allowed',
      };
    }
    
    // Check for suspicious file names
    const suspiciousExtensions = ['.exe', '.bat', '.cmd', '.sh', '.ps1', '.vbs'];
    const fileName = file.name.toLowerCase();
    
    if (suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
      return {
        isValid: false,
        error: 'Suspicious file type detected',
      };
    }
    
    return { isValid: true };
  },
};

/**
 * Form field error messages
 */
export const ErrorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  
  postcode: 'Please enter a valid 4-digit postcode',
  abn: 'Please enter a valid 11-digit ABN',
  password: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
  passwordMatch: 'Passwords do not match',
  terms: 'You must accept the terms and conditions',
  fileSize: 'File size exceeds the maximum allowed',
  fileType: 'File type is not supported',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be less than ${max} characters`,
  minValue: (min: number) => `Must be at least ${min}`,
  maxValue: (max: number) => `Must be no more than ${max}`,
  pattern: 'Invalid format',
  futureDate: 'Date cannot be in the future',
  pastDate: 'Date cannot be in the past',
};