# Spec Interview Method

## Entry Point Detection

### Mode A: New Idea
**Trigger**: User describes concept without existing code
**Action**: Begin Phase 1 Vision Discovery

### Mode B: Existing Codebase  
**Trigger**: User provides repo URL or references existing project
**Action**: 
1. Run codebase scan via @project-intel
2. Generate enhancement recommendations
3. Begin interview with current state context

### Mode C: Continuation
**Trigger**: References previous spec or ongoing work
**Action**: Load previous context via @history, resume from last phase

---

## Interview Phases

### Phase 1: Vision Discovery
- What specific pain point does this solve?
- Who experiences this pain most acutely?
- How will you know this succeeded in 6 months?
- What's explicitly OUT of scope?
- What's the smallest version that still solves the problem?

### Phase 2: User Intelligence
- Describe your primary user in one sentence
- What tools do they currently use?
- What's their first action after signup?
- What would make them recommend this?
- What accessibility requirements exist?

### Phase 3: Technical Architecture
- What's the expected user load at launch? At scale?
- What integrations are mandatory vs nice-to-have?
- What compliance/regulatory requirements exist?
- Where should AI enhance the experience?
- How should failures be handled?

### Phase 4: Design & Experience
- Does existing brand guidelines apply?
- What products should this feel similar to?
- Is this primarily mobile, desktop, or both?
- What voice and tone should content have?
- How should errors and empty states be handled?

### Phase 5: Business Model
- How does this generate revenue?
- What's free vs paid?
- What's the acquisition strategy?
- What's the budget range?
- What could kill this project?

### Phase 6: Implementation Strategy
- Waterfall, Agile, or something else?
- Who's building this?
- What's the definition of "done"?
- What's the rollout strategy?
- What's the rollback process?

---

## Anti-Pattern Detection

| Signal | Response |
|--------|----------|
| "Obviously users will..." | Stop. Ask for evidence. |
| "While we're at it..." | Note as future. Redirect to MVP. |
| "Someone will handle..." | Pin down specific owner. |
| "It's just a simple..." | Drill into specifics. |

---

## Edge Case Protocol

For each core feature, explore:
- Zero items / one item / max items / beyond max
- First-time vs returning users
- Mid-transaction failures
- Network/API timeouts
- Invalid or duplicate submissions

---

## Output Structure
```yaml
---
title: [Project Name]
version: 1.0
created: [Date]
status: draft | review | approved
---
```

## Sections
1. Executive Summary
2. Problem Statement
3. User Personas
4. User Stories
5. Technical Requirements
6. Architecture Diagram
7. API Contracts
8. Data Models
9. UI/UX Specifications
10. Success Metrics
11. Timeline & Milestones
12. Risk Register
13. Open Questions
