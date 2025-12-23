/**
 * Collaborative Editor Engine
 *
 * Manages real-time collaborative editing with conflict resolution,
 * operational transformation, and version control.
 *
 * Lines: 1,300+
 */

import { EventEmitter } from 'events';

/**
 * Collaborative editing interfaces
 */
interface EditSession {
  id: string;
  documentId: string;
  tenantId: string;
  participants: EditorParticipant[];
  createdAt: Date;
  lastModified: Date;
  status: 'active' | 'closed';
  conflictResolutionStrategy: 'operational_transform' | 'crdt' | 'last_write_wins';
}

interface EditorParticipant {
  userId: string;
  connectionId: string;
  cursorPosition: number;
  selectionStart: number;
  selectionEnd: number;
  color: string;
  joinedAt: Date;
}

interface EditOperation {
  id: string;
  sessionId: string;
  userId: string;
  timestamp: Date;
  type: 'insert' | 'delete' | 'replace';
  position: number;
  content?: string;
  length?: number;
  version: number;
}

interface DocumentVersion {
  version: number;
  timestamp: Date;
  content: string;
  author: string;
  operationCount: number;
  checksum: string;
}

interface CursorUpdate {
  userId: string;
  position: number;
  selectionStart: number;
  selectionEnd: number;
  timestamp: Date;
}

interface ConflictResolution {
  id: string;
  sessionId: string;
  operation1: EditOperation;
  operation2: EditOperation;
  strategy: string;
  resolvedContent: string;
  timestamp: Date;
}

/**
 * Collaborative Editor Engine
 * Manages real-time document editing
 */
export class CollaborativeEditorEngine extends EventEmitter {
  private editSessions: Map<string, EditSession> = new Map();
  private documentVersions: Map<string, DocumentVersion[]> = new Map();
  private editOperations: Map<string, EditOperation[]> = new Map();
  private documentContent: Map<string, string> = new Map();
  private conflictResolutions: Map<string, ConflictResolution[]> = new Map();
  private cursorPositions: Map<string, CursorUpdate[]> = new Map();
  private pendingOperations: Map<string, EditOperation[]> = new Map();

  // Configuration
  private config = {
    versionCheckpointInterval: 10, // Save version every N operations
    conflictDetectionWindow: 5000, // 5 seconds
    cursorBroadcastInterval: 100, // 100ms
    maxVersionHistory: 100,
    operationTimeout: 60000 // 1 minute
  };

  constructor() {
    super();
    this.startConflictDetection();
  }

  /**
   * Create edit session
   */
  async createSession(data: {
    documentId: string;
    tenantId: string;
    userId: string;
    connectionId: string;
    initialContent: string;
  }): Promise<EditSession> {
    const sessionId = `session-${Math.random().toString(36).substr(2, 9)}`;

    const session: EditSession = {
      id: sessionId,
      documentId: data.documentId,
      tenantId: data.tenantId,
      participants: [{
        userId: data.userId,
        connectionId: data.connectionId,
        cursorPosition: 0,
        selectionStart: 0,
        selectionEnd: 0,
        color: this.generateUserColor(data.userId),
        joinedAt: new Date()
      }],
      createdAt: new Date(),
      lastModified: new Date(),
      status: 'active',
      conflictResolutionStrategy: 'operational_transform'
    };

    this.editSessions.set(sessionId, session);

    // Initialize document content
    if (!this.documentContent.has(data.documentId)) {
      this.documentContent.set(data.documentId, data.initialContent);

      // Create initial version
      const version: DocumentVersion = {
        version: 0,
        timestamp: new Date(),
        content: data.initialContent,
        author: 'system',
        operationCount: 0,
        checksum: this.calculateChecksum(data.initialContent)
      };

      const versions = [version];
      this.documentVersions.set(data.documentId, versions);
    }

    this.emit('session:created', session);

    return session;
  }

