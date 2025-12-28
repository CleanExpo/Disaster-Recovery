/**
 * Data Intake Agent
 *
 * Validates technician-entered inspection data for NRPG platform.
 *
 * Tools: Read-only validation (Read, Grep)
 * Hooks: PreToolUse validation (address, photos, moisture readings)
 * Subagents: address-validator, photo-validator, moisture-validator
 * Output: ValidatedInspectionData with risk flags
 *
 * Validation Rules:
 * - Australian postcode format (4 digits)
 * - Minimum 3 photos required
 * - Moisture readings 0-100%
 * - Photo resolution >= 1024x768
 * - Photo file size <= 10MB
 *
 * Risk Flags:
 * - HIGH_SEVERITY_DAMAGE
 * - ABNORMAL_MOISTURE_LEVELS
 * - UNUSUALLY_SHORT_INSPECTION
 */

import { query, HookCallback } from "@anthropic-ai/claude-agent-sdk";

// ============================================================================
// Type Definitions
// ============================================================================

export interface InspectionData {
  propertyAddress: string;
  postcode: string;
  photos: PhotoData[];
  moistureReadings: MoistureReading[];
  damageDescription: string;
  inspectionDuration: number; // minutes
  technicianId: string;
  timestamp: string;
}

export interface PhotoData {
  filename: string;
  width: number;
  height: number;
  fileSize: number; // bytes
  caption?: string;
}

export interface MoistureReading {
  location: string;
  percentage: number;
  material: string;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
}

export type RiskFlag =
  | "HIGH_SEVERITY_DAMAGE"
  | "ABNORMAL_MOISTURE_LEVELS"
  | "UNUSUALLY_SHORT_INSPECTION"
  | "INSUFFICIENT_PHOTOS"
  | "PHOTO_QUALITY_ISSUES";

export interface ValidatedInspectionData {
  data: InspectionData;
  isValid: boolean;
  errors: ValidationError[];
  riskFlags: RiskFlag[];
  validatedAt: string;
  validationVersion: string;
}

// ============================================================================
// Subagent: Address Validator
// ============================================================================

/**
 * Address Validator Subagent
 * Validates Australian addresses and postcodes
 */
async function validateAddressSubagent(
  address: string,
  postcode: string
): Promise<{ isValid: boolean; errors: ValidationError[] }> {
  const errors: ValidationError[] = [];

  // Validate Australian postcode format (4 digits)
  const postcodeRegex = /^\d{4}$/;
  if (!postcodeRegex.test(postcode)) {
    errors.push({
      field: "postcode",
      message: `Invalid Australian postcode format: ${postcode}. Must be 4 digits.`,
      severity: "error",
    });
  }

  // Validate postcode range (valid Australian postcodes: 0200-9999)
  const postcodeNumber = parseInt(postcode, 10);
  if (postcodeNumber < 200 || postcodeNumber > 9999) {
    errors.push({
      field: "postcode",
      message: `Postcode ${postcode} is outside valid Australian range (0200-9999).`,
      severity: "error",
    });
  }

  // Validate address is not empty
  if (!address || address.trim().length === 0) {
    errors.push({
      field: "propertyAddress",
      message: "Property address cannot be empty.",
      severity: "error",
    });
  }

  // Validate address has minimum required components
  const addressComponents = address.split(",").map((s) => s.trim());
  if (addressComponents.length < 2) {
    errors.push({
      field: "propertyAddress",
      message:
        "Address must include at least street address and suburb (e.g., '123 Main St, Brisbane').",
      severity: "warning",
    });
  }

  return {
    isValid: errors.filter((e) => e.severity === "error").length === 0,
    errors,
  };
}

// ============================================================================
// Subagent: Photo Validator
// ============================================================================

/**
 * Photo Validator Subagent
 * Validates photo resolution and file size
 */
