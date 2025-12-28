import { query, HookCallback } from "@anthropic-ai/claude-agent-sdk";

/**
 * Operations Agent
 *
 * Handles delivery, billing, and CRM updates for approved NRPG reports.
 *
 * Accountability Rules (enforced via hooks):
 * - 30-day payment terms (no exceptions)
 * - Invoice adjustments >$500 blocked without approval
 * - Automatic escalation after 45 days
 * - All actions logged to audit trail
 *
 * Subagents:
 * - email-sender: Delivers reports to clients and insurers
 * - invoice-creator: Generates GST-compliant invoices
 * - crm-updater: Logs activities and updates lifecycle
 *
 * @param approvedReport - The QA-approved report to process
 * @returns Operation result with delivery status
 */

export interface OperationsResult {
  emailDelivered: boolean;
  invoiceCreated: boolean;
  crmUpdated: boolean;
  invoiceNumber?: string;
  trackingIds?: string[];
  errors?: string[];
  auditLog?: any[];
}

// Audit log for accountability tracking
const auditLog: any[] = [];

/**
 * Accountability enforcement hook (PreToolUse)
 *
 * Enforces business rules before tool execution:
 * - No invoice adjustments >$500 without approval
 * - Payment terms fixed at 30 days
 */
const enforcePaymentRules: HookCallback = async (input, toolUseId, context) => {
  try {
    // Rule 1: No invoice adjustments > $500 without approval token
    if (
      input.tool_name === "payment-processor" &&
      input.tool_input?.adjustment &&
      Math.abs(input.tool_input.adjustment) > 500
    ) {
      // Check for approval token
      if (!input.tool_input?.approvalToken) {
        throw new Error(
          "BLOCKED: Invoice adjustments >$500 require manager approval token. " +
          "Contact your manager to obtain approval."
        );
      }

      // Log the approved adjustment
      auditLog.push({
        timestamp: new Date().toISOString(),
        action: "INVOICE_ADJUSTMENT",
        amount: input.tool_input.adjustment,
        approvalToken: input.tool_input.approvalToken,
        toolUseId
      });
    }

    // Rule 2: Payment due in 30 days (no exceptions)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    if (input.tool_input) {
      // Force 30-day payment terms
      input.tool_input.paymentTerms = "NET_30";
      input.tool_input.dueDate = dueDate.toISOString();

      // Set automatic escalation date (45 days from invoice)
      const escalationDate = new Date();
      escalationDate.setDate(escalationDate.getDate() + 45);
      input.tool_input.escalationDate = escalationDate.toISOString();
    }

    auditLog.push({
      timestamp: new Date().toISOString(),
      action: "PAYMENT_RULES_ENFORCED",
      paymentTerms: "NET_30",
      dueDate: dueDate.toISOString(),
      toolUseId
    });

    return {};
  } catch (error) {
    // Log the blocked action
    auditLog.push({
      timestamp: new Date().toISOString(),
      action: "PAYMENT_RULE_VIOLATION_BLOCKED",
      error: error instanceof Error ? error.message : "Unknown error",
      toolUseId
    });

    throw error;
  }
};

/**
 * Audit logging hook (PostToolUse)
 *
 * Logs all operations for accountability and compliance.
 */
const logAllOperations: HookCallback = async (input, toolUseId, context) => {
  try {
    // Log the completed operation
    auditLog.push({
      timestamp: new Date().toISOString(),
      action: "TOOL_EXECUTION_COMPLETED",
      toolName: input.tool_name,
      toolInput: input.tool_input,
      toolUseId,
      context: {
        sessionId: context?.sessionId,
        userId: context?.userId
      }
    });

    return {};
  } catch (error) {
    console.error("Audit logging failed:", error);
    // Don't throw - audit logging failures shouldn't block operations
    return {};
  }
};

/**
 * Execute Operations Agent
 *
 * Processes approved reports through delivery, billing, and CRM updates.
 */
