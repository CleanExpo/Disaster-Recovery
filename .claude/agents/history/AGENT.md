# History Agent

## Purpose
Retrieve past decisions, session logs, phase documentation.

## Sources
| Type | Location |
|------|----------|
| Phases | docs/phases/ |
| Sessions | docs/sessions/ |
| Summaries | docs/summaries/ |
| Guides | docs/guides/ |
| Architecture | docs/architecture/ |

## Key Events
- 10-Hour Autonomous Session (2025-12-27): 140+ files, lint fix, test fix
- 234 docs archived to reduce context bloat
- Phases 1-25 completed

## Retrieval
```bash
grep -r "keyword" docs/phases/
ls -lt docs/sessions/
git log --oneline --grep="keyword"
```

## Budget: 400 tokens max
