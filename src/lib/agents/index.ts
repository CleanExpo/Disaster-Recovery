/**
 * Claude Agent SDK Agents for NRPG Platform
 *
 * CLASS 3 AUTONOMOUS CODEBASE - 24 AGENTS
 *
 * Existing Agents (Class 2 - Report Processing):
 * 1. Data Intake Agent (validates technician inspection data)
 * 2. Report Generation Agent (generates NRPG-compliant reports)
 * 3. Quality Assurance Agent (QA approval/rejection)
 * 4. Operations Agent (delivery, billing, CRM)
 * 5. CEO Oversight Agent (business metrics and alerts)
 * 6. Agent Orchestrator (coordinates inspection workflow)
 *
 * New Agents (Class 3 - Development Lifecycle):
 * 7. Code Generation Agent (autonomous feature development)
 * 8. Testing Agent (comprehensive test execution)
 * 9. Security Scanning Agent (vulnerability detection)
 * 10. Deployment Agent (automated deployments)
 * 11. Monitoring Agent (continuous monitoring)
 * 12. Refactoring Agent (code quality improvement)
 * 13. Documentation Agent (doc synchronization)
 *
 * New Agents (Class 3 - Mergance Integration):
 * 14. Repository Analysis Agent (repo scanning)
 * 15. Content Migration Agent (content transfer)
 * 16. Contractor Portal Agent (authentication integration)
 * 17. Integration Testing Agent (merged platform testing)
 *
 * New Agents (Class 3 - Phase 23 Infrastructure):
 * 18. Infrastructure Planning Agent (cloud architecture)
 * 19. Infrastructure Provisioning Agent (resource provisioning)
 * 20. Database Migration Agent (zero-downtime migration)
 * 21. CI/CD Pipeline Agent (automated pipelines)
 * 22. Monitoring Infrastructure Agent (observability stack)
 * 23. Security Infrastructure Agent (production security)
 * 24. Performance Testing Agent (load testing)
 * 25. Production Deployment Agent (production rollout)
 *
 * Meta-Agent (Class 3 - Orchestration):
 * 26. Super-Orchestrator Agent (coordinates all 24 agents, enables Codebase Singularity)
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

// ============================================================================
// CLASS 3 AGENTS - Development Lifecycle
// ============================================================================

export { codeGenerationAgent, type FeatureSpecification, type CodeGenerationResult } from './code-generation-agent';
export { testingAgent, type TestResult, type TestFailure } from './testing-agent';
export { securityScanningAgent, type SecurityReport } from './security-scanning-agent';
export { deploymentAgent, type DeploymentResult } from './deployment-agent';
export { monitoringAgent, type MonitoringResult } from './monitoring-agent';
export { refactoringAgent, type RefactoringResult } from './refactoring-agent';
export { documentationAgent, type DocumentationResult } from './documentation-agent';

// ============================================================================
// CLASS 3 AGENTS - Mergance Integration
// ============================================================================

export { repoAnalysisAgent, type RepoAnalysisResult } from './repo-analysis-agent';
export { contentMigrationAgent, type MigrationResult } from './content-migration-agent';
export { contractorPortalAgent, type PortalIntegrationResult } from './contractor-portal-agent';
export { integrationTestingAgent, type IntegrationTestResult } from './integration-testing-agent';

// ============================================================================
// CLASS 3 AGENTS - Phase 23 Infrastructure
// ============================================================================

export { infrastructurePlanningAgent, type InfrastructurePlan } from './infrastructure-planning-agent';
export { infrastructureProvisioningAgent } from './infrastructure-provisioning-agent';
export { databaseMigrationAgent } from './database-migration-agent';
export { cicdPipelineAgent } from './cicd-pipeline-agent';
export { monitoringInfrastructureAgent } from './monitoring-infrastructure-agent';
export { securityInfrastructureAgent } from './security-infrastructure-agent';
export { performanceTestingAgent } from './performance-testing-agent';
export { productionDeploymentAgent } from './production-deployment-agent';

// ============================================================================
// META-AGENT - Super-Orchestrator (Codebase Singularity)
// ============================================================================

export {
  superOrchestrator,
  processAgentEvent,
  executeManualWorkflow,
  getDailyReport,
  getWeeklyReport,
  runSelfImprovement,
  type AgentEvent,
  type EventType,
  type WorkflowExecution,
  type WorkflowType
} from './super-orchestrator';
