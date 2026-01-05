/**
 * NRPG Report Processing Workflow Example
 *
 * Demonstrates the complete workflow using all agents:
 * 1. Data Intake Agent (collects from ServiceM8)
 * 2. Quality Assurance Agent (QA approval)
 * 3. Operations Agent (delivery, billing, CRM)
 */

import {
  executeDataIntakeAgent,
  executeQualityAssuranceAgent,
  executeOperationsAgent,
  meetsQualityThresholds,
  isOperationComplete,
  generateQASummary,
  generateOperationsSummary,
  getAuditLog,
  type QAResult,
  type OperationsResult
} from "./index";
import { logDebug, logError } from '@/lib/logger/helpers';

/**
 * Complete NRPG report processing workflow
 */
export async function processNRPGReport(jobId: string) {
  logDebug(`NRPG REPORT PROCESSING WORKFLOW - Job ID: ${jobId}`, { jobId });

  try {
    // ========================================================================
    // STEP 1: DATA INTAKE
    // ========================================================================
    logDebug("STEP 1: DATA INTAKE - Collecting data from ServiceM8", { jobId });

    const report = await executeDataIntakeAgent({
      jobId,
      propertyAddress: "123 Main St, Brisbane QLD 4000",
      damageType: "water",
      jurisdiction: "QLD"
    });

    logDebug("Data intake complete", {
      sessionId: report.sessionId,
      sections: report.sections?.length || 0,
      photosAnalyzed: report.photosAnalyzed || 0
    });

    // ========================================================================
    // STEP 2: QUALITY ASSURANCE
    // ========================================================================
    logDebug("STEP 2: QUALITY ASSURANCE - Running multi-step QA process", { jobId });

    const qaResult: QAResult = await executeQualityAssuranceAgent(report);

    // Display QA summary
    logDebug("QA Summary", { summary: generateQASummary(qaResult) });

    // Check if approved
    if (qaResult.status !== "APPROVED") {
      logDebug("WORKFLOW TERMINATED: Report not approved", {
        status: qaResult.status,
        complianceScore: qaResult.complianceScore,
        riskFlags: qaResult.riskFlags.length,
        requiredActions: qaResult.requiredActions
      });
      return {
        success: false,
        stage: "QA",
        qaResult
      };
    }

    // Check quality thresholds
    if (!meetsQualityThresholds(qaResult)) {
      logDebug("WORKFLOW WARNING: Quality thresholds not met - Proceeding with caution", {
        complianceScore: qaResult.complianceScore,
        required: 85,
        riskFlags: qaResult.riskFlags.length
      });
    }

    logDebug("Quality assurance passed", {
      complianceScore: qaResult.complianceScore,
      riskFlags: qaResult.riskFlags.length,
      sessionId: qaResult.sessionId
    });

    // ========================================================================
    // STEP 3: OPERATIONS (DELIVERY, BILLING, CRM)
    // ========================================================================
    logDebug("STEP 3: OPERATIONS - Processing delivery, billing, and CRM updates", { jobId });

    const opsResult: OperationsResult = await executeOperationsAgent(report);

    // Display operations summary
    logDebug("Operations Summary", { summary: generateOperationsSummary(opsResult) });

    // Check if operations completed
    if (!isOperationComplete(opsResult)) {
      logDebug("WORKFLOW WARNING: Operations incomplete", {
        emailDelivered: opsResult.emailDelivered,
        invoiceCreated: opsResult.invoiceCreated,
        crmUpdated: opsResult.crmUpdated,
        errors: opsResult.errors
      });

      return {
        success: false,
        stage: "OPERATIONS",
        qaResult,
        opsResult
      };
    }

    logDebug("Operations complete", {
      emailDelivered: true,
      invoiceNumber: opsResult.invoiceNumber,
      crmUpdated: true,
      trackingIds: opsResult.trackingIds
    });

    // Display audit trail
    const auditLog = getAuditLog();
    logDebug("Audit Trail", { entries: auditLog.length });

    // ========================================================================
    // WORKFLOW COMPLETE
    // ========================================================================
    logDebug("WORKFLOW COMPLETE - REPORT SUCCESSFULLY PROCESSED", {
      jobId,
      qaStatus: qaResult.status,
      complianceScore: qaResult.complianceScore,
      invoice: opsResult.invoiceNumber,
      trackingIds: opsResult.trackingIds?.length || 0,
      auditEntries: auditLog.length
    });

    return {
      success: true,
      stage: "COMPLETE",
      qaResult,
      opsResult,
      auditLog
    };

  } catch (error) {
    console.error("\n❌ WORKFLOW FAILED");
    console.error("Error:", error instanceof Error ? error.message : "Unknown error");
    console.error();

    return {
      success: false,
      stage: "ERROR",
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Batch processing for multiple jobs
 */
export async function batchProcessReports(jobIds: string[]) {
  console.log(`\n${"=".repeat(80)}`);
  console.log(`BATCH PROCESSING - ${jobIds.length} Jobs`);
  console.log(`${"=".repeat(80)}\n`);

  const results = [];

  for (let i = 0; i < jobIds.length; i++) {
    const jobId = jobIds[i];
    console.log(`\n[${i + 1}/${jobIds.length}] Processing ${jobId}...`);

    const result = await processNRPGReport(jobId);
    results.push({ jobId, ...result });

    // Brief pause between jobs
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  console.log(`\n${"=".repeat(80)}`);
  console.log("BATCH PROCESSING SUMMARY");
  console.log(`${"=".repeat(80)}\n`);

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`Total Jobs: ${jobIds.length}`);
  console.log(`Successful: ${successful} ✅`);
  console.log(`Failed: ${failed} ❌`);
  console.log();

  // Detailed results
  results.forEach(result => {
    const status = result.success ? "✅" : "❌";
    console.log(`${status} ${result.jobId} - ${result.stage}`);
  });

  console.log();

  return results;
}

/**
 * Example usage
 */
if (require.main === module) {
  // Single job processing
  processNRPGReport("JOB-12345")
    .then(result => {
      console.log("\nWorkflow result:", JSON.stringify(result, null, 2));
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error("Fatal error:", error);
      process.exit(1);
    });

  // Batch processing (uncomment to use)
  // batchProcessReports([
  //   "JOB-12345",
  //   "JOB-12346",
  //   "JOB-12347"
  // ]).then(results => {
  //   const allSuccessful = results.every(r => r.success);
  //   process.exit(allSuccessful ? 0 : 1);
  // });
}
