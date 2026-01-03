# Agent System - Quick Reference

## CEO Oversight Agent

```typescript
import { executeCEOOversightAgent } from '@/lib/agents';

const dashboard = await executeCEOOversightAgent();
```

**Returns**: `{ metrics, violations, alerts, recommendations, summary }`

**Subagents**: metrics-aggregator, violation-detector, alert-manager

---

## Agent Orchestrator

```typescript
import { orchestrateInspectionWorkflow } from '@/lib/agents';

const workflow = await orchestrateInspectionWorkflow(inspectionData);
```

**Returns**: `{ workflowId, status, sessions, results }`

**Workflow**: Data Intake → Report Gen → QA → Operations

**States**: RUNNING | REVISION_REQUIRED | COMPLETED | FAILED

---

## API Endpoint

### Execute Workflow
```bash
POST /api/agents/execute
Content-Type: application/json

{
  "inspectionData": {
    "propertyAddress": "123 Main St",
    "inspectorId": "inspector_123",
    "customerId": "customer_456",
    "inspectionType": "ROOF_DAMAGE",
    "scheduledDate": "2025-12-30T10:00:00Z",
    "findings": [...],
    "photos": [...]
  }
}
```

### Get Documentation
```bash
GET /api/agents/execute
```

---

## File Locations

- **CEO Agent**: `src/lib/agents/ceo-oversight-agent.ts`
- **Orchestrator**: `src/lib/agents/agent-orchestrator.ts`
- **API Route**: `app/api/agents/execute/route.ts`
- **Exports**: `src/lib/agents/index.ts`
- **Docs**: `src/lib/agents/README.md`

---

## Key Concepts

**Snake Build Pattern**: Orchestrator visible, subagents work underneath

**Session Management**: Each agent creates a session for context preservation

**Error Handling**: Automatic rollback on failure

**QA Rejection**: Workflow can be resumed after revision

---

## Performance Targets

- CEO Dashboard: < 5 seconds
- Inspection Workflow: < 60 seconds
- Success Rate: 95%+

---

**Full Documentation**: See `AGENT_SYSTEM_IMPLEMENTATION.md`
