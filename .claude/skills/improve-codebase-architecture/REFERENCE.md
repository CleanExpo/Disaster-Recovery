<!--
Ported from https://github.com/mattpocock/skills/tree/main/improve-codebase-architecture/REFERENCE.md
Original (c) 2026 Matt Pocock — MIT Licence.
This derivative work is also MIT-licensed. See .claude/skills/LICENSE.
en-AU adaptation: spelling.
DR adaptation: Local-substitutable uses Prisma + SQLite / prisma-fabbrica;
              Ports & Adapters section adds a Next.js 14 RSC note.
-->

# Reference

## Dependency Categories

When assessing a candidate for deepening, classify its dependencies:

### 1. In-process

Pure computation, in-memory state, no I/O. Always deepenable — just merge the modules and test directly.

### 2. Local-substitutable

Dependencies that have local test stand-ins. Deepenable if the test substitute exists. The deepened module is tested with the local stand-in running in the test suite.

In this codebase the canonical local stand-in is Prisma with a SQLite test database (`DATABASE_URL="file:./test.db"`) or [`@quramy/prisma-fabbrica`](https://github.com/Quramy/prisma-fabbrica) for factory-based in-memory fixtures. Either option keeps boundary tests fast and deterministic while exercising the real Prisma client — no manual query-builder stubs.

### 3. Remote but owned (Ports & Adapters)

Your own services across a network boundary (microservices, internal APIs). Define a port (interface) at the module boundary. The deep module owns the logic; the transport is injected. Tests use an in-memory adapter. Production uses the real HTTP/gRPC/queue adapter.

Recommendation shape: "Define a shared interface (port), implement an HTTP adapter for production and an in-memory adapter for testing, so the logic can be tested as one deep module even though it's deployed across a network boundary."

For RSC data-layer ports in Next.js 14 App Router, the production adapter is the Prisma client; the test adapter is an in-memory implementation of the same repository interface. The deep module (e.g. `ClaimService`) depends only on the port and can be unit-tested without a database, while the server component swaps in the Prisma-backed adapter at request time.

### 4. True external (Mock)

Third-party services (Stripe, Twilio, Gemini, etc.) you don't control. Mock at the boundary. The deepened module takes the external dependency as an injected port, and tests provide a mock implementation.

## Testing Strategy

The core principle: **replace, don't layer.**

- Old unit tests on shallow modules are waste once boundary tests exist — delete them
- Write new tests at the deepened module's interface boundary
- Tests assert on observable outcomes through the public interface, not internal state
- Tests should survive internal refactors — they describe behaviour, not implementation

## Issue Template

<issue-template>

## Problem

Describe the architectural friction:

- Which modules are shallow and tightly coupled
- What integration risk exists in the seams between them
- Why this makes the codebase harder to navigate and maintain

## Proposed Interface

The chosen interface design:

- Interface signature (types, methods, params)
- Usage example showing how callers use it
- What complexity it hides internally

## Dependency Strategy

Which category applies and how dependencies are handled:

- **In-process**: merged directly
- **Local-substitutable**: tested with [specific stand-in]
- **Ports & adapters**: port definition, production adapter, test adapter
- **Mock**: mock boundary for external services

## Testing Strategy

- **New boundary tests to write**: describe the behaviours to verify at the interface
- **Old tests to delete**: list the shallow module tests that become redundant
- **Test environment needs**: any local stand-ins or adapters required

## Implementation Recommendations

Durable architectural guidance that is NOT coupled to current file paths:

- What the module should own (responsibilities)
- What it should hide (implementation details)
- What it should expose (the interface contract)
- How callers should migrate to the new interface

</issue-template>