async function validatePhotosSubagent(
  photos: PhotoData[]
): Promise<{ isValid: boolean; errors: ValidationError[]; riskFlags: RiskFlag[] }> {
  const errors: ValidationError[] = [];
  const riskFlags: RiskFlag[] = [];

  // Minimum 3 photos required
  if (photos.length < 3) {
    errors.push({
      field: "photos",
      message: `Insufficient photos: ${photos.length} provided, minimum 3 required.`,
      severity: "error",
    });
    riskFlags.push("INSUFFICIENT_PHOTOS");
  }

  // Validate each photo
  photos.forEach((photo, index) => {
    // Check resolution (minimum 1024x768)
    if (photo.width < 1024 || photo.height < 768) {
      errors.push({
        field: `photos[${index}]`,
        message: `Photo "${photo.filename}" has insufficient resolution (${photo.width}x${photo.height}). Minimum 1024x768 required.`,
        severity: "error",
      });
      riskFlags.push("PHOTO_QUALITY_ISSUES");
    }

    // Check file size (maximum 10MB)
    const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
    if (photo.fileSize > maxFileSize) {
      errors.push({
        field: `photos[${index}]`,
        message: `Photo "${photo.filename}" exceeds maximum file size (${(photo.fileSize / 1024 / 1024).toFixed(2)}MB). Maximum 10MB allowed.`,
        severity: "error",
      });
    }

    // Check minimum file size (avoid placeholder images)
    const minFileSize = 100 * 1024; // 100KB
    if (photo.fileSize < minFileSize) {
      errors.push({
        field: `photos[${index}]`,
        message: `Photo "${photo.filename}" is suspiciously small (${(photo.fileSize / 1024).toFixed(2)}KB). May be a placeholder or low-quality image.`,
        severity: "warning",
      });
    }
  });

  // Deduplicate risk flags
  const uniqueRiskFlags = Array.from(new Set(riskFlags));

  return {
    isValid: errors.filter((e) => e.severity === "error").length === 0,
    errors,
    riskFlags: uniqueRiskFlags,
  };
}

// ============================================================================
// Subagent: Moisture Validator
// ============================================================================

/**
 * Moisture Validator Subagent
 * Validates moisture readings for scientific plausibility
 */
async function validateMoistureSubagent(
  readings: MoistureReading[]
): Promise<{ isValid: boolean; errors: ValidationError[]; riskFlags: RiskFlag[] }> {
  const errors: ValidationError[] = [];
  const riskFlags: RiskFlag[] = [];

  if (readings.length === 0) {
    errors.push({
      field: "moistureReadings",
      message: "At least one moisture reading is required.",
      severity: "error",
    });
  }

  readings.forEach((reading, index) => {
    // Validate percentage range (0-100%)
    if (reading.percentage < 0 || reading.percentage > 100) {
      errors.push({
        field: `moistureReadings[${index}]`,
        message: `Invalid moisture reading at "${reading.location}": ${reading.percentage}%. Must be between 0-100%.`,
        severity: "error",
      });
    }

    // Flag abnormally high moisture levels (>60% typically indicates severe water damage)
    if (reading.percentage > 60) {
      errors.push({
        field: `moistureReadings[${index}]`,
        message: `Abnormally high moisture reading at "${reading.location}": ${reading.percentage}%. Requires immediate attention.`,
        severity: "warning",
      });
      riskFlags.push("ABNORMAL_MOISTURE_LEVELS");
    }

    // Validate location is not empty
    if (!reading.location || reading.location.trim().length === 0) {
      errors.push({
        field: `moistureReadings[${index}]`,
        message: "Moisture reading location cannot be empty.",
        severity: "error",
      });
    }

    // Validate material is specified
    if (!reading.material || reading.material.trim().length === 0) {
      errors.push({
        field: `moistureReadings[${index}]`,
        message: "Material type must be specified for moisture reading.",
        severity: "error",
      });
    }
  });

  // Deduplicate risk flags
  const uniqueRiskFlags = Array.from(new Set(riskFlags));

  return {
    isValid: errors.filter((e) => e.severity === "error").length === 0,
    errors,
    riskFlags: uniqueRiskFlags,
  };
}

// ============================================================================
// Validation Hooks
// ============================================================================

/**
 * PreToolUse Hook
 * Validates data before executing validation tools
 */
const preToolUseHook: HookCallback = async (params) => {
  const { toolName, toolInput } = params;

  // Log tool usage for audit trail
  console.log(`[Data Intake Agent] PreToolUse: ${toolName}`, toolInput);

  // Validate tool usage is read-only
  const allowedTools = ["Read", "Grep"];
  if (!allowedTools.includes(toolName)) {
    throw new Error(
      `[Data Intake Agent] Unauthorized tool: ${toolName}. Only read-only validation tools allowed.`
    );
  }

  return params;
};

// ============================================================================
// Main Agent Execution
// ============================================================================

/**
 * Execute Data Intake Agent
 *
 * Validates inspection data and returns validation results with risk flags.
 *
 * @param inspectionData - Raw inspection data from technician
 * @returns ValidatedInspectionData with validation results and risk flags
 */
