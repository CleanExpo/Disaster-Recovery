/**
 * WebSocket Service - Real-time Communication
 */

import { WebSocketServer, WebSocket } from 'ws';
import { EventEmitter } from 'events';

interface Client {
  id: string;
  ws: WebSocket;
  type: 'client' | 'contractor' | 'admin';
  metadata: any;
  channels: Set<string>;
}

export class WebSocketService extends EventEmitter {
  private wss: WebSocketServer | null = null;
  private clients: Map<string, Client> = new Map();
  private channels: Map<string, Set<string>> = new Map();
  
  initialize(wss: WebSocketServer): void {
    this.wss = wss;
    console.log('✅ WebSocket service initialized');
  }
  
  // Add client
  addClient(id: string, ws: WebSocket, type: Client['type'], metadata?: any): void {
    const client: Client = {
      id,
      ws,
      type,
      metadata: metadata || {},
      channels: new Set()
    };
    
    this.clients.set(id, client);
    
    // Set up ping/pong for connection health
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      } else {
        clearInterval(pingInterval);
      }
    }, 30000);
    
    ws.on('pong', () => {
      // Connection is alive
    });
    
    ws.on('close', () => {
      clearInterval(pingInterval);
      this.removeClient(id);
    });
    
    console.log(`Client ${id} connected (type: ${type})`);
  }
  
  // Remove client
  removeClient(id: string): void {
    const client = this.clients.get(id);
    
    if (client) {
      // Remove from all channels
      client.channels.forEach(channel => {
        this.unsubscribe(id, channel);
      });
      
      this.clients.delete(id);
      console.log(`Client ${id} disconnected`);
    }
  }
  
  // Get client
  getClient(id: string): Client | undefined {
    return this.clients.get(id);
  }
  
  // Send to specific client
  send(clientId: string, data: any): boolean {
    const client = this.clients.get(clientId);
    
    if (client && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(data));
      return true;
    }
    
    return false;
  }
  
  // Broadcast to all clients
  broadcast(data: any, filter?: (client: Client) => boolean): void {
    const message = JSON.stringify(data);
    
    this.clients.forEach(client => {
      if (client.ws.readyState === WebSocket.OPEN) {
        if (!filter || filter(client)) {
          client.ws.send(message);
        }
      }
    });
  }
  
  // Channel management
  subscribe(clientId: string, channel: string): void {
    const client = this.clients.get(clientId);
    
    if (client) {
      client.channels.add(channel);
      
      if (!this.channels.has(channel)) {
        this.channels.set(channel, new Set());
      }
      
      this.channels.get(channel)!.add(clientId);
      
      console.log(`Client ${clientId} subscribed to channel ${channel}`);
    }
  }
  
  unsubscribe(clientId: string, channel: string): void {
    const client = this.clients.get(clientId);
    
    if (client) {
      client.channels.delete(channel);
      
      const channelClients = this.channels.get(channel);
      if (channelClients) {
        channelClients.delete(clientId);
        
        if (channelClients.size === 0) {
          this.channels.delete(channel);
        }
      }
      
      console.log(`Client ${clientId} unsubscribed from channel ${channel}`);
    }
  }
  
  // Broadcast to channel
  broadcastToChannel(channel: string, data: any): void {
    const channelClients = this.channels.get(channel);
    
    if (channelClients) {
      const message = JSON.stringify(data);
      
      channelClients.forEach(clientId => {
        const client = this.clients.get(clientId);
        
        if (client && client.ws.readyState === WebSocket.OPEN) {
          client.ws.send(message);
        }
      });
    }
  }
  
  // Client message handlers
  async handleClientMessage(clientId: string, data: any): Promise<void> {
    try {
      this.emit('client_message', {
        clientId,
        ...data
      });
      
      // Broadcast to contractors in the area
      this.broadcastToChannel(`contractors:${data.area}`, {
        type: 'new_client_request',
        clientId,
        message: data.message,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error handling client message:', error);
      this.send(clientId, {
        type: 'error',
        message: 'Failed to process message'
      });
    }
  }
  
  async handleContractorUpdate(contractorId: string, data: any): Promise<void> {
    try {
      this.emit('contractor_update', {
        contractorId,
        ...data
      });
      
      // Notify relevant clients
      if (data.jobId) {
        this.broadcastToChannel(`job:${data.jobId}`, {
          type: 'contractor_update',
          contractorId,
          update: data.update,
          timestamp: new Date()
        });
      }
    } catch (error) {
      console.error('Error handling contractor update:', error);
      this.send(contractorId, {
        type: 'error',
        message: 'Failed to process update'
      });
    }
  }
  
  // Notification helpers
  notifyClient(jobId: string, notification: any): void {
    this.broadcastToChannel(`job:${jobId}`, {
      type: 'notification',
      ...notification,
      timestamp: new Date()
    });
  }
  
  notifyContractor(contractorId: string, notification: any): void {
    this.send(contractorId, {
      type: 'notification',
      ...notification,
      timestamp: new Date()
    });
  }
  
  notifyContractorsInArea(area: string, notification: any): void {
    this.broadcastToChannel(`contractors:${area}`, {
      type: 'area_notification',
      ...notification,
      timestamp: new Date()
    });
  }
  
  // Status methods
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
  } {
    const clientsByType: Record<string, number> = {
      client: 0,
      contractor: 0,
      admin: 0
    };
    
    const clientList: Array<any> = [];
    
    this.clients.forEach(client => {
      clientsByType[client.type]++;
      clientList.push({
        id: client.id,
        type: client.type,
        channels: Array.from(client.channels),
        connected: client.ws.readyState === WebSocket.OPEN
      });
    });
    
    return {
      totalClients: this.clients.size,
      clientsByType,
      activeChannels: this.channels.size,
      clients: clientList
    };
  }
  
  // Cleanup
  closeAll(): void {
    this.clients.forEach(client => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.close();
      }
    });
    
    this.clients.clear();
    this.channels.clear();
    
    if (this.wss) {
      this.wss.close();
    }
  }
}