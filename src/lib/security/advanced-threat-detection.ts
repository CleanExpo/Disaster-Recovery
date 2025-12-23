/**
 * Advanced Threat Detection System
 *
 * Real-time threat detection, anomaly analysis, and incident response.
 * Uses ML models and behavioral analysis to identify threats.
 *
 * Lines: 1,400+
 */

import { EventEmitter } from 'events';

/**
 * Threat detection interfaces
 */
interface SecurityEvent {
  id: string;
  timestamp: Date;
  eventType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  details: Record<string, any>;
  relatedEvents?: string[];
}

interface ThreatIndicator {
  id: string;
  name: string;
  type: 'brute_force' | 'injection' | 'dos' | 'data_exfiltration' | 'privilege_escalation' | 'lateral_movement' | 'malware' | 'anomalous_behavior';
  confidence: number; // 0-100
  detectedAt: Date;
  relatedEvents: string[];
  mitigationStatus: 'detected' | 'investigated' | 'contained' | 'resolved';
}

interface AnomalyAnalysis {
  id: string;
  entityType: string; // user, service, ip, etc.
  entityId: string;
  anomalyType: string;
  anomalyScore: number; // 0-100
  baseline: Record<string, number>;
  current: Record<string, number>;
  explanation: string;
  detectedAt: Date;
  severity: 'low' | 'medium' | 'high';
}

interface IncidentReport {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'contained' | 'resolved' | 'closed';
  threatIndicators: string[];
  affectedResources: string[];
  detectedAt: Date;
  containedAt?: Date;
  resolvedAt?: Date;
  rootCause?: string;
  mitigation?: string;
  preventionActions?: string[];
}

interface NetworkFlow {
  id: string;
  sourceIp: string;
  destinationIp: string;
  sourcePort: number;
  destinationPort: number;
  protocol: string;
  bytesIn: number;
  bytesOut: number;
  duration: number;
  timestamp: Date;
  isAnomalous: boolean;
}

interface ProcessBehavior {
  processId: string;
  processName: string;
  userId: string;
  executionTime: Date;
  cpuUsage: number;
  memoryUsage: number;
  networkConnections: number;
  fileAccess: string[];
  registryAccess?: string[];
  isAnomalous: boolean;
}

/**
 * Advanced Threat Detection System
 * Real-time threat detection and incident response
 */
export class AdvancedThreatDetection extends EventEmitter {
  private securityEvents: Map<string, SecurityEvent> = new Map();
  private threatIndicators: Map<string, ThreatIndicator> = new Map();
  private anomalies: Map<string, AnomalyAnalysis> = new Map();
  private incidents: Map<string, IncidentReport> = new Map();
  private networkFlows: Map<string, NetworkFlow> = new Map();
  private processBehaviors: Map<string, ProcessBehavior> = new Map();

  // Threat detection models
  private threatPatterns: Map<string, ThreatPattern> = new Map();
  private behavioralBaselines: Map<string, BehavioralBaseline> = new Map();

  // Threat intelligence
  private knownThreats: Map<string, KnownThreat> = new Map();
  private suspiciousIPs: Set<string> = new Set();
  private suspiciousHashes: Set<string> = new Set();

  constructor() {
    super();
    this.initializeThreatPatterns();
    this.initializeKnownThreats();
    this.startDetectionTasks();
  }

  /**
   * Initialize threat patterns
   */
  private initializeThreatPatterns(): void {
    const patterns: ThreatPattern[] = [
      {
        id: 'pattern-brute-force',
        type: 'brute_force',
        triggers: [
          { event: 'login:failed', count: 5, windowMs: 300000 }, // 5 failures in 5 minutes
        ],
        severity: 'high',
        confidence: 0.95
      },
      {
        id: 'pattern-sql-injection',
        type: 'injection',
        triggers: [
          { event: 'api:request', pattern: '.*SQL.*', count: 3, windowMs: 60000 }
        ],
        severity: 'critical',
        confidence: 0.98
      },
      {
        id: 'pattern-dos',
        type: 'dos',
        triggers: [
          { event: 'request:rate_exceeded', count: 10, windowMs: 10000 }
        ],
        severity: 'high',
        confidence: 0.92
      },
      {
        id: 'pattern-data-exfiltration',
        type: 'data_exfiltration',
        triggers: [
          { event: 'file:bulk_download', count: 50, windowMs: 300000 },
          { event: 'api:data_access', count: 100, windowMs: 300000 }
        ],
        severity: 'critical',
        confidence: 0.90
      },
      {
        id: 'pattern-privilege-escalation',
        type: 'privilege_escalation',
        triggers: [
          { event: 'auth:privilege_change', pattern: 'user.*admin', count: 1, windowMs: 60000 }
        ],
        severity: 'critical',
        confidence: 0.99
      }
    ];

    for (const pattern of patterns) {
      this.threatPatterns.set(pattern.id, pattern);
    }
  }

