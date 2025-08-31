'use client';

import { useState, useCallback, useEffect } from 'react';
import { z, ZodError, ZodSchema } from 'zod';
import { CustomValidators } from '@/lib/validation';

interface ValidationError {
  field: string;
  message: string;
}

interface UseFormValidationOptions<T> {
  schema: ZodSchema<T>;
  mode?: 'onBlur' | 'onChange' | 'onSubmit';
  sanitise?: boolean;
}

export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  options: UseFormValidationOptions<T>
) {
  const { schema, mode = 'onBlur', sanitise = true } = options;
  
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Validate entire form
  const validateForm = useCallback(async (): Promise<boolean> => {
    try {
      await schema.parseAsync(values);
      setErrors({});
      setIsValid(true);
      return true;
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          newErrors[fieldName] = err.message;
        });
        setErrors(newErrors);
        setIsValid(false);
        return false;
      }
      return false;
    }
  }, [schema, values]);
  
  // Validate single field
  const validateField = useCallback(async (fieldName: string, value: any): Promise<string | null> => {
    try {
      // Create a partial schema for the specific field
      const fieldSchema = schema.shape[fieldName as keyof typeof schema.shape];
      if (fieldSchema) {
        await fieldSchema.parseAsync(value);
        return null;
      }
      return null;
    } catch (error) {
      if (error instanceof ZodError) {
        return error.errors[0]?.message || 'Invalid value';
      }
      return 'Validation error';
    }
  }, [schema]);
  
  // Handle field change
  const handleChange = useCallback(async (
    fieldName: string,
    value: any
  ) => {
    // Sanitise input if enabled
    let sanitisedValue = value;
    if (sanitise && typeof value === 'string') {
      sanitisedValue = CustomValidators.sanitiseInput(value);
    }
    
    // Update values
    setValues(prev => ({ ...prev, [fieldName]: sanitisedValue }));
    
    // Validate on change if mode is onChange
    if (mode === 'onChange' && touched[fieldName]) {
      const error = await validateField(fieldName, sanitisedValue);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error || '',
      }));
    }
  }, [mode, touched, sanitise, validateField]);
  
  // Handle field blur
  const handleBlur = useCallback(async (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    // Validate on blur if mode is onBlur or onChange
    if (mode === 'onBlur' || mode === 'onChange') {
      const error = await validateField(fieldName, values[fieldName]);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error || '',
      }));
    }
  }, [mode, values, validateField]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (
    onSubmit: (values: T) => Promise<void> | void
  ): Promise<void> => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(values).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate form
    const isFormValid = await validateForm();
    
    if (isFormValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
  }, [values, validateForm]);
  
  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Set field value programmatically
  const setFieldValue = useCallback((fieldName: string, value: any) => {
    handleChange(fieldName, value);
  }, [handleChange]);
  
  // Set field error programmatically
  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    setIsValid(false);
  }, []);
  
  // Clear field error
  const clearFieldError = useCallback((fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);
  
  // Validate form on values change (for real-time validation)
  useEffect(() => {
    if (mode === 'onChange' && Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [values, mode, touched, validateForm]);
  
  // Format Email Address
  const formatPhoneNumber = useCallback((
    const result = CustomValidators.validatePhoneAU(email);
    return result.formatted;
  }, []);
  
  // Format ABN
  const formatABN = useCallback((abn: string): string => {
    const result = CustomValidators.validateABN(abn);
    return result.formatted;
  }, []);
  
  // Get field props for input elements
  const getFieldProps = useCallback((fieldName: string) => ({
    name: fieldName,
    value: values[fieldName] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      handleChange(fieldName, e.target.value);
    },
    onBlur: () => handleBlur(fieldName),
    'aria-invalid': !!errors[fieldName],
    'aria-describedby': errors[fieldName] ? `${fieldName}-error` : undefined,
  }), [values, errors, handleChange, handleBlur]);
  
  // Get error props for error display
  const getErrorProps = useCallback((fieldName: string) => ({
    id: `${fieldName}-error`,
    role: 'alert',
    'aria-live': 'polite' as const,
  }), []);
  
  return {
    // Form state
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    
    // Form handlers
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    
    // Field helpers
    setFieldValue,
    setFieldError,
    clearFieldError,
    getFieldProps,
    getErrorProps,
    
    // Formatting helpers
    formatPhoneNumber,
    formatABN,
    
    // Validation
    validateForm,
    validateField,
  };
}

// Export commonly used validation schemas
export { ValidationSchemas, ValidationPatterns, CustomValidators, ErrorMessages } from '@/lib/validation';