/**
 * WebSocket Server for Real-time Communication
 * Handles live updates between clients and contractors
 */

import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import winston from 'winston';
import { EventEmitter } from 'events';

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});

// Types
interface Client {
  id: string;
  ws: WebSocket;
  type: 'client' | 'contractor' | 'admin';
  metadata: {
    sessionId?: string;
    businessName?: string;
    location?: string;
    services?: string[];
  };
  channels: Set<string>;
  lastActivity: Date;
}

interface Message {
  type: string;
  payload: any;
  timestamp: Date;
  from?: string;
  to?: string;
}

class RealtimeWebSocketServer extends EventEmitter {
  private wss: WebSocketServer;
  private clients: Map<string, Client> = new Map();
  private channels: Map<string, Set<string>> = new Map();
  private jobs: Map<string, any> = new Map();
  private port: number;
  
  constructor(port: number = 3002) {
    super();
    this.port = port;
    
    // Create HTTP server
    const server = createServer();
    
    // Create WebSocket server
    this.wss = new WebSocketServer({ server });
    
    // Start server
    server.listen(this.port, () => {
      logger.info(`🔌 WebSocket server running on port ${this.port}`);
    });
    
    this.setupWebSocketHandlers();
    this.startHeartbeat();
  }
  
  private setupWebSocketHandlers() {
    this.wss.on('connection', (ws: WebSocket, req) => {
      const clientId = this.generateClientId();
      
      // Send welcome message
      this.sendMessage(ws, {
        type: 'connected',
        payload: {
          clientId,
          timestamp: new Date(),
          server: 'NRP Bot WebSocket Server'
        }
      });
      
      // Handle client messages
      ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleMessage(clientId, message);
        } catch (error) {
          logger.error('Invalid message received:', error);
          this.sendError(ws, 'Invalid message format');
        }
      });
      
      // Handle disconnection
      ws.on('close', () => {
        this.handleDisconnect(clientId);
      });
      
      // Handle errors
      ws.on('error', (error) => {
        logger.error(`WebSocket error for client ${clientId}:`, error);
      });
      
      // Handle pong for heartbeat
      ws.on('pong', () => {
        const client = this.clients.get(clientId);
        if (client) {
          client.lastActivity = new Date();
        }
      });
      
