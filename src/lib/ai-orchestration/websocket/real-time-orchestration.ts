/**
 * Real-time WebSocket Orchestration System
 * Enables real-time communication for multi-agent discussions and sequential thinking
 */

import { WebSocketEvent, ThinkingStepEvent, AgentResponseEvent } from '../core/types';
import { logger } from '@/lib/logger';
import { EventEmitter } from 'events';

// WebSocket interface for Next.js compatibility
interface WebSocketLike {
  send(data: string): void;
  close(): void;
  readyState: number;
  CONNECTING: number;
  OPEN: number;
  CLOSING: number;
  CLOSED: number;
}

export interface OrchestrationSession {
  id: string;
  userId?: string;
  type: 'sequential-thinking' | 'multi-agent-discussion' | 'hybrid';
  startTime: Date;
  lastActivity: Date;
  connections: Set<WebSocketLike>;
  context: {
    taskType: string;
    priority: string;
    emergency?: boolean;
  };
  metadata: {
    chainId?: string;
    discussionId?: string;
    participantCount?: number;
    currentStep?: number;
    currentRound?: number;
  };
}

export class RealTimeOrchestrationManager extends EventEmitter {
  private sessions: Map<string, OrchestrationSession> = new Map();
  private userSessions: Map<string, Set<string>> = new Map();
  private connectionSessions: Map<WebSocketLike, string> = new Map();
  private heartbeatInterval: NodeJS.Timeout;
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    super();
    this.startHeartbeat();
    this.startCleanup();
    this.setupEventHandlers();
  }

  /**
   * Create a new orchestration session
   */
  createSession(
    type: 'sequential-thinking' | 'multi-agent-discussion' | 'hybrid',
    context: {
      taskType: string;
      priority: string;
      emergency?: boolean;
      userId?: string;
    }
  ): string {
    const sessionId = this.generateSessionId();
    
    const session: OrchestrationSession = {
      id: sessionId,
      userId: context.userId,
      type,
      startTime: new Date(),
      lastActivity: new Date(),
      connections: new Set(),
      context: {
        taskType: context.taskType,
        priority: context.priority,
        emergency: context.emergency
      },
      metadata: {}
    };

    this.sessions.set(sessionId, session);
    
    // Track user sessions
    if (context.userId) {
      if (!this.userSessions.has(context.userId)) {
        this.userSessions.set(context.userId, new Set());
      }
      this.userSessions.get(context.userId)!.add(sessionId);
    }

    logger.info('Created orchestration session', {
      sessionId,
      type,
      taskType: context.taskType,
      userId: context.userId,
      emergency: context.emergency
    });

    return sessionId;
  }

  /**
   * Add WebSocket connection to session
   */
  addConnection(sessionId: string, websocket: WebSocketLike): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) {
      logger.warn('Attempted to add connection to non-existent session', { sessionId });
      return false;
    }

    session.connections.add(websocket);
    session.lastActivity = new Date();
    this.connectionSessions.set(websocket, sessionId);

    logger.debug('Added WebSocket connection to session', {
      sessionId,
      connectionCount: session.connections.size
    });

    // Send session info to new connection
    this.sendToConnection(websocket, {
      type: 'session-info',
      payload: {
        sessionId,
        type: session.type,
        context: session.context,
        metadata: session.metadata
      },
      timestamp: new Date(),
      sessionId
    });

    return true;
  }

  /**
   * Remove WebSocket connection from session
   */
  removeConnection(websocket: WebSocketLike): void {
    const sessionId = this.connectionSessions.get(websocket);
    if (!sessionId) return;

    const session = this.sessions.get(sessionId);
    if (session) {
      session.connections.delete(websocket);
      session.lastActivity = new Date();

      logger.debug('Removed WebSocket connection from session', {
        sessionId,
        remainingConnections: session.connections.size
      });

      // Close session if no connections remain and it's been inactive
      if (session.connections.size === 0) {
        const inactiveTime = Date.now() - session.lastActivity.getTime();
        if (inactiveTime > 300000) { // 5 minutes
          this.closeSession(sessionId);
        }
      }
    }

    this.connectionSessions.delete(websocket);
  }

  /**
   * Broadcast thinking step update to session
   */
  broadcastThinkingStep(sessionId: string, step: ThinkingStepEvent['payload']): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    // Update session metadata
    session.metadata.chainId = step.chainId;
    session.metadata.currentStep = step.step.stepNumber;
    session.lastActivity = new Date();

    const event: ThinkingStepEvent = {
      type: 'thinking-step',
      payload: step,
      timestamp: new Date(),
      sessionId
    };

    this.broadcastToSession(sessionId, event);

    logger.debug('Broadcasted thinking step', {
      sessionId,
      chainId: step.chainId,
      stepNumber: step.step.stepNumber,
      connectionCount: session.connections.size
    });
  }

  /**
   * Broadcast agent response to session
   */
  broadcastAgentResponse(sessionId: string, response: AgentResponseEvent['payload']): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    // Update session metadata
    session.metadata.discussionId = response.discussionId;
    session.metadata.currentRound = response.roundNumber;
    session.lastActivity = new Date();

    const event: AgentResponseEvent = {
      type: 'agent-response',
      payload: response,
      timestamp: new Date(),
      sessionId
    };

    this.broadcastToSession(sessionId, event);

    logger.debug('Broadcasted agent response', {
      sessionId,
      discussionId: response.discussionId,
      roundNumber: response.roundNumber,
      agentId: response.response.agentId,
      connectionCount: session.connections.size
    });
  }

  /**
   * Broadcast consensus reached event
   */
  broadcastConsensusReached(
    sessionId: string,
    consensusData: {
      discussionId: string;
      finalDecision: string;
      confidenceLevel: number;
      roundsUsed: number;
    }
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.lastActivity = new Date();

    const event: WebSocketEvent = {
      type: 'consensus-reached',
      payload: consensusData,
      timestamp: new Date(),
      sessionId
    };

    this.broadcastToSession(sessionId, event);

    logger.info('Broadcasted consensus reached', {
      sessionId,
      discussionId: consensusData.discussionId,
      confidenceLevel: consensusData.confidenceLevel,
      roundsUsed: consensusData.roundsUsed
    });
  }

  /**
   * Broadcast error to session
   */
  broadcastError(
    sessionId: string,
    error: {
      code: string;
      message: string;
      context?: any;
    }
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.lastActivity = new Date();

    const event: WebSocketEvent = {
      type: 'error',
      payload: error,
      timestamp: new Date(),
      sessionId
    };

    this.broadcastToSession(sessionId, event);

    logger.error('Broadcasted error to session', {
      sessionId,
      errorCode: error.code,
      message: error.message
    });
  }

  /**
   * Send progress update to session
   */
  sendProgressUpdate(
    sessionId: string,
    progress: {
      stage: string;
      percentage: number;
      estimatedTimeRemaining?: number;
      currentActivity: string;
    }
  ): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.lastActivity = new Date();

    const event: WebSocketEvent = {
      type: 'progress-update',
      payload: progress,
      timestamp: new Date(),
      sessionId
    };

    this.broadcastToSession(sessionId, event);
  }

  /**
   * Get session status
   */
  getSessionStatus(sessionId: string): {
    exists: boolean;
    connections: number;
    type?: string;
    startTime?: Date;
    lastActivity?: Date;
    metadata?: any;
  } {
    const session = this.sessions.get(sessionId);
    
    if (!session) {
      return { exists: false, connections: 0 };
    }

    return {
      exists: true,
      connections: session.connections.size,
      type: session.type,
      startTime: session.startTime,
      lastActivity: session.lastActivity,
      metadata: session.metadata
    };
  }

  /**
   * Get all active sessions for a user
   */
  getUserSessions(userId: string): OrchestrationSession[] {
    const userSessionIds = this.userSessions.get(userId);
    if (!userSessionIds) return [];

    return Array.from(userSessionIds)
      .map(sessionId => this.sessions.get(sessionId))
      .filter((session): session is OrchestrationSession => session !== undefined);
  }

  /**
   * Close a specific session
   */
  closeSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    // Close all WebSocket connections
    session.connections.forEach(ws => {
      try {
        if (ws.readyState === ws.OPEN) {
          this.sendToConnection(ws, {
            type: 'session-closed',
            payload: { sessionId, reason: 'Session ended' },
            timestamp: new Date(),
            sessionId
          });
          ws.close();
        }
      } catch (error) {
        logger.error('Error closing WebSocket connection', { error });
      }
    });

    // Clean up mappings
    session.connections.forEach(ws => {
      this.connectionSessions.delete(ws);
    });

    // Remove from user sessions
    if (session.userId) {
      const userSessions = this.userSessions.get(session.userId);
      if (userSessions) {
        userSessions.delete(sessionId);
        if (userSessions.size === 0) {
          this.userSessions.delete(session.userId);
        }
      }
    }

    // Remove session
    this.sessions.delete(sessionId);

    logger.info('Closed orchestration session', {
      sessionId,
      duration: Date.now() - session.startTime.getTime(),
      type: session.type
    });

    return true;
  }

  /**
   * Broadcast event to all connections in a session
   */
  private broadcastToSession(sessionId: string, event: WebSocketEvent): void {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const message = JSON.stringify(event);
    const deadConnections: WebSocketLike[] = [];

    session.connections.forEach(ws => {
      try {
        if (ws.readyState === ws.OPEN) {
          ws.send(message);
        } else {
          deadConnections.push(ws);
        }
      } catch (error) {
        logger.error('Error sending WebSocket message', { error, sessionId });
        deadConnections.push(ws);
      }
    });

    // Clean up dead connections
    deadConnections.forEach(ws => {
      session.connections.delete(ws);
      this.connectionSessions.delete(ws);
    });
  }

  /**
   * Send event to specific connection
   */
  private sendToConnection(connection: WebSocketLike, event: WebSocketEvent): void {
    try {
      if (connection.readyState === connection.OPEN) {
        connection.send(JSON.stringify(event));
      }
    } catch (error) {
      logger.error('Error sending WebSocket message to connection', { error });
    }
  }

  /**
   * Setup event handlers for orchestration engines
   */
  private setupEventHandlers(): void {
    // Listen for thinking step events
    this.on('thinking-step', (event: ThinkingStepEvent) => {
      this.broadcastThinkingStep(event.sessionId, event.payload);
    });

    // Listen for agent response events
    this.on('agent-response', (event: AgentResponseEvent) => {
      this.broadcastAgentResponse(event.sessionId, event.payload);
    });

    // Listen for consensus events
    this.on('consensus-reached', (sessionId: string, consensusData: any) => {
      this.broadcastConsensusReached(sessionId, consensusData);
    });

    // Listen for error events
    this.on('orchestration-error', (sessionId: string, error: any) => {
      this.broadcastError(sessionId, error);
    });
  }

  /**
   * Start heartbeat to keep connections alive
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      const now = new Date();
      
      this.sessions.forEach((session, sessionId) => {
        if (session.connections.size > 0) {
          const heartbeatEvent: WebSocketEvent = {
            type: 'heartbeat',
            payload: { 
              timestamp: now,
              sessionActive: true,
              connectionCount: session.connections.size
            },
            timestamp: now,
            sessionId
          };
          
          this.broadcastToSession(sessionId, heartbeatEvent);
        }
      });
    }, 30000); // 30 seconds
  }

  /**
   * Start cleanup process for inactive sessions
   */
  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      const maxInactiveTime = 1800000; // 30 minutes
      const sessionsToClose: string[] = [];

      this.sessions.forEach((session, sessionId) => {
        const inactiveTime = now - session.lastActivity.getTime();
        
        // Close sessions that are inactive and have no connections
        if (inactiveTime > maxInactiveTime && session.connections.size === 0) {
          sessionsToClose.push(sessionId);
        }
        
        // Close sessions with dead connections only
        if (session.connections.size > 0) {
          const aliveConnections = Array.from(session.connections)
            .filter(ws => ws.readyState === ws.OPEN);
          
          if (aliveConnections.length === 0) {
            sessionsToClose.push(sessionId);
          }
        }
      });

      sessionsToClose.forEach(sessionId => {
        logger.info('Cleaning up inactive session', { sessionId });
        this.closeSession(sessionId);
      });

      if (sessionsToClose.length > 0) {
        logger.info('Cleaned up inactive sessions', { 
          cleaned: sessionsToClose.length,
          remaining: this.sessions.size
        });
      }
    }, 300000); // 5 minutes
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Get orchestration statistics
   */
  getStatistics(): {
    totalSessions: number;
    activeSessions: number;
    totalConnections: number;
    sessionsByType: Record<string, number>;
    averageSessionDuration: number;
  } {
    const now = Date.now();
    let totalConnections = 0;
    const sessionsByType: Record<string, number> = {};
    let totalDuration = 0;

    this.sessions.forEach(session => {
      totalConnections += session.connections.size;
      sessionsByType[session.type] = (sessionsByType[session.type] || 0) + 1;
      totalDuration += now - session.startTime.getTime();
    });

    return {
      totalSessions: this.sessions.size,
      activeSessions: this.sessions.size,
      totalConnections,
      sessionsByType,
      averageSessionDuration: this.sessions.size > 0 ? totalDuration / this.sessions.size : 0
    };
  }

  /**
   * Shutdown the manager and clean up resources
   */
  shutdown(): void {
    logger.info('Shutting down RealTimeOrchestrationManager');
    
    // Clear intervals
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Close all sessions
    const sessionIds = Array.from(this.sessions.keys());
    sessionIds.forEach(sessionId => this.closeSession(sessionId));

    // Clear all maps
    this.sessions.clear();
    this.userSessions.clear();
    this.connectionSessions.clear();

    logger.info('RealTimeOrchestrationManager shutdown complete');
  }
}

// Singleton instance for the application
let orchestrationManager: RealTimeOrchestrationManager | null = null;

export function getOrchestrationManager(): RealTimeOrchestrationManager {
  if (!orchestrationManager) {
    orchestrationManager = new RealTimeOrchestrationManager();
  }
  return orchestrationManager;
}

export function shutdownOrchestrationManager(): void {
  if (orchestrationManager) {
    orchestrationManager.shutdown();
    orchestrationManager = null;
  }
}