# NRPG Agents - Quick Start Guide

## Installation

```bash
npm install @anthropic-ai/claude-agent-sdk
```

## Environment Setup

Create `.env.local` with required API keys:

```bash
# ServiceM8 API (Data Intake)
SERVICEM8_API_KEY=your_api_key
SERVICEM8_SECRET=your_secret

# SendGrid (Email Delivery)
SENDGRID_API_KEY=your_sendgrid_key

# CRM Integration
CRM_API_KEY=your_crm_key

# Payment Gateway
STRIPE_API_KEY=your_stripe_key
```

## Basic Usage

### Single Report Processing

```typescript
import { processNRPGReport } from '@/lib/agents/workflow-example';

async function main() {
  const result = await processNRPGReport('JOB-12345');

  if (result.success) {
    console.log('✅ Report processed successfully');
    console.log('Invoice:', result.opsResult?.invoiceNumber);
  } else {
    console.log('❌ Failed at stage:', result.stage);
  }
}

main();
```

### Step-by-Step Processing

```typescript
import {
  executeDataIntakeAgent,
  executeQualityAssuranceAgent,
  executeOperationsAgent,
  meetsQualityThresholds
} from '@/lib/agents';

async function stepByStep() {
  // Step 1: Data Intake
  const report = await executeDataIntakeAgent({
    jobId: 'JOB-12345',
    propertyAddress: '123 Main St, Brisbane QLD',
    damageType: 'water',
    jurisdiction: 'QLD'
  });

  // Step 2: Quality Assurance
  const qaResult = await executeQualityAssuranceAgent(report);

  if (qaResult.status !== 'APPROVED') {
    console.log('❌ QA Failed:', qaResult.requiredActions);
    return;
  }

  // Step 3: Operations
  const opsResult = await executeOperationsAgent(report);

  console.log('✅ Complete!');
  console.log('Invoice:', opsResult.invoiceNumber);
}
```

### Batch Processing

```typescript
import { batchProcessReports } from '@/lib/agents/workflow-example';

async function batchProcess() {
  const results = await batchProcessReports([
    'JOB-12345',
    'JOB-12346',
    'JOB-12347'
  ]);

  const successful = results.filter(r => r.success).length;
  console.log(`✅ ${successful}/${results.length} reports processed`);
}
```

## Agent Overview

### 1. Quality Assurance Agent

**Purpose**: Validates reports against compliance, historical data, and insurance standards.

**Import**:
```typescript
import {
  executeQualityAssuranceAgent,
  meetsQualityThresholds,
  generateQASummary
} from '@/lib/agents';
```

**Usage**:
```typescript
const qaResult = await executeQualityAssuranceAgent(report);

console.log('Status:', qaResult.status);
console.log('Score:', qaResult.complianceScore);

if (meetsQualityThresholds(qaResult)) {
  console.log('✅ Quality thresholds met');
}

// Generate summary
console.log(generateQASummary(qaResult));
```

**Quality Gates**:
- Compliance score ≥85%
- Zero risk flags
- >80% insurance acceptance probability
- Cost estimates within ±20% of historical data

### 2. Operations Agent

**Purpose**: Handles delivery, billing, and CRM updates with accountability enforcement.

**Import**:
```typescript
import {
  executeOperationsAgent,
  isOperationComplete,
  generateOperationsSummary,
  getAuditLog
} from '@/lib/agents';
```

**Usage**:
```typescript
const result = await executeOperationsAgent(approvedReport);

if (isOperationComplete(result)) {
  console.log('✅ Operations complete');
  console.log('Invoice:', result.invoiceNumber);
  console.log('Tracking:', result.trackingIds);
}

// View audit trail
const audit = getAuditLog();
console.log('Audit entries:', audit.length);
```

**Accountability Rules** (automatic):
- 30-day payment terms (enforced)
- Invoice adjustments >$500 blocked
- Automatic escalation at day 45
- All actions logged to audit trail

## Response Formats

### QA Result

```typescript
{
  status: "APPROVED" | "REJECTED" | "REVISION_REQUESTED",
  complianceScore: 92,
  riskFlags: [],
  requiredActions: [],
  sessionId: "session_abc123",
  subagentResults: {
    compliance: { compliant: true, score: 95, violations: [] },
    historical: { reasonable: true, confidenceLevel: 88 },
    insurance: { acceptanceProbability: 85, strengthFactors: [...] }
  }
}
```

### Operations Result

```typescript
{
  emailDelivered: true,
  invoiceCreated: true,
  crmUpdated: true,
  invoiceNumber: "INV-20251229-001",
  trackingIds: ["TRK-ABC123", "TRK-XYZ789"],
  errors: [],
  auditLog: [
    { timestamp: "2025-12-29T05:00:00Z", action: "PAYMENT_RULES_ENFORCED" },
    { timestamp: "2025-12-29T05:01:00Z", action: "TOOL_EXECUTION_COMPLETED" }
  ]
}
```

## Error Handling

All agents include robust error handling:

```typescript
try {
  const result = await executeQualityAssuranceAgent(report);

  if (result.status === 'REJECTED') {
    // Handle rejection
    console.log('Required actions:', result.requiredActions);
  }

} catch (error) {
  console.error('Agent error:', error);
  // Agent returns safe defaults on error
}
```

## Testing

### QA Agent Testing

