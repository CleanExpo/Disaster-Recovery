# ADR-001: Gemma 4 Multilingual Translation Architecture

**Status:** Accepted (Phase 1 live, Phase 2 pending DPA)
**Date:** 2026-04-07
**Deciders:** Board (Session 25)

## Context

Disaster Recovery serves CALD communities across AU/NZ.
ABS 2021 data shows 28% of disaster-affected households speak a language other than English at home.

## Decision

Use Google's Gemma 4 model via Google Generative AI API for server-side translation of UI strings.

## Architecture

- Client: useLanguage() hook in language-context.tsx
- API: POST /api/translate with PII minimisation layer
- Cache: sessionStorage (hash-keyed, model-versioned)
- Supported: 24 languages (ABS 2021 + Stats NZ 2018 top AU/NZ languages)
- RTL: Arabic, Urdu, Hebrew, Farsi, Pashto via DirectionProvider

## Phase 1 (live): gemini-1.5-flash

## Phase 2 (pending DPA DR-430): gemma-3-27b-it via Vertex AI

## Consequences

- PII never sent to AI model (minimisePII() layer)
- Offline: falls back to English (IndexedDB does not cache translations)
- Cost: ~$0.001 per 1000 chars translated
