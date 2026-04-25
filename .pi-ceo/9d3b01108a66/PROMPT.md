# Task Brief

Fix the 'Dangerous pattern: Debug mode enabled' finding at src/lib/ai-orchestration/README.md:447. The line documents ORCHESTRATION_DEBUG=true and LOG_LEVEL=debug. Actions: (1) check that ORCHESTRATION_DEBUG is actually read by any .ts file with `rg "process.env.ORCHESTRATION_DEBUG" --type ts`; if unused, remove it from the README as dead documentation. (2) Add a prominent 'Local development only' warning blockquote above the Debug Mode section. (3) Commit the README edit.

## Session: 9d3b01108a66
