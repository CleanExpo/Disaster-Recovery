/**
 * NOT LEGAL ADVICE.
 *
 * Agents registry. Single source of truth for every ElevenLabs agent DR runs.
 *
 * Ported from DR-Sandbox (agents/registry.ts) as part of DR-708.
 *
 * Each agent has a role that determines how incoming webhooks are handled.
 * The webhook route uses `agent_id` on the payload to look up the role and
 * dispatch to the correct extractor (ClaimIntake vs SupportInteraction).
 */

export type AgentRole = "claims-intake" | "support-chat";

export interface AgentSpec {
  id: string;
  name: string;
  role: AgentRole;
  /** Channel the agent operates on. */
  channel: "voice" | "chat" | "voice+chat";
  /** Short description for dashboards / logs. */
  description: string;
  /** Data-collection fields Sarah/Maya is configured with in the EL dashboard. */
  dataCollectionFields: string[];
  /** Post-call or post-conversation webhook URL path that this agent posts to. */
  webhookPath: string;
  /** Optional: inbound phone number (for voice agents). */
  inboundNumber?: string;
  /** Optional: talk-to URL for quick testing. */
  talkToUrl?: string;
}

export const SARAH: AgentSpec = {
  id: "agent_8601kpnzctztf4xvh3chdhw60dcz",
  name: "Sarah",
  role: "claims-intake",
  channel: "voice",
  description:
    "24/7 voice claims intake assistant. Answers 1300 309 361, triages the caller, captures the structured ClaimIntake the dispatcher needs.",
  dataCollectionFields: [
    "service",
    "urgency",
    "caller_name",
    "caller_phone",
    "caller_email",
    "property_address",
    "property_suburb",
    "insurer",
    "policy_number",
  ],
  webhookPath: "/api/voice/elevenlabs/webhook",
  inboundNumber: "1300 309 361",
  talkToUrl:
    "https://elevenlabs.io/app/talk-to?agent_id=agent_8601kpnzctztf4xvh3chdhw60dcz",
};

export const MAYA: AgentSpec = {
  id: "agent_3401kpp0eb4nf5fsfjj6nppkqrak",
  name: "Maya",
  role: "support-chat",
  channel: "chat",
  description:
    "Chat-based support assistant. Handles general enquiries on disasterrecovery.com.au, clarifies service coverage, escalates to a human or to Sarah when a live claim is reported.",
  dataCollectionFields: [
    "topic",
    "resolved",
    "escalate_to_sarah",
    "caller_name",
    "caller_contact",
    "follow_up_action",
  ],
  webhookPath: "/api/voice/elevenlabs/webhook",
  talkToUrl:
    "https://elevenlabs.io/app/talk-to?agent_id=agent_3401kpp0eb4nf5fsfjj6nppkqrak",
};

export const AGENTS: AgentSpec[] = [SARAH, MAYA];

const BY_ID: Record<string, AgentSpec> = Object.fromEntries(AGENTS.map((a) => [a.id, a]));

export function agentById(id: string): AgentSpec | undefined {
  return BY_ID[id];
}

export function agentRole(id: string): AgentRole | undefined {
  return BY_ID[id]?.role;
}
