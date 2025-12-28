/**
 * Claude Agent SDK Agents for NRPG Platform
 *
 * Multi-agent system for disaster recovery report processing:
 * 1. Data Intake Agent (validates technician inspection data)
 * 2. Report Generation Agent (generates NRPG-compliant reports)
 * 3. Quality Assurance Agent (QA approval/rejection)
 * 4. Operations Agent (delivery, billing, CRM)
 */

// Data Intake Agent
export {
  executeDataIntakeAgent,
  subagents as dataIntakeSubagents,
  type InspectionData,
  type PhotoData,
  type MoistureReading,
  type ValidationError,
  type RiskFlag,
  type ValidatedInspectionData,
} from "./data-intake-agent";

// Report Generation Agent
export {
  executeReportGenerationAgent,
  subagents as reportGenerationSubagents,
  type WaterDamageCategory,
  type Jurisdiction,
  type IICRCStandard,
  type CostEstimate,
  type JurisdictionRequirements,
  type NRPGReport,
  type ReportValidationError,
} from "./report-generation-agent";

// Quality Assurance Agent
export {
  executeQualityAssuranceAgent,
  meetsQualityThresholds,
  generateQASummary,
  type QAResult
} from "./quality-assurance-agent";

// Operations Agent
export {
  executeOperationsAgent,
  isOperationComplete,
  generateOperationsSummary,
  getAuditLog,
  clearAuditLog,
  type OperationsResult
} from "./operations-agent";

// CEO Oversight Agent
export {
  executeCEOOversightAgent,
  exportDashboardToPDF,
  getRealTimeMetrics,
  type CEODashboardMetrics,
  type PipelineMetrics,
  type CustomerHealthMetrics,
  type RevenueMetrics,
  type OperationsMetrics,
  type BusinessRuleViolation,
  type Alert,
  type Recommendation,
  type CEOOversightResult
} from './ceo-oversight-agent';

// Agent Orchestrator
export {
  orchestrateInspectionWorkflow,
  resumeWorkflowFromRevision,
  type InspectionData as OrchestratorInspectionData,
  type InspectionFinding,
  type Photo,
  type WorkflowState,
  type DataIntakeResult as OrchestratorDataIntakeResult,
  type ReportGenerationResult as OrchestratorReportGenerationResult,
  type QualityAssuranceResult as OrchestratorQualityAssuranceResult,
  type OperationsResult as OrchestratorOperationsResult,
  type QAIssue
} from './agent-orchestrator';
