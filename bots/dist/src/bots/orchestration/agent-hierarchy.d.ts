export interface AgentContext {
    sessionId: string;
    urgency: 'emergency' | 'urgent' | 'normal';
    conversationHistory: any[];
    metadata?: any;
}
export interface AgentResult {
    success: boolean;
    confidence: number;
    data?: any;
    error?: string;
    nextAgent?: string;
}
export declare class MasterOrchestrator {
    private primaryAgents;
    constructor();
    processClientRequest(message: string, context: AgentContext): Promise<AgentResult>;
    processContractorRequest(action: string, data: any, context: AgentContext): Promise<AgentResult>;
}
//# sourceMappingURL=agent-hierarchy.d.ts.map