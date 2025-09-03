import { EventEmitter } from 'events';
declare class RealtimeWebSocketServer extends EventEmitter {
    private wss;
    private clients;
    private channels;
    private jobs;
    private port;
    constructor(port?: number);
    private setupWebSocketHandlers;
    private handleMessage;
    private registerClient;
    private subscribeToChannel;
    private unsubscribeFromChannel;
    private handleEmergency;
    private handleJobUpdate;
    private updateContractorLocation;
    private handleChatMessage;
    private handleJobAccept;
    private handleJobComplete;
    private handleDisconnect;
    private sendToClient;
    private broadcastToChannel;
    private sendMessage;
    private sendError;
    private generateClientId;
    private startHeartbeat;
    notifyJob(job: any): void;
    getStats(): {
        connectedClients: number;
        activeChannels: number;
        pendingJobs: number;
        clients: {
            id: string;
            type: "contractor" | "client" | "admin";
            channels: string[];
            lastActivity: Date;
        }[];
    };
}
export default RealtimeWebSocketServer;
//# sourceMappingURL=websocket-server.d.ts.map