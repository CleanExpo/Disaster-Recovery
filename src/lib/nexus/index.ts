// NEXUS Agent Registry
// Autonomous agent system for DR/NRPG platform operations

export interface NexusAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  trigger: 'schedule' | 'event' | 'manual';
  lastRun?: Date;
}

export const NEXUS_AGENTS: NexusAgent[] = [
  {
    id: 'disaster-recovery-specialist',
    name: 'Disaster Recovery Specialist',
    description:
      'Generates scope-of-works documentation for active claims based on damage type and IICRC standards',
    status: 'inactive', // DR-313: activate when claim volume > 0
    trigger: 'event',
  },
  {
    id: 'evidence-collector',
    name: 'Evidence Collector',
    description:
      'Compiles before/after insurance documentation briefs from claim photos and contractor reports',
    status: 'inactive', // DR-314
    trigger: 'event',
  },
  {
    id: 'legal-compliance-checker',
    name: 'Legal Compliance Checker',
    description:
      'Reviews insurance documentation against GICP 2020 and ACL requirements',
    status: 'inactive', // DR-315
    trigger: 'schedule',
  },
  {
    id: 'revenue-forecast-agent',
    name: 'Revenue Forecast Agent',
    description:
      'Storm season demand forecasting using BOM data and historical claim patterns',
    status: 'inactive', // DR-316
    trigger: 'schedule',
  },
];

/**
 * Look up a single agent by ID. Returns undefined if not found.
 */
export function getNexusAgent(id: string): NexusAgent | undefined {
  return NEXUS_AGENTS.find((a) => a.id === id);
}