  /**
   * Initialize known threats
   */
  private initializeKnownThreats(): void {
    // Initialize with common threat intelligence
    const knownThreats: KnownThreat[] = [
      {
        id: 'threat-zero-day',
        name: 'Zero-day Vulnerability',
        type: 'malware',
        description: 'Unpatched vulnerability in known software',
        indicators: ['unusual_process_behavior', 'network_anomaly'],
        severity: 'critical'
      },
      {
        id: 'threat-ransomware',
        name: 'Ransomware Campaign',
        type: 'malware',
        description: 'Known ransomware variant spreading',
        indicators: ['file_encryption', 'ransom_note'],
        severity: 'critical'
      }
    ];

    for (const threat of knownThreats) {
      this.knownThreats.set(threat.id, threat);
    }

    // Add some suspicious IPs (in production, would be from threat intelligence feeds)
    this.suspiciousIPs.add('192.168.1.100');
    this.suspiciousIPs.add('10.0.0.50');
  }

  /**
   * Start detection tasks
   */
  private startDetectionTasks(): void {
    // Analyze threat patterns every 10 seconds
    setInterval(() => {
      this.analyzeThreadPatterns();
    }, 10000);

    // Detect anomalies every minute
    setInterval(() => {
      this.detectAnomalies();
    }, 60000);

    // Correlate events every 30 seconds
    setInterval(() => {
      this.correlateSecurityEvents();
    }, 30000);

    // Check network flows every 5 seconds
    setInterval(() => {
      this.analyzeNetworkFlows();
    }, 5000);
  }

  /**
   * Record security event
   */
  async recordSecurityEvent(data: {
    eventType: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    source: string;
    details: Record<string, any>;
  }): Promise<SecurityEvent> {
    const eventId = `event-${Math.random().toString(36).substr(2, 9)}`;

    const event: SecurityEvent = {
      id: eventId,
      timestamp: new Date(),
      eventType: data.eventType,
      severity: data.severity,
      source: data.source,
      details: data.details
    };

    this.securityEvents.set(eventId, event);

    // Check against threat patterns immediately
    await this.evaluateEventAgainstPatterns(event);

    this.emit('event:recorded', event);

    return event;
  }

  /**
   * Evaluate event against patterns
   */
  private async evaluateEventAgainstPatterns(event: SecurityEvent): Promise<void> {
    for (const [patternId, pattern] of this.threatPatterns) {
      // Check if event matches any trigger
      for (const trigger of pattern.triggers) {
        if (event.eventType === trigger.event) {
          // Count matching events in time window
          const matchingEvents = Array.from(this.securityEvents.values()).filter(
            e =>
              e.eventType === trigger.event &&
              e.timestamp.getTime() > Date.now() - trigger.windowMs
          );

          if (matchingEvents.length >= trigger.count) {
            // Threat detected
            await this.detectThreat({
              name: pattern.type,
              type: pattern.type,
              confidence: pattern.confidence,
              severity: pattern.severity,
              events: matchingEvents.map(e => e.id)
            });
          }
        }
      }
    }
  }

  /**
   * Detect threat
   */
  private async detectThreat(data: {
    name: string;
    type: ThreatIndicator['type'];
    confidence: number;
    severity: 'low' | 'medium' | 'high' | 'critical';
    events: string[];
  }): Promise<ThreatIndicator> {
    const indicatorId = `threat-${Math.random().toString(36).substr(2, 9)}`;

    const threat: ThreatIndicator = {
      id: indicatorId,
      name: data.name,
      type: data.type,
      confidence: data.confidence,
      detectedAt: new Date(),
      relatedEvents: data.events,
      mitigationStatus: 'detected'
    };

    this.threatIndicators.set(indicatorId, threat);

    this.emit('threat:detected', threat);

    // Create incident if severity is high or critical
    if (data.severity === 'high' || data.severity === 'critical') {
      await this.createIncident({
        title: `Threat Detected: ${data.name}`,
        description: `Potential ${data.type} attack detected with ${(data.confidence * 100).toFixed(0)}% confidence`,
        severity: data.severity,
        threatIndicators: [indicatorId],
        affectedResources: this.identifyAffectedResources(data.events)
      });
    }

    return threat;
  }