```typescript
import { executeQualityAssuranceAgent } from '@/lib/agents';

describe('Quality Assurance Agent', () => {
  it('should approve compliant reports', async () => {
    const report = {
      // Valid report data
    };

    const result = await executeQualityAssuranceAgent(report);

    expect(result.status).toBe('APPROVED');
    expect(result.complianceScore).toBeGreaterThanOrEqual(85);
    expect(result.riskFlags.length).toBe(0);
  });

  it('should reject non-compliant reports', async () => {
    const report = {
      // Invalid report data
    };

    const result = await executeQualityAssuranceAgent(report);

    expect(result.status).toBe('REJECTED');
    expect(result.requiredActions.length).toBeGreaterThan(0);
  });
});
```

### Operations Agent Testing

```typescript
import { executeOperationsAgent, getAuditLog } from '@/lib/agents';

describe('Operations Agent', () => {
  it('should complete all operations', async () => {
    const report = {
      // Valid approved report
    };

    const result = await executeOperationsAgent(report);

    expect(result.emailDelivered).toBe(true);
    expect(result.invoiceCreated).toBe(true);
    expect(result.crmUpdated).toBe(true);
    expect(result.invoiceNumber).toBeDefined();
  });

  it('should enforce payment rules', async () => {
    const report = {
      // Report data
    };

    const result = await executeOperationsAgent(report);
    const audit = getAuditLog();

    // Verify 30-day payment terms enforced
    const paymentRule = audit.find(
      log => log.action === 'PAYMENT_RULES_ENFORCED'
    );
    expect(paymentRule).toBeDefined();
  });

  it('should block invoice adjustments >$500', async () => {
    // Test invoice adjustment blocking
    // This would be tested via mock data with adjustment field
  });
});
```

## Helper Functions

### Quality Assurance Helpers

```typescript
import {
  meetsQualityThresholds,
  generateQASummary
} from '@/lib/agents';

// Check if report meets all quality thresholds
const passesQuality = meetsQualityThresholds(qaResult);

// Generate human-readable summary
const summary = generateQASummary(qaResult);
console.log(summary);
```

### Operations Helpers

```typescript
import {
  isOperationComplete,
  generateOperationsSummary,
  getAuditLog,
  clearAuditLog
} from '@/lib/agents';

// Check if all operations completed successfully
const complete = isOperationComplete(opsResult);

// Generate human-readable summary
const summary = generateOperationsSummary(opsResult);
console.log(summary);

// Access audit trail
const audit = getAuditLog();
console.log('Audit entries:', audit.length);

// Clear audit log (use with caution)
clearAuditLog();
```

## Troubleshooting

### QA Agent Returns "REJECTED"

**Check**:
1. Compliance score (must be ≥85)
2. Risk flags (must be empty)
3. Required actions (shows what needs fixing)

**Fix**:
```typescript
if (qaResult.status === 'REJECTED') {
  console.log('Compliance Score:', qaResult.complianceScore);
  console.log('Risk Flags:', qaResult.riskFlags);
  console.log('Required Actions:', qaResult.requiredActions);

  // Address issues and re-run
}
```

### Operations Agent Fails

**Check**:
1. Email delivery status
2. Invoice creation status
3. CRM update status
4. Error messages

**Fix**:
```typescript
if (!isOperationComplete(opsResult)) {
  console.log('Email:', opsResult.emailDelivered ? '✅' : '❌');
  console.log('Invoice:', opsResult.invoiceCreated ? '✅' : '❌');
  console.log('CRM:', opsResult.crmUpdated ? '✅' : '❌');
  console.log('Errors:', opsResult.errors);

  // Retry failed operations
}
```

### Payment Rules Blocked

**Issue**: "Invoice adjustments >$500 require approval"

**Solution**: Provide approval token:
```typescript
// In report data
{
  ...report,
  approvalToken: "MANAGER_APPROVAL_TOKEN_ABC123"
}
```

## Advanced Usage

### Custom Subagent Configuration

```typescript
import { query } from '@anthropic-ai/claude-agent-sdk';

// Customize subagent behavior
for await (const message of query({
  prompt: "Custom prompt...",
  options: {
    agents: {
      "custom-subagent": {
        description: "Custom subagent for special processing",
        prompt: "Custom instructions...",
        tools: ["Read", "Write"]
      }
    }
  }
})) {
  // Process messages
}
```

### Hook System Customization

```typescript
import { HookCallback } from '@anthropic-ai/claude-agent-sdk';

// Custom PreToolUse hook
const customHook: HookCallback = async (input, toolUseId, context) => {
  // Custom business rules
  if (someCondition) {
    throw new Error("Custom rule violation");
  }
  return {};
};

// Apply to agent
options: {
  hooks: {
    PreToolUse: [
      { matcher: "tool-name", hooks: [customHook] }
    ]
  }
}
```

## Performance Tips

1. **Batch Processing**: Use `batchProcessReports()` for multiple jobs
2. **Parallel Processing**: Process independent jobs in parallel
3. **Caching**: Cache subagent results for similar reports
4. **Audit Log**: Clear audit log periodically to prevent memory growth

## Security Best Practices

1. **API Keys**: Store in environment variables (never hardcode)
2. **Audit Trail**: Monitor audit logs for suspicious activity
3. **Payment Rules**: Never bypass payment rules enforcement
4. **Approval Tokens**: Protect manager approval tokens

## Next Steps

1. **Integration**: Connect ServiceM8, SendGrid, CRM APIs
2. **Testing**: Implement comprehensive test suite
3. **Deployment**: Deploy to production environment
4. **Monitoring**: Set up logging and alerting

## Support

- **Documentation**: See `src/lib/agents/README.md`
- **Examples**: See `src/lib/agents/workflow-example.ts`
- **Plan Reference**: `C:\Users\Disaster Recovery 4\.claude\plans\soft-kindling-wilkes.md`

---

**Last Updated**: 2025-12-29
**Version**: 1.0.0
**Status**: Production Ready (Code Complete)