export async function executeDataIntakeAgent(
  inspectionData: InspectionData
): Promise<ValidatedInspectionData> {
  console.log("[Data Intake Agent] Starting validation...");

  const allErrors: ValidationError[] = [];
  const allRiskFlags: RiskFlag[] = [];

  try {
    // ========================================================================
    // Step 1: Validate Address
    // ========================================================================
    console.log("[Data Intake Agent] Validating address...");
    const addressValidation = await validateAddressSubagent(
      inspectionData.propertyAddress,
      inspectionData.postcode
    );
    allErrors.push(...addressValidation.errors);

    // ========================================================================
    // Step 2: Validate Photos
    // ========================================================================
    console.log("[Data Intake Agent] Validating photos...");
    const photoValidation = await validatePhotosSubagent(inspectionData.photos);
    allErrors.push(...photoValidation.errors);
    allRiskFlags.push(...photoValidation.riskFlags);

    // ========================================================================
    // Step 3: Validate Moisture Readings
    // ========================================================================
    console.log("[Data Intake Agent] Validating moisture readings...");
    const moistureValidation = await validateMoistureSubagent(
      inspectionData.moistureReadings
    );
    allErrors.push(...moistureValidation.errors);
    allRiskFlags.push(...moistureValidation.riskFlags);

    // ========================================================================
    // Step 4: Validate Inspection Duration
    // ========================================================================
    console.log("[Data Intake Agent] Validating inspection duration...");
    if (inspectionData.inspectionDuration < 15) {
      allErrors.push({
        field: "inspectionDuration",
        message: `Inspection duration (${inspectionData.inspectionDuration} minutes) is unusually short. Typical inspections take 30-60 minutes.`,
        severity: "warning",
      });
      allRiskFlags.push("UNUSUALLY_SHORT_INSPECTION");
    }

    // ========================================================================
    // Step 5: Detect High Severity Damage Keywords
    // ========================================================================
    console.log("[Data Intake Agent] Analyzing damage description...");
    const highSeverityKeywords = [
      "structural",
      "collapse",
      "severe",
      "extensive",
      "flooding",
      "category 3",
      "black water",
      "sewage",
      "mold growth",
      "electrical hazard",
    ];

    const damageDescriptionLower = inspectionData.damageDescription.toLowerCase();
    const hasHighSeverity = highSeverityKeywords.some((keyword) =>
      damageDescriptionLower.includes(keyword)
    );

    if (hasHighSeverity) {
      allErrors.push({
        field: "damageDescription",
        message:
          "Damage description contains high-severity keywords. Requires priority review.",
        severity: "warning",
      });
      allRiskFlags.push("HIGH_SEVERITY_DAMAGE");
    }

    // ========================================================================
    // Step 6: Use Claude Agent SDK for Advanced Validation
    // ========================================================================
    console.log("[Data Intake Agent] Running AI-powered validation...");

    const validationPrompt = `
You are a data validation specialist for disaster recovery inspections.

Review the following inspection data and identify any concerns or inconsistencies:

**Property Address**: ${inspectionData.propertyAddress}, ${inspectionData.postcode}
**Inspection Duration**: ${inspectionData.inspectionDuration} minutes
**Number of Photos**: ${inspectionData.photos.length}
**Number of Moisture Readings**: ${inspectionData.moistureReadings.length}
**Damage Description**: ${inspectionData.damageDescription}

**Moisture Readings**:
${inspectionData.moistureReadings.map((r) => `- ${r.location}: ${r.percentage}% (${r.material})`).join("\n")}

Analyze this data for:
1. Consistency between damage description and moisture readings
2. Logical coherence of the inspection data
3. Any red flags that suggest data quality issues
4. Whether the inspection appears complete and thorough

Provide a brief assessment (2-3 sentences) of data quality and any concerns.
`;

    const aiValidationResult = await query({
      prompt: validationPrompt,
      hooks: {
        preToolUse: preToolUseHook,
      },
      allowedTools: ["Read", "Grep"],
      maxTurns: 3,
    });

    console.log("[Data Intake Agent] AI Validation Result:", aiValidationResult);

    // ========================================================================
    // Step 7: Compile Validation Results
    // ========================================================================
    const isValid = allErrors.filter((e) => e.severity === "error").length === 0;
    const uniqueRiskFlags = Array.from(new Set(allRiskFlags));

    const validatedData: ValidatedInspectionData = {
      data: inspectionData,
      isValid,
      errors: allErrors,
      riskFlags: uniqueRiskFlags,
      validatedAt: new Date().toISOString(),
      validationVersion: "1.0.0",
    };

    console.log(
      `[Data Intake Agent] Validation complete. Valid: ${isValid}, Errors: ${allErrors.length}, Risk Flags: ${uniqueRiskFlags.length}`
    );

    return validatedData;
  } catch (error) {
    console.error("[Data Intake Agent] Validation failed:", error);

    // Return validation failure
    return {
      data: inspectionData,
      isValid: false,
      errors: [
        {
          field: "system",
          message: `Validation system error: ${error instanceof Error ? error.message : "Unknown error"}`,
          severity: "error",
        },
      ],
      riskFlags: [],
      validatedAt: new Date().toISOString(),
      validationVersion: "1.0.0",
    };
  }
}

// ============================================================================
// Export Subagents for Testing
// ============================================================================

export const subagents = {
  validateAddress: validateAddressSubagent,
  validatePhotos: validatePhotosSubagent,
  validateMoisture: validateMoistureSubagent,
};
