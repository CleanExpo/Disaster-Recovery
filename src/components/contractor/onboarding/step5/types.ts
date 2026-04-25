import * as z from 'zod'
import type { Control } from 'react-hook-form'

export const safetySchema = z.object({
  // WHS Policy & Procedures
  whsPolicyDocument: z.string().min(1, "WHS policy document is required"),
  whsPolicyVersion: z.string().min(1, "Policy version is required"),
  whsPolicyReviewDate: z.string().min(1, "Review date is required"),
  safeWorkMethodStatements: z.boolean(),
  swmsCategories: z.array(z.string()).min(1, "Select at least one SWMS category"),

  // Safety Management System
  safetyManagementSystem: z.enum(['internal', 'external', 'hybrid']),
  safetyOfficerName: z.string().optional(),
  safetyOfficerContact: z.string().optional(),
  safetyMeetingFrequency: z.enum(['weekly', 'fortnightly', 'monthly', 'quarterly']),

  // Training & Competency
  inductionProcess: z.boolean(),
  trainingRecordSystem: z.enum(['digital', 'paper', 'hybrid']),
  mandatoryTraining: z.array(z.object({
    trainingType: z.string(),
    provider: z.string(),
    frequency: z.string(),
    lastCompleted: z.string()
  })),

  // Certifications & Tickets
  certifications: z.array(z.object({
    certificationType: z.string(),
    certNumber: z.string(),
    expiryDate: z.string(),
    holder: z.string()
  })),

  // PPE & Equipment
  ppeProvided: z.boolean(),
  ppeTypes: z.array(z.string()).min(1, "Select PPE types provided"),
  equipmentMaintenance: z.boolean(),
  maintenanceSchedule: z.enum(['monthly', 'quarterly', 'biannual', 'annual']),

  // Incident Management
  incidentReportingSystem: z.boolean(),
  incidentReportingMethod: z.enum(['digital', 'paper', 'phone', 'mixed']),
  nearMissReporting: z.boolean(),
  incidentInvestigationProcess: z.boolean(),
  workersCompClaims: z.number().min(0),
  lostTimeInjuries: z.number().min(0),

  // Risk Management
  riskAssessmentProcess: z.boolean(),
  hazardIdentification: z.boolean(),
  jsaProcess: z.boolean(), // Job Safety Analysis
  takesFiveImplemented: z.boolean(), // Take 5 safety checks

  // Emergency Procedures
  emergencyResponsePlan: z.boolean(),
  evacuationProcedures: z.boolean(),
  firstAidCapability: z.boolean(),
  firstAiders: z.array(z.object({
    name: z.string(),
    certification: z.string(),
    expiryDate: z.string()
  })),

  // Compliance & Auditing
  safetyAuditsFrequency: z.enum(['monthly', 'quarterly', 'biannual', 'annual', 'none']),
  externalAudits: z.boolean(),
  lastAuditDate: z.string().optional(),
  complianceScore: z.number().min(0).max(100).optional(),

  // Mental Health & Wellbeing
  mentalHealthPolicy: z.boolean(),
  eapProgram: z.boolean(), // Employee Assistance Program
  fatigueManagement: z.boolean(),

  // Additional Commitments
  commitToNRPStandards: z.boolean().refine(val => val === true, {
    message: "You must commit to NRPG safety standards"
  }),
  shareIncidentData: z.boolean(),
  participateInSafetyPrograms: z.boolean()
})

export type HealthSafetyFormValues = z.infer<typeof safetySchema>

export interface Step5SectionProps {
  control: Control<HealthSafetyFormValues>
}

export const swmsOptions = [
  'Water Damage Restoration',
  'Fire Damage Restoration',
  'Mould Remediation',
  'Biohazard Cleaning',
  'Asbestos Work',
  'Working at Heights',
  'Confined Spaces',
  'Electrical Work',
  'Chemical Handling',
  'Heavy Machinery Operation',
  'Demolition Work',
  'Structural Repairs'
]

export const ppeOptions = [
  'Safety Helmets/Hard Hats',
  'Safety Glasses/Goggles',
  'Face Shields',
  'Respirators/Masks',
  'Hearing Protection',
  'High-Vis Clothing',
  'Safety Boots',
  'Gloves (Various Types)',
  'Fall Protection/Harnesses',
  'Chemical Suits',
  'Cut-Resistant Gear'
]

export const trainingTypes = [
  'White Card (Construction Induction)',
  'Working at Heights',
  'Confined Space Entry',
  'First Aid/CPR',
  'Fire Safety',
  'Manual Handling',
  'Hazardous Substances',
  'Asbestos Awareness',
  'Electrical Safety',
  'Emergency Response',
  'Mental Health First Aid'
]