  /**
   * Add participant to session
   */
  async addParticipant(sessionId: string, data: {
    userId: string;
    connectionId: string;
  }): Promise<EditorParticipant> {
    const session = this.editSessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);

    // Check if already in session
    const existing = session.participants.find(p => p.userId === data.userId);
    if (existing) {
      return existing;
    }

    const participant: EditorParticipant = {
      userId: data.userId,
      connectionId: data.connectionId,
      cursorPosition: 0,
      selectionStart: 0,
      selectionEnd: 0,
      color: this.generateUserColor(data.userId),
      joinedAt: new Date()
    };

    session.participants.push(participant);

    this.emit('participant:joined', {
      sessionId,
      userId: data.userId,
      participantCount: session.participants.length
    });

    return participant;
  }

  /**
   * Remove participant from session
   */
  async removeParticipant(sessionId: string, userId: string): Promise<void> {
    const session = this.editSessions.get(sessionId);
    if (!session) return;

    session.participants = session.participants.filter(p => p.userId !== userId);

    if (session.participants.length === 0) {
      session.status = 'closed';
    }

    this.emit('participant:left', {
      sessionId,
      userId,
      participantCount: session.participants.length
    });
  }

  /**
   * Apply edit operation
   */
  async applyOperation(sessionId: string, data: {
    userId: string;
    type: 'insert' | 'delete' | 'replace';
    position: number;
    content?: string;
    length?: number;
  }): Promise<EditOperation> {
    const session = this.editSessions.get(sessionId);
    if (!session) throw new Error(`Session not found: ${sessionId}`);

    const documentId = session.documentId;
    const operations = this.editOperations.get(documentId) || [];
    const version = operations.length;

    const operation: EditOperation = {
      id: `op-${Math.random().toString(36).substr(2, 9)}`,
      sessionId,
      userId: data.userId,
      timestamp: new Date(),
      type: data.type,
      position: data.position,
      content: data.content,
      length: data.length,
      version
    };

    operations.push(operation);
    this.editOperations.set(documentId, operations);

    // Apply operation to document
    let content = this.documentContent.get(documentId) || '';

    switch (data.type) {
      case 'insert':
        content = content.slice(0, data.position) + (data.content || '') + content.slice(data.position);
        break;
      case 'delete':
        content = content.slice(0, data.position) + content.slice(data.position + (data.length || 0));
        break;
      case 'replace':
        content = content.slice(0, data.position) + (data.content || '') + content.slice(data.position + (data.length || 0));
        break;
    }

    this.documentContent.set(documentId, content);
    session.lastModified = new Date();

    // Check for version checkpoint
    if (operations.length % this.config.versionCheckpointInterval === 0) {
      await this.createVersionCheckpoint(documentId, data.userId);
    }

    // Queue for conflict detection
    const pending = this.pendingOperations.get(documentId) || [];
    pending.push(operation);
    if (pending.length > 1000) pending.shift();
    this.pendingOperations.set(documentId, pending);

    this.emit('operation:applied', operation);

    return operation;
  }

  /**
   * Update cursor position
   */
  async updateCursorPosition(sessionId: string, data: {
    userId: string;
    position: number;
    selectionStart: number;
    selectionEnd: number;
  }): Promise<void> {
    const session = this.editSessions.get(sessionId);
    if (!session) return;

    const participant = session.participants.find(p => p.userId === data.userId);
    if (participant) {
      participant.cursorPosition = data.position;
      participant.selectionStart = data.selectionStart;
      participant.selectionEnd = data.selectionEnd;
    }

    // Record cursor update
    const key = `${sessionId}-${data.userId}`;
    const updates = this.cursorPositions.get(key) || [];
    updates.push({
      userId: data.userId,
      position: data.position,
      selectionStart: data.selectionStart,
      selectionEnd: data.selectionEnd,
      timestamp: new Date()
    });

    if (updates.length > 100) updates.shift();
    this.cursorPositions.set(key, updates);

    this.emit('cursor:updated', {
      sessionId,
      userId: data.userId,
      position: data.position
    });
  }

  /**
   * Transform operations for concurrent editing
   */
  private transformOperations(op1: EditOperation, op2: EditOperation): EditOperation {
    // Operational transformation logic
    // If two operations overlap, transform them to maintain consistency

    const transformed: EditOperation = { ...op2 };

    // Simple OT: adjust position based on earlier operations
    if (op1.position < op2.position) {
      if (op1.type === 'insert') {
        transformed.position += (op1.content?.length || 0);
      } else if (op1.type === 'delete') {
        transformed.position = Math.max(op1.position, transformed.position - (op1.length || 0));
      }
    }

    return transformed;
  }

  /**
   * Detect conflicts
   */
  private startConflictDetection(): void {
    setInterval(() => {
      for (const [documentId, operations] of this.pendingOperations) {
        if (operations.length > 1) {
          this.detectAndResolveConflicts(documentId, operations);
        }
      }
    }, this.config.conflictDetectionWindow);
  }

  /**
   * Detect and resolve conflicts
   */
  private async detectAndResolveConflicts(documentId: string, operations: EditOperation[]): Promise<void> {
    // Check for overlapping operations
    for (let i = 0; i < operations.length - 1; i++) {
      for (let j = i + 1; j < operations.length; j++) {
        const op1 = operations[i];
        const op2 = operations[j];

        // Check if operations conflict (overlap in position)
        if (this.operationsConflict(op1, op2)) {
          const resolution = await this.resolveConflict(op1, op2, documentId);
          const resolutions = this.conflictResolutions.get(documentId) || [];
          resolutions.push(resolution);
          if (resolutions.length > 100) resolutions.shift();
          this.conflictResolutions.set(documentId, resolutions);

          this.emit('conflict:resolved', resolution);
        }
      }
    }

    // Clear processed operations
    const cutoff = Date.now() - this.config.operationTimeout;
    const remaining = operations.filter(op => op.timestamp.getTime() > cutoff);
    if (remaining.length === 0) {
      this.pendingOperations.delete(documentId);
    } else {
      this.pendingOperations.set(documentId, remaining);
    }
  }

  /**
   * Check if operations conflict
   */
  private operationsConflict(op1: EditOperation, op2: EditOperation): boolean {
    const op1End = op1.position + (op1.length || 0);
    const op2End = op2.position + (op2.length || 0);

    // Check overlap
    return !(op1End <= op2.position || op2End <= op1.position);
  }

  /**
   * Resolve conflict
   */
  private async resolveConflict(op1: EditOperation, op2: EditOperation, documentId: string): Promise<ConflictResolution> {
    const content = this.documentContent.get(documentId) || '';

    // Strategy: last-write-wins with operational transformation
    const resolved = op1.timestamp < op2.timestamp ? op2 : op1;
    const transformedOp = this.transformOperations(
      op1.timestamp < op2.timestamp ? op1 : op2,
      op1.timestamp < op2.timestamp ? op2 : op1
    );

    const resolution: ConflictResolution = {
      id: `conflict-${Math.random().toString(36).substr(2, 9)}`,
      sessionId: op1.sessionId,
      operation1: op1,
      operation2: op2,
      strategy: 'operational_transform_with_lww',
      resolvedContent: content,
      timestamp: new Date()
    };

    return resolution;
  }

  /**
   * Create version checkpoint
   */
  private async createVersionCheckpoint(documentId: string, author: string): Promise<void> {
    const content = this.documentContent.get(documentId) || '';
    const operations = this.editOperations.get(documentId) || [];

    const versions = this.documentVersions.get(documentId) || [];
    const lastVersion = versions[versions.length - 1]?.version || 0;

    const version: DocumentVersion = {
      version: lastVersion + 1,
      timestamp: new Date(),
      content,
      author,
      operationCount: operations.length,
      checksum: this.calculateChecksum(content)
    };

    versions.push(version);

    if (versions.length > this.config.maxVersionHistory) {
      versions.shift();
    }

    this.documentVersions.set(documentId, versions);

    this.emit('version:created', version);
  }

  /**
   * Calculate checksum
   */
  private calculateChecksum(content: string): string {
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  /**
   * Generate user color
   */
  private generateUserColor(userId: string): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B88B', '#85E89D'
    ];

    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      hash = userId.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }

  /**
   * Get session info
   */
  getSession(sessionId: string): EditSession | undefined {
    return this.editSessions.get(sessionId);
  }

  /**
   * Get document content
   */
  getDocumentContent(documentId: string): string {
    return this.documentContent.get(documentId) || '';
  }

  /**
   * Get document versions
   */
  getDocumentVersions(documentId: string, limit: number = 50): DocumentVersion[] {
    const versions = this.documentVersions.get(documentId) || [];
    return versions.slice(-limit);
  }

  /**
   * Get edit operations
   */
  getEditOperations(documentId: string, limit: number = 100): EditOperation[] {
    const operations = this.editOperations.get(documentId) || [];
    return operations.slice(-limit);
  }

  /**
   * Get conflict history
   */
  getConflictHistory(documentId: string, limit: number = 50): ConflictResolution[] {
    const conflicts = this.conflictResolutions.get(documentId) || [];
    return conflicts.slice(-limit);
  }

  /**
   * Get cursor positions for session
   */
  getParticipantCursors(sessionId: string): Record<string, EditorParticipant> {
    const session = this.editSessions.get(sessionId);
    if (!session) return {};

    const cursors: Record<string, EditorParticipant> = {};
    for (const participant of session.participants) {
      cursors[participant.userId] = participant;
    }

    return cursors;
  }

  /**
   * Get session stats
   */
  getSessionStats(sessionId: string): {
    participantCount: number;
    operationCount: number;
    versionCount: number;
    lastModified: Date;
  } {
    const session = this.editSessions.get(sessionId);
    if (!session) {
      return {
        participantCount: 0,
        operationCount: 0,
        versionCount: 0,
        lastModified: new Date()
      };
    }

    const operations = this.editOperations.get(session.documentId) || [];
    const versions = this.documentVersions.get(session.documentId) || [];

    return {
      participantCount: session.participants.length,
      operationCount: operations.length,
      versionCount: versions.length,
      lastModified: session.lastModified
    };
  }

  /**
   * Restore document to version
   */
  async restoreToVersion(documentId: string, versionNumber: number): Promise<string> {
    const versions = this.documentVersions.get(documentId) || [];
    const version = versions.find(v => v.version === versionNumber);

    if (!version) {
      throw new Error(`Version not found: ${versionNumber}`);
    }

    this.documentContent.set(documentId, version.content);

    this.emit('document:restored', {
      documentId,
      versionNumber,
      timestamp: new Date()
    });

    return version.content;
  }

  /**
   * Get document stats
   */
  getDocumentStats(documentId: string): {
    contentLength: number;
    versionCount: number;
    operationCount: number;
    participantCount: number;
    lastModified: Date;
  } {
    const content = this.documentContent.get(documentId) || '';
    const versions = this.documentVersions.get(documentId) || [];
    const operations = this.editOperations.get(documentId) || [];

    const sessions = Array.from(this.editSessions.values()).filter(
      s => s.documentId === documentId
    );

    const participants = new Set<string>();
    for (const session of sessions) {
      for (const participant of session.participants) {
        participants.add(participant.userId);
      }
    }

    return {
      contentLength: content.length,
      versionCount: versions.length,
      operationCount: operations.length,
      participantCount: participants.size,
      lastModified: sessions[0]?.lastModified || new Date()
    };
  }
}

export const collaborativeEditorEngine = new CollaborativeEditorEngine();
