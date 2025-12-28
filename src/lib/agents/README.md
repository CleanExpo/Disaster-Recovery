# Agent System - Disaster Recovery NRPG Platform

**Production-quality AI agent system built with Claude Agent SDK**

## Overview

This module implements a multi-agent system for disaster recovery inspection report processing using the **snake build pattern** where orchestrators are visible to users and specialized subagents work underneath.

## Agents

### 1. CEO Oversight Agent
- Management dashboard for executive oversight
- Real-time business metrics aggregation
- Business rule violation detection
- Alert management (email/Slack/SMS)

### 2. Agent Orchestrator
- Coordinates 4-agent inspection workflow
- Sequential execution with state persistence
- Error handling and rollback
- QA rejection handling

## API Endpoints

**POST /api/agents/execute** - Execute inspection workflow
**GET /api/agents/execute** - API documentation

## Performance Targets

- End-to-end workflow: < 60 seconds
- Success rate: 95%+
- QA approval rate: 85%+

See full documentation in source files.