export async function executeOperationsAgent(
  approvedReport: any
): Promise<OperationsResult> {
  // Reset audit log for this operation
  auditLog.length = 0;

  const result: OperationsResult = {
    emailDelivered: false,
    invoiceCreated: false,
    crmUpdated: false,
    errors: []
  };

  try {
    for await (const message of query({
      prompt: `You are an Operations Agent for NRPG (Natural Resources Property Group).

Process this approved report through delivery, billing, and CRM updates:

${JSON.stringify(approvedReport, null, 2)}

OPERATIONS WORKFLOW:
1. **Email Delivery** (use email-sender subagent):
   - Send report to client (primary contact)
   - Send copy to insurance company (if applicable)
   - Include tracking links for delivery confirmation

2. **Invoice Creation** (use invoice-creator subagent):
   - Generate GST-compliant invoice (10% GST)
   - Apply 30-day payment terms (automatic, no exceptions)
   - Set automatic escalation for day 45
   - Include itemized breakdown from report

3. **CRM Update** (use crm-updater subagent):
   - Log activity: "Report delivered"
   - Update opportunity stage: "Report Sent"
   - Refresh health score based on timelines
   - Schedule follow-up task (7 days)

ACCOUNTABILITY RULES (enforced by hooks):
- Payment terms: NET_30 (30 days, no exceptions)
- Invoice adjustments >$500: BLOCKED without approval token
- Escalation: Automatic at day 45 (webhook to collections)
- Audit: All actions logged to audit trail

RETURN FORMAT (JSON):
{
  "emailDelivered": boolean,
  "invoiceCreated": boolean,
  "crmUpdated": boolean,
  "invoiceNumber": string,
  "trackingIds": string[],
  "errors": string[]
}`,
      options: {
        allowedTools: ["Bash", "Write", "Task"],
        hooks: {
          PreToolUse: [
            {
              matcher: "payment-processor|invoice-creator",
              hooks: [enforcePaymentRules]
            }
          ],
          PostToolUse: [
            {
              matcher: ".*", // Match all tools
              hooks: [logAllOperations]
            }
          ]
        },
        agents: {
          "email-sender": {
            description: "Sends reports to clients and insurance companies",
            prompt: `Send report via email to client and insurer with tracking.

EMAIL REQUIREMENTS:
- To: Client primary contact
- CC: Insurance company adjuster (if applicable)
- Subject: "NRPG Report - [Property Address] - [Date]"
- Body: Professional template with report summary
- Attachments: PDF report, photos (compressed)
- Tracking: Enable read receipts and delivery tracking

Return JSON with:
{
  "sent": boolean,
  "trackingIds": string[],
  "recipients": string[],
  "errors": string[]
}`,
            tools: ["Bash"]
          },
          "invoice-creator": {
            description: "Creates GST-compliant invoices with 30-day payment terms",
            prompt: `Generate invoice with automatic escalation after 45 days.

INVOICE REQUIREMENTS:
- Format: GST-compliant (10% GST on services)
- Payment Terms: NET_30 (30 days, enforced by hook)
- Line Items: Itemized from report cost breakdown
- Total: Subtotal + GST = Total
- Payment Methods: Bank transfer, credit card
- Escalation: Automatic webhook at day 45

TEMPLATE:
- Invoice Number: INV-[YYYYMMDD]-[SequenceNumber]
- Issue Date: Today
- Due Date: Today + 30 days (enforced by hook)
- Escalation Date: Today + 45 days

Return JSON with:
{
  "created": boolean,
  "invoiceNumber": string,
  "total": number,
  "dueDate": string,
  "errors": string[]
}`,
            tools: ["Write", "Bash"]
          },
          "crm-updater": {
            description: "Logs activities and updates customer lifecycle",
            prompt: `Create Activity log, update Opportunity stage, refresh health scores.

CRM UPDATE STEPS:
1. Log Activity:
   - Type: "Report Delivered"
   - Date: Today
   - Notes: Include report number and delivery method

2. Update Opportunity:
   - Stage: "Report Sent" → "Awaiting Payment"
   - Probability: 90% (report approved and sent)
   - Close Date: Due date + 7 days (buffer)

3. Refresh Health Score:
   - Timeline adherence: On-time delivery = +10 points
   - Communication quality: Professional report = +5 points
   - Payment history: (use existing score)

4. Schedule Follow-up:
   - Task: "Payment reminder"
   - Due: 7 days from now
   - Assigned to: Account manager

Return JSON with:
{
  "updated": boolean,
  "activityId": string,
  "opportunityStage": string,
  "healthScore": number,
  "errors": string[]
}`,
            tools: ["Bash"]
          }
        }
      }
    })) {
      // Process result
      if ("result" in message) {
        try {
          const operationResult = typeof message.result === "string"
            ? JSON.parse(message.result)
            : message.result;

          // Update result object
          result.emailDelivered = operationResult.emailDelivered || false;
          result.invoiceCreated = operationResult.invoiceCreated || false;
          result.crmUpdated = operationResult.crmUpdated || false;
          result.invoiceNumber = operationResult.invoiceNumber;
          result.trackingIds = operationResult.trackingIds;
          result.errors = operationResult.errors || [];
          result.auditLog = [...auditLog]; // Copy audit log

          return result;
        } catch (parseError) {
          console.error("Failed to parse operation result:", parseError);

          result.errors?.push("Failed to parse operation result");
          result.auditLog = [...auditLog];

          return result;
        }
      }
    }

    // If we exit the loop without a result
    result.errors?.push("Operations process did not complete");
    result.auditLog = [...auditLog];

    return result;

  } catch (error) {
    console.error("Operations Agent error:", error);

    result.errors?.push(
      error instanceof Error ? error.message : "Unknown error"
    );
    result.auditLog = [...auditLog];

    return result;
  }
}

/**
 * Helper function to validate operations completion
 */
export function isOperationComplete(result: OperationsResult): boolean {
  return (
    result.emailDelivered &&
    result.invoiceCreated &&
    result.crmUpdated &&
    (result.errors?.length || 0) === 0
  );
}

/**
 * Helper function to generate operations summary
 */
export function generateOperationsSummary(result: OperationsResult): string {
  const statusEmoji = (success: boolean) => success ? "✅" : "❌";

  return `
OPERATIONS REPORT

Email Delivery: ${statusEmoji(result.emailDelivered)}
${result.trackingIds ? `Tracking IDs: ${result.trackingIds.join(', ')}` : ''}

Invoice Creation: ${statusEmoji(result.invoiceCreated)}
${result.invoiceNumber ? `Invoice Number: ${result.invoiceNumber}` : ''}

CRM Update: ${statusEmoji(result.crmUpdated)}

${result.errors && result.errors.length > 0 ? `
Errors:
${result.errors.map(err => `  - ${err}`).join('\n')}
` : ''}

${result.auditLog && result.auditLog.length > 0 ? `
Audit Trail:
${result.auditLog.map(log => `  [${log.timestamp}] ${log.action}`).join('\n')}
` : ''}
  `.trim();
}

/**
 * Helper function to export audit log
 */
export function getAuditLog(): any[] {
  return [...auditLog];
}

/**
 * Helper function to clear audit log
 */
export function clearAuditLog(): void {
  auditLog.length = 0;
}