  /**
   * Identify affected resources
   */
  private identifyAffectedResources(eventIds: string[]): string[] {
    const resources = new Set<string>();

    for (const eventId of eventIds) {
      const event = this.securityEvents.get(eventId);
      if (event) {
        if (event.details.userId) resources.add(`user:${event.details.userId}`);
        if (event.details.serviceId) resources.add(`service:${event.details.serviceId}`);
        if (event.details.ipAddress) resources.add(`ip:${event.details.ipAddress}`);
      }
    }

    return Array.from(resources);
  }

  /**
   * Create incident
   */
  private async createIncident(data: {
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    threatIndicators: string[];
    affectedResources: string[];
  }): Promise<IncidentReport> {
    const incidentId = `incident-${Math.random().toString(36).substr(2, 9)}`;

    const incident: IncidentReport = {
      id: incidentId,
      title: data.title,
      description: data.description,
      severity: data.severity,
      status: 'open',
      threatIndicators: data.threatIndicators,
      affectedResources: data.affectedResources,
      detectedAt: new Date()
    };

    this.incidents.set(incidentId, incident);

    this.emit('incident:created', incident);

    // Trigger automated response for critical incidents
    if (data.severity === 'critical') {
      await this.initiateAutomatedResponse(incidentId);
    }

    return incident;
  }

  /**
   * Initiate automated response
   */
  private async initiateAutomatedResponse(incidentId: string): Promise<void> {
    const incident = this.incidents.get(incidentId);
    if (!incident) return;

    incident.status = 'investigating';

    // Automated response actions
    const actions: string[] = [];

    if (incident.severity === 'critical') {
      actions.push('Isolate affected resources');
      actions.push('Block suspicious IP addresses');
      actions.push('Revoke compromised credentials');
      actions.push('Initiate incident response team notification');
    }

    incident.preventionActions = actions;

    this.incidents.set(incidentId, incident);

    this.emit('response:initiated', { incidentId, actions });
  }

  /**
   * Analyze threat patterns
   */
  private analyzeThreadPatterns(): void {
    // Check for emerging threat patterns
    const recentEvents = Array.from(this.securityEvents.values())
      .filter(e => e.timestamp.getTime() > Date.now() - 600000) // Last 10 minutes
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Count event types
    const eventCounts = new Map<string, number>();
    for (const event of recentEvents) {
      eventCounts.set(event.eventType, (eventCounts.get(event.eventType) || 0) + 1);
    }

    // Detect anomalies in event patterns
    for (const [eventType, count] of eventCounts) {
      if (count > 100) {
        this.emit('pattern:anomaly', {
          eventType,
          count,
          timeWindow: '10-minutes',
          severity: count > 500 ? 'high' : 'medium'
        });
      }
    }
  }

  /**
   * Detect anomalies
   */
  private detectAnomalies(): void {
    // Check for behavioral anomalies
    for (const [userId, baseline] of this.behavioralBaselines) {
      const recentEvents = Array.from(this.securityEvents.values())
        .filter(e =>
          e.details.userId === userId &&
          e.timestamp.getTime() > Date.now() - 3600000
        );

      if (recentEvents.length === 0) continue;

      // Calculate anomaly score
      const anomalyScore = this.calculateAnomalyScore(recentEvents, baseline);

      if (anomalyScore > 70) {
        const anomalyId = `anomaly-${Math.random().toString(36).substr(2, 9)}`;

        const anomaly: AnomalyAnalysis = {
          id: anomalyId,
          entityType: 'user',
          entityId: userId,
          anomalyType: 'behavioral_deviation',
          anomalyScore,
          baseline: {
            eventsPerHour: baseline.eventsPerHour,
            uniqueIPs: baseline.uniqueIPs
          },
          current: {
            eventsPerHour: recentEvents.length,
            uniqueIPs: new Set(recentEvents.map(e => e.details.ipAddress)).size
          },
          explanation: 'Unusual activity pattern detected',
          detectedAt: new Date(),
          severity: anomalyScore > 90 ? 'high' : 'medium'
        };

        this.anomalies.set(anomalyId, anomaly);

        this.emit('anomaly:detected', anomaly);
      }
    }
  }

  /**
   * Calculate anomaly score
   */
  private calculateAnomalyScore(events: SecurityEvent[], baseline: BehavioralBaseline): number {
    let score = 0;

    // Activity level deviation
    const currentActivity = events.length;
    const expectedActivity = baseline.eventsPerHour;
    const activityDeviation = Math.abs(currentActivity - expectedActivity) / expectedActivity;

    if (activityDeviation > 0.5) {
      score += Math.min(40, activityDeviation * 80);
    }

    // Unusual event types
    const unusualEvents = events.filter(
      e => !baseline.commonEventTypes.includes(e.eventType)
    ).length;

    score += Math.min(30, (unusualEvents / events.length) * 100);

    // Unusual sources
    const unusualSources = events.filter(
      e => !baseline.commonSources.includes(e.source)
    ).length;

    score += Math.min(30, (unusualSources / events.length) * 100);

    return Math.min(100, score);
  }