      logger.info(`Client ${clientId} connected`);
    });
  }
  
  private handleMessage(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    
    switch (message.type) {
      case 'register':
        this.registerClient(clientId, message.payload);
        break;
        
      case 'subscribe':
        this.subscribeToChannel(clientId, message.payload.channel);
        break;
        
      case 'unsubscribe':
        this.unsubscribeFromChannel(clientId, message.payload.channel);
        break;
        
      case 'emergency':
        this.handleEmergency(clientId, message.payload);
        break;
        
      case 'job_update':
        this.handleJobUpdate(clientId, message.payload);
        break;
        
      case 'contractor_location':
        this.updateContractorLocation(clientId, message.payload);
        break;
        
      case 'message':
        this.handleChatMessage(clientId, message.payload);
        break;
        
      case 'job_accept':
        this.handleJobAccept(clientId, message.payload);
        break;
        
      case 'job_complete':
        this.handleJobComplete(clientId, message.payload);
        break;
        
      case 'ping':
        this.sendToClient(clientId, { type: 'pong' });
        break;
        
      default:
        logger.warn(`Unknown message type: ${message.type}`);
    }
    
    // Update last activity
    if (client) {
      client.lastActivity = new Date();
    }
  }
  
  private registerClient(clientId: string, payload: any) {
    const ws = Array.from(this.wss.clients).find(client => {
      return (client as any).clientId === clientId;
    });
    
    if (!ws) {
      logger.error(`WebSocket not found for client ${clientId}`);
      return;
    }
    
    const client: Client = {
      id: clientId,
      ws: ws as WebSocket,
      type: payload.type || 'client',
      metadata: payload.metadata || {},
      channels: new Set(),
      lastActivity: new Date()
    };
    
    this.clients.set(clientId, client);
    (ws as any).clientId = clientId;
    
    // Auto-subscribe to relevant channels
    if (client.type === 'client') {
      this.subscribeToChannel(clientId, 'clients');
      if (payload.metadata?.location) {
        this.subscribeToChannel(clientId, `location:${payload.metadata.location}`);
      }
    } else if (client.type === 'contractor') {
      this.subscribeToChannel(clientId, 'contractors');
      this.subscribeToChannel(clientId, 'jobs:available');
      if (payload.metadata?.services) {
        payload.metadata.services.forEach((service: string) => {
          this.subscribeToChannel(clientId, `service:${service}`);
        });
      }
    }
    
    this.sendToClient(clientId, {
      type: 'registered',
      payload: {
        clientId,
        type: client.type,
        channels: Array.from(client.channels)
      }
    });
    
    logger.info(`Client ${clientId} registered as ${client.type}`);
  }
  
  private subscribeToChannel(clientId: string, channel: string) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    client.channels.add(channel);
    
    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Set());
    }
    this.channels.get(channel)!.add(clientId);
    
    this.sendToClient(clientId, {
      type: 'subscribed',
      payload: { channel }
    });
    
    logger.info(`Client ${clientId} subscribed to channel: ${channel}`);
  }
  
  private unsubscribeFromChannel(clientId: string, channel: string) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    client.channels.delete(channel);
    
    const channelClients = this.channels.get(channel);
    if (channelClients) {
      channelClients.delete(clientId);
      if (channelClients.size === 0) {
        this.channels.delete(channel);
      }
    }
    
    this.sendToClient(clientId, {
      type: 'unsubscribed',
      payload: { channel }
    });
  }
  
  private handleEmergency(clientId: string, payload: any) {
    const emergencyId = `EMRG-${Date.now()}`;
    
    // Store emergency job
    const job = {
      id: emergencyId,
      type: 'emergency',
      client: clientId,
      ...payload,
      status: 'pending',
      createdAt: new Date()
    };
    
    this.jobs.set(emergencyId, job);
    
    // Notify all available contractors
    this.broadcastToChannel('contractors', {
      type: 'emergency_alert',
      payload: {
        jobId: emergencyId,
        location: payload.location,
        type: payload.emergencyType,
        description: payload.description,
        priority: 'HIGH'
      }
    });
    
    // Send confirmation to client
    this.sendToClient(clientId, {
      type: 'emergency_received',
      payload: {
        emergencyId,
        message: 'Emergency contractors have been notified',
        estimatedResponse: '15-30 minutes'
      }
    });
    
    logger.info(`Emergency ${emergencyId} created by client ${clientId}`);
    
    // Emit event for other systems
    this.emit('emergency', job);
  }
  
  private handleJobUpdate(clientId: string, payload: any) {
    const job = this.jobs.get(payload.jobId);
    if (!job) return;
    
    // Update job status
    job.status = payload.status;
    job.updatedAt = new Date();
    
    // Notify relevant parties
    if (job.client) {
      this.sendToClient(job.client, {
        type: 'job_status_update',
        payload: {
          jobId: payload.jobId,
          status: payload.status,
          message: payload.message,
          contractor: clientId
        }
      });
    }
    
    // Broadcast to monitoring channel
    this.broadcastToChannel('admin', {
      type: 'job_updated',
      payload: job
    });
    
    logger.info(`Job ${payload.jobId} updated to status: ${payload.status}`);
  }
  
  private updateContractorLocation(clientId: string, payload: any) {
    const client = this.clients.get(clientId);
    if (!client || client.type !== 'contractor') return;
    
    client.metadata.location = payload.location;
    
    // Notify clients in area
    this.broadcastToChannel(`location:${payload.suburb}`, {
      type: 'contractor_nearby',
      payload: {
        contractorId: clientId,
        businessName: client.metadata.businessName,
        location: payload.location,
        distance: payload.distance
      }
    });
  }
  
  private handleChatMessage(clientId: string, payload: any) {
    const message = {
      id: `MSG-${Date.now()}`,
      from: clientId,
      to: payload.to,
      content: payload.content,
      timestamp: new Date()
    };
    
    // Send to recipient
    if (payload.to) {
      this.sendToClient(payload.to, {
        type: 'chat_message',
        payload: message
      });
    }
    
    // Send confirmation to sender
    this.sendToClient(clientId, {
      type: 'message_sent',
      payload: { messageId: message.id }
    });
  }
  
  private handleJobAccept(clientId: string, payload: any) {
    const job = this.jobs.get(payload.jobId);
    if (!job || job.status !== 'pending') {
      this.sendError(this.clients.get(clientId)?.ws!, 'Job not available');
      return;
    }
    
    // Update job
    job.status = 'assigned';
    job.contractor = clientId;
    job.acceptedAt = new Date();
    
    // Notify client
    if (job.client) {
      this.sendToClient(job.client, {
        type: 'contractor_assigned',
        payload: {
          jobId: payload.jobId,
          contractor: this.clients.get(clientId)?.metadata.businessName,
          estimatedArrival: payload.estimatedArrival || '30-45 minutes',
          phone: payload.contactPhone
        }
      });
    }
    
    // Confirm to contractor
    this.sendToClient(clientId, {
      type: 'job_accepted',
      payload: {
        jobId: payload.jobId,
        customerDetails: {
          name: job.customerName,
          phone: job.customerPhone,
          address: job.address
        }
      }
    });
    
    // Notify other contractors job is taken
    this.broadcastToChannel('contractors', {
      type: 'job_taken',
      payload: { jobId: payload.jobId }
    }, [clientId]);
    
    logger.info(`Job ${payload.jobId} accepted by contractor ${clientId}`);
  }
  
  private handleJobComplete(clientId: string, payload: any) {
    const job = this.jobs.get(payload.jobId);
    if (!job) return;
    
    job.status = 'completed';
    job.completedAt = new Date();
    job.completionNotes = payload.notes;
    
    // Notify client
    if (job.client) {
      this.sendToClient(job.client, {
        type: 'job_completed',
        payload: {
          jobId: payload.jobId,
          completionTime: job.completedAt,
          notes: payload.notes,
          invoiceAmount: payload.invoiceAmount
        }
      });
    }
    
    logger.info(`Job ${payload.jobId} completed by contractor ${clientId}`);
  }
  
  private handleDisconnect(clientId: string) {
    const client = this.clients.get(clientId);
    if (!client) return;
    
    // Remove from all channels
    client.channels.forEach(channel => {
      const channelClients = this.channels.get(channel);
      if (channelClients) {
        channelClients.delete(clientId);
        if (channelClients.size === 0) {
          this.channels.delete(channel);
        }
      }
    });
    
    // Remove client
    this.clients.delete(clientId);
    
    logger.info(`Client ${clientId} disconnected`);
  }
  
  private sendToClient(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (!client || client.ws.readyState !== WebSocket.OPEN) return;
    
    this.sendMessage(client.ws, message);
  }
  
  private broadcastToChannel(channel: string, message: any, exclude: string[] = []) {
    const channelClients = this.channels.get(channel);
    if (!channelClients) return;
    
    channelClients.forEach(clientId => {
      if (!exclude.includes(clientId)) {
        this.sendToClient(clientId, message);
      }
    });
    
    logger.debug(`Broadcast to channel ${channel}: ${message.type}`);
  }
  
  private sendMessage(ws: WebSocket, message: any) {
    if (ws.readyState !== WebSocket.OPEN) return;
    
    ws.send(JSON.stringify({
      ...message,
      timestamp: message.timestamp || new Date()
    }));
  }
  
  private sendError(ws: WebSocket, error: string) {
    this.sendMessage(ws, {
      type: 'error',
      payload: { error }
    });
  }
  
  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private startHeartbeat() {
    setInterval(() => {
      this.clients.forEach((client, clientId) => {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.ping();
        } else {
          this.handleDisconnect(clientId);
        }
      });
    }, 30000); // Ping every 30 seconds
  }
  
  // Public methods for external systems
  public notifyJob(job: any) {
    this.jobs.set(job.id, job);
    
    // Notify relevant contractors
    if (job.urgency === 'emergency') {
      this.broadcastToChannel('contractors', {
        type: 'new_emergency_job',
        payload: job
      });
    } else {
      this.broadcastToChannel(`service:${job.serviceType}`, {
        type: 'new_job',
        payload: job
      });
    }
  }
  
  public getStats() {
    return {
      connectedClients: this.clients.size,
      activeChannels: this.channels.size,
      pendingJobs: Array.from(this.jobs.values()).filter(j => j.status === 'pending').length,
      clients: Array.from(this.clients.entries()).map(([id, client]) => ({
        id,
        type: client.type,
        channels: Array.from(client.channels),
        lastActivity: client.lastActivity
      }))
    };
  }
}

// Export and start if run directly
if (require.main === module) {
  const wsServer = new RealtimeWebSocketServer(3002);
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    logger.info('Shutting down WebSocket server...');
    process.exit(0);
  });
  
  process.on('SIGINT', () => {
    logger.info('Shutting down WebSocket server...');
    process.exit(0);
  });
}

export default RealtimeWebSocketServer;