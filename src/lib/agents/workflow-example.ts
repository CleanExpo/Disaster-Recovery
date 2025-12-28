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

/**
 * Complete NRPG report processing workflow
 */
export async function processNRPGReport(jobId: string) {
  console.log(`\n${"=".repeat(80)}`);
  console.log(`NRPG REPORT PROCESSING WORKFLOW - Job ID: ${jobId}`);
  console.log(`${"=".repeat(80)}\n`);

  try {
    // ========================================================================
    // STEP 1: DATA INTAKE
    // ========================================================================
    console.log("📥 STEP 1: DATA INTAKE");
    console.log("-".repeat(80));
    console.log("Collecting data from ServiceM8...\n");

    const report = await executeDataIntakeAgent({
      jobId,
      propertyAddress: "123 Main St, Brisbane QLD 4000",
      damageType: "water",
      jurisdiction: "QLD"
    });

    console.log("✅ Data intake complete");
    console.log(`   Session ID: ${report.sessionId}`);
    console.log(`   Report sections: ${report.sections?.length || 0}`);
    console.log(`   Photos analyzed: ${report.photosAnalyzed || 0}\n`);

    // ========================================================================
    // STEP 2: QUALITY ASSURANCE
    // ========================================================================
    console.log("🔍 STEP 2: QUALITY ASSURANCE");
    console.log("-".repeat(80));
    console.log("Running multi-step QA process...\n");

    const qaResult: QAResult = await executeQualityAssuranceAgent(report);

    // Display QA summary
    console.log(generateQASummary(qaResult));
    console.log();

    // Check if approved
    if (qaResult.status !== "APPROVED") {
      console.log("❌ WORKFLOW TERMINATED: Report not approved");
      console.log(`   Status: ${qaResult.status}`);
      console.log(`   Compliance Score: ${qaResult.complianceScore}/100`);
      console.log(`   Risk Flags: ${qaResult.riskFlags.length}`);
      console.log("\n📋 Required Actions:");
      qaResult.requiredActions.forEach((action, i) => {
        console.log(`   ${i + 1}. ${action}`);
      });
      return {
        success: false,
        stage: "QA",
        qaResult
      };
    }

    // Check quality thresholds
    if (!meetsQualityThresholds(qaResult)) {
      console.log("⚠️  WORKFLOW WARNING: Quality thresholds not met");
      console.log(`   Compliance Score: ${qaResult.complianceScore}/100 (need ≥85)`);
      console.log(`   Risk Flags: ${qaResult.riskFlags.length} (need 0)`);
      console.log("\n   Proceeding with caution...\n");
    }

    console.log("✅ Quality assurance passed");
    console.log(`   Compliance Score: ${qaResult.complianceScore}/100`);
    console.log(`   Risk Flags: ${qaResult.riskFlags.length}`);
    console.log(`   Session ID: ${qaResult.sessionId}\n`);

    // ========================================================================
    // STEP 3: OPERATIONS (DELIVERY, BILLING, CRM)
    // ========================================================================
    console.log("📤 STEP 3: OPERATIONS");
    console.log("-".repeat(80));
    console.log("Processing delivery, billing, and CRM updates...\n");

    const opsResult: OperationsResult = await executeOperationsAgent(report);

    // Display operations summary
    console.log(generateOperationsSummary(opsResult));
    console.log();

    // Check if operations completed
    if (!isOperationComplete(opsResult)) {
      console.log("❌ WORKFLOW WARNING: Operations incomplete");
      console.log(`   Email Delivered: ${opsResult.emailDelivered ? "✅" : "❌"}`);
      console.log(`   Invoice Created: ${opsResult.invoiceCreated ? "✅" : "❌"}`);
      console.log(`   CRM Updated: ${opsResult.crmUpdated ? "✅" : "❌"}`);

      if (opsResult.errors && opsResult.errors.length > 0) {
        console.log("\n📋 Errors:");
        opsResult.errors.forEach((error, i) => {
          console.log(`   ${i + 1}. ${error}`);
        });
      }

      return {
        success: false,
        stage: "OPERATIONS",
        qaResult,
        opsResult
      };
    }

    console.log("✅ Operations complete");
    console.log(`   Email Delivered: ✅`);
    console.log(`   Invoice Created: ✅ (${opsResult.invoiceNumber})`);
    console.log(`   CRM Updated: ✅`);

    if (opsResult.trackingIds && opsResult.trackingIds.length > 0) {
      console.log(`   Tracking IDs: ${opsResult.trackingIds.join(", ")}`);
    }

    // Display audit trail
    const auditLog = getAuditLog();
    console.log(`\n📝 Audit Trail: ${auditLog.length} entries logged`);

    // ========================================================================
    // WORKFLOW COMPLETE
    // ========================================================================
    console.log("\n" + "=".repeat(80));
    console.log("✅ WORKFLOW COMPLETE - REPORT SUCCESSFULLY PROCESSED");
    console.log("=".repeat(80));
    console.log(`\n📊 Summary:`);
    console.log(`   Job ID: ${jobId}`);
    console.log(`   QA Status: ${qaResult.status}`);
    console.log(`   Compliance Score: ${qaResult.complianceScore}/100`);
    console.log(`   Invoice: ${opsResult.invoiceNumber}`);
    console.log(`   Tracking IDs: ${opsResult.trackingIds?.length || 0}`);
    console.log(`   Audit Entries: ${auditLog.length}`);
    console.log();

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
