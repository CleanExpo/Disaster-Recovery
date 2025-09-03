interface AIResponse {
    message: string;
    data?: any;
    source: 'database' | 'guide' | 'emergency_protocol';
    confidence: number;
    suggestedActions?: string[];
}
interface QueryContext {
    userType: 'client' | 'contractor';
    emergencyLevel?: 'low' | 'medium' | 'high' | 'critical';
    previousContext?: string[];
    location?: string;
    serviceType?: string;
}
declare class AIService {
    private prisma;
    private openai;
    private complianceMode;
    constructor();
    processQuery(query: string, context: QueryContext): Promise<AIResponse>;
    private isEmergencyQuery;
    private handleEmergencyQuery;
    private searchDatabaseContent;
    private searchGuides;
    private generateSafeResponse;
    private extractEmergencyType;
    private getDefaultResponse;
    trainOnContent(contentId: number): Promise<void>;
    getContractorRecommendations(jobType: string, location: string, urgency: string): Promise<any[]>;
    private validateCompliance;
}
export default AIService;
//# sourceMappingURL=ai-service.d.ts.map