import { WebSocketServer, WebSocket } from 'ws';
import { EventEmitter } from 'events';
interface Client {
    id: string;
    ws: WebSocket;
    type: 'client' | 'contractor' | 'admin';
    metadata: any;
    channels: Set<string>;
}
export declare class WebSocketService extends EventEmitter {
    private wss;
    private clients;
    private channels;
    initialize(wss: WebSocketServer): void;
    addClient(id: string, ws: WebSocket, type: Client['type'], metadata?: any): void;
    removeClient(id: string): void;
    getClient(id: string): Client | undefined;
    send(clientId: string, data: any): boolean;
    broadcast(data: any, filter?: (client: Client) => boolean): void;
    subscribe(clientId: string, channel: string): void;
    unsubscribe(clientId: string, channel: string): void;
    broadcastToChannel(channel: string, data: any): void;
    handleClientMessage(clientId: string, data: any): Promise<void>;
    handleContractorUpdate(contractorId: string, data: any): Promise<void>;
    notifyClient(jobId: string, notification: any): void;
    notifyContractor(contractorId: string, notification: any): void;
    notifyContractorsInArea(area: string, notification: any): void;
    getStatus(): {
        totalClients: number;
        clientsByType: Record<string, number>;
        activeChannels: number;
        clients: Array<{
            id: string;
            type: string;
            channels: string[];
            connected: boolean;
        }>;
    };
    closeAll(): void;
}
export {};
//# sourceMappingURL=websocket.service.d.ts.map