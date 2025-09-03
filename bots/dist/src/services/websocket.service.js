"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketService = void 0;
const ws_1 = require("ws");
const events_1 = require("events");
class WebSocketService extends events_1.EventEmitter {
    wss = null;
    clients = new Map();
    channels = new Map();
    initialize(wss) {
        this.wss = wss;
        console.log('✅ WebSocket service initialized');
    }
    addClient(id, ws, type, metadata) {
        const client = {
            id,
            ws,
            type,
            metadata: metadata || {},
            channels: new Set()
        };
        this.clients.set(id, client);
        const pingInterval = setInterval(() => {
            if (ws.readyState === ws_1.WebSocket.OPEN) {
                ws.ping();
            }
            else {
                clearInterval(pingInterval);
            }
        }, 30000);
        ws.on('pong', () => {
        });
        ws.on('close', () => {
            clearInterval(pingInterval);
            this.removeClient(id);
        });
        console.log(`Client ${id} connected (type: ${type})`);
    }
    removeClient(id) {
        const client = this.clients.get(id);
        if (client) {
            client.channels.forEach(channel => {
                this.unsubscribe(id, channel);
            });
            this.clients.delete(id);
            console.log(`Client ${id} disconnected`);
        }
    }
    getClient(id) {
        return this.clients.get(id);
    }
    send(clientId, data) {
        const client = this.clients.get(clientId);
        if (client && client.ws.readyState === ws_1.WebSocket.OPEN) {
            client.ws.send(JSON.stringify(data));
            return true;
        }
        return false;
    }
    broadcast(data, filter) {
        const message = JSON.stringify(data);
        this.clients.forEach(client => {
            if (client.ws.readyState === ws_1.WebSocket.OPEN) {
                if (!filter || filter(client)) {
                    client.ws.send(message);
                }
            }
        });
    }
    subscribe(clientId, channel) {
        const client = this.clients.get(clientId);
        if (client) {
            client.channels.add(channel);
            if (!this.channels.has(channel)) {
                this.channels.set(channel, new Set());
            }
            this.channels.get(channel).add(clientId);
            console.log(`Client ${clientId} subscribed to channel ${channel}`);
        }
    }
    unsubscribe(clientId, channel) {
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
    broadcastToChannel(channel, data) {
        const channelClients = this.channels.get(channel);
        if (channelClients) {
            const message = JSON.stringify(data);
            channelClients.forEach(clientId => {
                const client = this.clients.get(clientId);
                if (client && client.ws.readyState === ws_1.WebSocket.OPEN) {
                    client.ws.send(message);
                }
            });
        }
    }
    async handleClientMessage(clientId, data) {
        try {
            this.emit('client_message', {
                clientId,
                ...data
            });
            this.broadcastToChannel(`contractors:${data.area}`, {
                type: 'new_client_request',
                clientId,
                message: data.message,
                timestamp: new Date()
            });
        }
        catch (error) {
            console.error('Error handling client message:', error);
            this.send(clientId, {
                type: 'error',
                message: 'Failed to process message'
            });
        }
    }
    async handleContractorUpdate(contractorId, data) {
        try {
            this.emit('contractor_update', {
                contractorId,
                ...data
            });
            if (data.jobId) {
                this.broadcastToChannel(`job:${data.jobId}`, {
                    type: 'contractor_update',
                    contractorId,
                    update: data.update,
                    timestamp: new Date()
                });
            }
        }
        catch (error) {
            console.error('Error handling contractor update:', error);
            this.send(contractorId, {
                type: 'error',
                message: 'Failed to process update'
            });
        }
    }
    notifyClient(jobId, notification) {
        this.broadcastToChannel(`job:${jobId}`, {
            type: 'notification',
            ...notification,
            timestamp: new Date()
        });
    }
    notifyContractor(contractorId, notification) {
        this.send(contractorId, {
            type: 'notification',
            ...notification,
            timestamp: new Date()
        });
    }
    notifyContractorsInArea(area, notification) {
        this.broadcastToChannel(`contractors:${area}`, {
            type: 'area_notification',
            ...notification,
            timestamp: new Date()
        });
    }
    getStatus() {
        const clientsByType = {
            client: 0,
            contractor: 0,
            admin: 0
        };
        const clientList = [];
        this.clients.forEach(client => {
            clientsByType[client.type]++;
            clientList.push({
                id: client.id,
                type: client.type,
                channels: Array.from(client.channels),
                connected: client.ws.readyState === ws_1.WebSocket.OPEN
            });
        });
        return {
            totalClients: this.clients.size,
            clientsByType,
            activeChannels: this.channels.size,
            clients: clientList
        };
    }
    closeAll() {
        this.clients.forEach(client => {
            if (client.ws.readyState === ws_1.WebSocket.OPEN) {
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
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map