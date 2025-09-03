"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = require("http");
const winston_1 = __importDefault(require("winston"));
const events_1 = require("events");
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.colorize(), winston_1.default.format.simple()),
    transports: [new winston_1.default.transports.Console()]
});
class RealtimeWebSocketServer extends events_1.EventEmitter {
    wss;
    clients = new Map();
    channels = new Map();
    jobs = new Map();
    port;
    constructor(port = 3002) {
        super();
        this.port = port;
        const server = (0, http_1.createServer)();
        this.wss = new ws_1.WebSocketServer({ server });
        server.listen(this.port, () => {
            logger.info(`🔌 WebSocket server running on port ${this.port}`);
        });
        this.setupWebSocketHandlers();
        this.startHeartbeat();
    }
    setupWebSocketHandlers() {
        this.wss.on('connection', (ws, req) => {
            const clientId = this.generateClientId();
            this.sendMessage(ws, {
                type: 'connected',
                payload: {
                    clientId,
                    timestamp: new Date(),
                    server: 'NRP Bot WebSocket Server'
                }
            });
            ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data.toString());
                    this.handleMessage(clientId, message);
                }
                catch (error) {
                    logger.error('Invalid message received:', error);
                    this.sendError(ws, 'Invalid message format');
                }
            });
            ws.on('close', () => {
                this.handleDisconnect(clientId);
            });
            ws.on('error', (error) => {
                logger.error(`WebSocket error for client ${clientId}:`, error);
            });
            ws.on('pong', () => {
                const client = this.clients.get(clientId);
                if (client) {
                    client.lastActivity = new Date();
                }
            });
            logger.info(`Client ${clientId} connected`);
        });
    }
    handleMessage(clientId, message) {
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
        if (client) {
            client.lastActivity = new Date();
        }
    }
    registerClient(clientId, payload) {
        const ws = Array.from(this.wss.clients).find(client => {
            return client.clientId === clientId;
        });
        if (!ws) {
            logger.error(`WebSocket not found for client ${clientId}`);
            return;
        }
        const client = {
            id: clientId,
            ws: ws,
            type: payload.type || 'client',
            metadata: payload.metadata || {},
            channels: new Set(),
            lastActivity: new Date()
        };
        this.clients.set(clientId, client);
        ws.clientId = clientId;
        if (client.type === 'client') {
            this.subscribeToChannel(clientId, 'clients');
            if (payload.metadata?.location) {
                this.subscribeToChannel(clientId, `location:${payload.metadata.location}`);
            }
        }
        else if (client.type === 'contractor') {
            this.subscribeToChannel(clientId, 'contractors');
            this.subscribeToChannel(clientId, 'jobs:available');
            if (payload.metadata?.services) {
                payload.metadata.services.forEach((service) => {
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
    subscribeToChannel(clientId, channel) {
        const client = this.clients.get(clientId);
        if (!client)
            return;
        client.channels.add(channel);
        if (!this.channels.has(channel)) {
            this.channels.set(channel, new Set());
        }
        this.channels.get(channel).add(clientId);
        this.sendToClient(clientId, {
            type: 'subscribed',
            payload: { channel }
        });
        logger.info(`Client ${clientId} subscribed to channel: ${channel}`);
    }
    unsubscribeFromChannel(clientId, channel) {
        const client = this.clients.get(clientId);
        if (!client)
            return;
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
    handleEmergency(clientId, payload) {
        const emergencyId = `EMRG-${Date.now()}`;
        const job = {
            id: emergencyId,
            type: 'emergency',
            client: clientId,
            ...payload,
            status: 'pending',
            createdAt: new Date()
        };
        this.jobs.set(emergencyId, job);
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
        this.sendToClient(clientId, {
            type: 'emergency_received',
            payload: {
                emergencyId,
                message: 'Emergency contractors have been notified',
                estimatedResponse: '15-30 minutes'
            }
        });
        logger.info(`Emergency ${emergencyId} created by client ${clientId}`);
        this.emit('emergency', job);
    }
    handleJobUpdate(clientId, payload) {
        const job = this.jobs.get(payload.jobId);
        if (!job)
            return;
        job.status = payload.status;
        job.updatedAt = new Date();
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
        this.broadcastToChannel('admin', {
            type: 'job_updated',
            payload: job
        });
        logger.info(`Job ${payload.jobId} updated to status: ${payload.status}`);
    }
    updateContractorLocation(clientId, payload) {
        const client = this.clients.get(clientId);
        if (!client || client.type !== 'contractor')
            return;
        client.metadata.location = payload.location;
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
    handleChatMessage(clientId, payload) {
        const message = {
            id: `MSG-${Date.now()}`,
            from: clientId,
            to: payload.to,
            content: payload.content,
            timestamp: new Date()
        };
        if (payload.to) {
            this.sendToClient(payload.to, {
                type: 'chat_message',
                payload: message
            });
        }
        this.sendToClient(clientId, {
            type: 'message_sent',
            payload: { messageId: message.id }
        });
    }
    handleJobAccept(clientId, payload) {
        const job = this.jobs.get(payload.jobId);
        if (!job || job.status !== 'pending') {
            this.sendError(this.clients.get(clientId)?.ws, 'Job not available');
            return;
        }
        job.status = 'assigned';
        job.contractor = clientId;
        job.acceptedAt = new Date();
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
        this.broadcastToChannel('contractors', {
            type: 'job_taken',
            payload: { jobId: payload.jobId }
        }, [clientId]);
        logger.info(`Job ${payload.jobId} accepted by contractor ${clientId}`);
    }
    handleJobComplete(clientId, payload) {
        const job = this.jobs.get(payload.jobId);
        if (!job)
            return;
        job.status = 'completed';
        job.completedAt = new Date();
        job.completionNotes = payload.notes;
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
    handleDisconnect(clientId) {
        const client = this.clients.get(clientId);
        if (!client)
            return;
        client.channels.forEach(channel => {
            const channelClients = this.channels.get(channel);
            if (channelClients) {
                channelClients.delete(clientId);
                if (channelClients.size === 0) {
                    this.channels.delete(channel);
                }
            }
        });
        this.clients.delete(clientId);
        logger.info(`Client ${clientId} disconnected`);
    }
    sendToClient(clientId, message) {
        const client = this.clients.get(clientId);
        if (!client || client.ws.readyState !== ws_1.WebSocket.OPEN)
            return;
        this.sendMessage(client.ws, message);
    }
    broadcastToChannel(channel, message, exclude = []) {
        const channelClients = this.channels.get(channel);
        if (!channelClients)
            return;
        channelClients.forEach(clientId => {
            if (!exclude.includes(clientId)) {
                this.sendToClient(clientId, message);
            }
        });
        logger.debug(`Broadcast to channel ${channel}: ${message.type}`);
    }
    sendMessage(ws, message) {
        if (ws.readyState !== ws_1.WebSocket.OPEN)
            return;
        ws.send(JSON.stringify({
            ...message,
            timestamp: message.timestamp || new Date()
        }));
    }
    sendError(ws, error) {
        this.sendMessage(ws, {
            type: 'error',
            payload: { error }
        });
    }
    generateClientId() {
        return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    startHeartbeat() {
        setInterval(() => {
            this.clients.forEach((client, clientId) => {
                if (client.ws.readyState === ws_1.WebSocket.OPEN) {
                    client.ws.ping();
                }
                else {
                    this.handleDisconnect(clientId);
                }
            });
        }, 30000);
    }
    notifyJob(job) {
        this.jobs.set(job.id, job);
        if (job.urgency === 'emergency') {
            this.broadcastToChannel('contractors', {
                type: 'new_emergency_job',
                payload: job
            });
        }
        else {
            this.broadcastToChannel(`service:${job.serviceType}`, {
                type: 'new_job',
                payload: job
            });
        }
    }
    getStats() {
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
if (require.main === module) {
    const wsServer = new RealtimeWebSocketServer(3002);
    process.on('SIGTERM', () => {
        logger.info('Shutting down WebSocket server...');
        process.exit(0);
    });
    process.on('SIGINT', () => {
        logger.info('Shutting down WebSocket server...');
        process.exit(0);
    });
}
exports.default = RealtimeWebSocketServer;
//# sourceMappingURL=websocket-server.js.map