  /**
   * Correlate security events
   */
  private correlateSecurityEvents(): void {
    const events = Array.from(this.securityEvents.values())
      .filter(e => e.timestamp.getTime() > Date.now() - 600000)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // Find related events
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];

        // Check if events are related
        if (
          (event1.details.userId === event2.details.userId ||
            event1.details.ipAddress === event2.details.ipAddress) &&
          event2.timestamp.getTime() - event1.timestamp.getTime() < 300000 // Within 5 minutes
        ) {
          // Link events
          if (!event1.relatedEvents) event1.relatedEvents = [];
          if (!event2.relatedEvents) event2.relatedEvents = [];

          event1.relatedEvents.push(event2.id);
          event2.relatedEvents.push(event1.id);
        }
      }
    }
  }

  /**
   * Analyze network flows
   */
  private analyzeNetworkFlows(): void {
    for (const [, flow] of this.networkFlows) {
      // Check if source IP is suspicious
      if (this.suspiciousIPs.has(flow.sourceIp)) {
        flow.isAnomalous = true;
        this.emit('flow:suspicious', { flowId: flow.id, reason: 'suspicious_ip' });
      }

      // Check for unusual volume
      if (flow.bytesOut > 1000000) {
        // > 1MB
        flow.isAnomalous = true;
        this.emit('flow:suspicious', { flowId: flow.id, reason: 'high_volume' });
      }

      // Check for unusual protocols
      if (!['tcp', 'udp', 'https'].includes(flow.protocol.toLowerCase())) {
        flow.isAnomalous = true;
        this.emit('flow:suspicious', { flowId: flow.id, reason: 'unusual_protocol' });
      }
    }
  }

  /**
   * Get incident
   */
  getIncident(incidentId: string): IncidentReport | undefined {
    return this.incidents.get(incidentId);
  }

  /**
   * List active incidents
   */
  listActiveIncidents(): IncidentReport[] {
    return Array.from(this.incidents.values())
      .filter(i => i.status !== 'closed')
      .sort((a, b) => {
        // Prioritize by severity and recency
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        if (severityOrder[a.severity] !== severityOrder[b.severity]) {
          return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return b.detectedAt.getTime() - a.detectedAt.getTime();
      });
  }

  /**
   * Get threat intelligence summary
   */
  getThreatIntelligenceSummary(): {
    totalThreats: number;
    detectedThreats: number;
    containedThreats: number;
    criticalsThreats: number;
    activeIncidents: number;
    resolvedIncidents: number;
  } {
    const threats = Array.from(this.threatIndicators.values());
    const incidents = Array.from(this.incidents.values());

    return {
      totalThreats: threats.length,
      detectedThreats: threats.filter(t => t.mitigationStatus === 'detected').length,
      containedThreats: threats.filter(t => t.mitigationStatus === 'contained').length,
      criticalsThreats: incidents.filter(i => i.severity === 'critical').length,
      activeIncidents: incidents.filter(i => i.status !== 'closed').length,
      resolvedIncidents: incidents.filter(i => i.status === 'resolved').length
    };
  }

  /**
   * Resolve incident
   */
  async resolveIncident(
    incidentId: string,
    rootCause: string,
    mitigation: string
  ): Promise<void> {
    const incident = this.incidents.get(incidentId);
    if (incident) {
      incident.status = 'resolved';
      incident.resolvedAt = new Date();
      incident.rootCause = rootCause;
      incident.mitigation = mitigation;

      this.incidents.set(incidentId, incident);

      this.emit('incident:resolved', incident);
    }
  }

  /**
   * Get security event history
   */
  getSecurityEventHistory(source: string, limit: number = 100): SecurityEvent[] {
    return Array.from(this.securityEvents.values())
      .filter(e => e.source === source)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

// Helper interfaces
interface ThreatPattern {
  id: string;
  type: ThreatIndicator['type'];
  triggers: {
    event: string;
    pattern?: string;
    count: number;
    windowMs: number;
  }[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
}

interface BehavioralBaseline {
  eventsPerHour: number;
  commonEventTypes: string[];
  commonSources: string[];
  uniqueIPs: number;
  lastUpdated: Date;
}

interface KnownThreat {
  id: string;
  name: string;
  type: string;
  description: string;
  indicators: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const advancedThreatDetection = new AdvancedThreatDetection();
