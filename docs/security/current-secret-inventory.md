# Current Secret Inventory

**Generated:** 24/04/2026 (Foundation Sprint Day 0)
**Source:** `rg "process.env\."` across `src/`, `app/`, `middleware.ts`.
**Severity heuristic:**
- **CRITICAL** — can charge money, access DB as superuser, forge auth sessions
- **HIGH** — third-party APIs with usage quotas or PII access
- **MEDIUM** — analytics/tracking IDs, public-safe keys
- **LOW** — public URLs, port numbers, mode flags

## Authentication / session

| Env var | Used in (file:line) | In `.env.example`? | Severity |
|---|---|---|---|
| `NEXTAUTH_SECRET` | `src/middleware.ts:151`, `app/api/admin/users/route.ts:25` | Yes | CRITICAL |
| `JWT_SECRET_KEY` | `src/lib/jwt-auth.ts:7`, `app/api/finance/referral/route.ts:120` | No (documented as `JWT_SECRET`) | CRITICAL |
| `ENCRYPTION_SECRET` / `ENCRYPTION_KEY` | `src/lib/encryption.ts:33,46,47,76,79,221` | No | CRITICAL |
| `KILL_SWITCH_ADMIN_SECRET` | `app/api/admin/voice/status/route.ts:20`, `app/api/admin/voice/kill-switch/route.ts:25` | No | HIGH |
| `KILL_SWITCH_RESET_SECRET` | `app/api/admin/voice/kill-switch/route.ts:35` | No | HIGH |
| `CRON_SECRET` | `app/api/cron/voice-retention/route.ts:28,29`, `app/api/cron/reddit-performance/route.ts:15`, `app/api/cron/reddit-orchestrator/route.ts:17`, `app/api/cron/gbp-poster/route.ts:45`, `app/api/cron/expire-job-offers/route.ts:22` | No | HIGH |
| `PAYMENT_SECRET` | `src/lib/payment-security.ts:309` | No | HIGH |

## Database / Supabase

| Env var | Used in | In `.env.example`? | Severity |
|---|---|---|---|
| `DATABASE_URL` | Prisma (implicit via client), `.env.example` | Yes | CRITICAL |
| `DIRECT_URL` | Prisma migrations | Yes | CRITICAL |
| `SUPABASE_SERVICE_ROLE_KEY` | `src/lib/supabase.ts:9` | Yes | CRITICAL |
| `NEXT_PUBLIC_SUPABASE_URL` | `src/lib/supabase.ts:3` | Yes | LOW (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase.ts:4` | Yes | MEDIUM (public-safe but quota/abuse) |

## Payments — Stripe

| Env var | Used in | In `.env.example`? | Severity |
|---|---|---|---|
| `STRIPE_SECRET_KEY` | `src/lib/stripe.ts:4,5,11`, `app/api/payments/refund/route.ts:9,10`, `app/api/payments/create-booking/route.ts:8,9`, `app/api/contractors/release-payment/route.ts:5`, `app/api/voice/tools/send-payment-link/route.ts:28`, `src/lib/services/mock/index.ts:20` | Yes | CRITICAL |
| `STRIPE_WEBHOOK_SECRET` | `app/api/payments/create-booking/route.ts:194`, `app/api/stripe/webhook/route.ts:34,64` | Yes | CRITICAL |
| `STRIPE_APPLICATION_FEE_PRICE_ID` and 9 other `STRIPE_*_PRICE_ID` | `src/lib/stripe.ts:16-32` | Yes | LOW (IDs, not secrets) |

## AI providers

| Env var | Used in | In `.env.example`? | Severity |
|---|---|---|---|
| `OPENAI_API_KEY` | `src/lib/ai/fraud-detection.ts:6,8`, `src/lib/config/elysia-config.ts:53`, `src/lib/services/mock/index.ts:20` | Yes | HIGH |
| `ANTHROPIC_API_KEY` | `src/lib/ai-orchestration/providers/anthropic-provider.ts:13`, `src/lib/config/elysia-config.ts:54`, `src/lib/services/mock/index.ts:22` | Yes | HIGH |
| `OPENROUTER_API_KEY` | `src/lib/ai-orchestration/providers/openrouter-provider.ts:15`, `src/lib/services/mock/index.ts:21` | Yes | HIGH |
| `GOOGLE_GENAI_API_KEY` | `src/lib/visual-generator.ts:34`, `app/api/translate/route.ts:35` | Yes | HIGH |
| `GOOGLE_AI_API_KEY` | `src/lib/visual-generator.ts:34` (fallback) | Yes | HIGH |
| `GEMINI_API_KEY` | `src/lib/visual-generator.ts:34` (fallback) | Yes | HIGH |
| `HRM_API_KEY` | `src/lib/ai-orchestration/providers/hrm-provider.ts:68` | No | HIGH |

## Voice / SMS / Email

| Env var | Used in | In `.env.example`? | Severity |
|---|---|---|---|
| `ELEVENLABS_API_KEY` | `app/api/elevenlabs-tts/route.ts:11`, `app/api/elevenlabs/narrate/route.ts:3` | Yes | HIGH |
| `ELEVENLABS_WEBHOOK_SECRET` | `app/api/voice/elevenlabs/webhook/route.ts:38` | Yes | HIGH |
| `ELEVENLABS_TOOL_WEBHOOK_SECRET` | `src/lib/voice/tool-auth.ts:19` | No | HIGH |
| `TWILIO_AUTH_TOKEN` | `app/api/voice/tools/send-signature-link/route.ts:53,60`, `app/api/voice/tools/send-payment-link/route.ts:91,97` | Yes | HIGH |
| `TWILIO_ACCOUNT_SID` | same files + `app/api/cron/voice-retention/route.ts:48` | Yes | MEDIUM |
| `RESEND_API_KEY` | `src/lib/email.ts:15`, `app/api/email/test/route.ts:97` | Yes | HIGH |
| `SENDGRID_API_KEY` | `.env.example` only (not wired) | Yes | HIGH |

## Third-party APIs

| Env var | Used in | In `.env.example`? | Severity |
|---|---|---|---|
| `GBP_CLIENT_SECRET` | `src/lib/gbp/client.ts:35` | No | HIGH |
| `GBP_REFRESH_TOKEN` | `src/lib/gbp/client.ts:36` | No | HIGH |
| `GBP_CLIENT_ID` | `src/lib/gbp/client.ts:34` | No | MEDIUM |
| `GOOGLE_PLACES_API_KEY` | `app/api/rating/route.ts:31` | No | HIGH |
| `SEMRUSH_API_KEY` | `src/lib/semrush-integration.ts:9`, `src/lib/semrush-api.ts:50` | No | HIGH |
| `REDDIT_CLIENT_SECRET` | `src/lib/reddit/reddit-client.ts:85` | No | HIGH |
| `REDDIT_REFRESH_TOKEN` | `src/lib/reddit/reddit-client.ts:86` | No | HIGH |
| `UNITE_GROUP_API_KEY` | `src/lib/unite-group/client.ts:45` | No | HIGH |
| `VERCEL_TOKEN` | `src/lib/agents/deployment-monitor/index.ts:33` | No | HIGH |
| `AWS_SECRET_ACCESS_KEY` | (AWS SDK implicit) | Yes | HIGH |
| `KMS_KEY_ID` | `.env.example` — DR-390 | Yes | MEDIUM (ARN, not secret) |

## Public / tracking (severity low-medium)

| Env var | Used in | In `.env.example`? | Severity |
|---|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `app/analytics.tsx:6`, `app/layout.tsx:366,374` | No (hardcoded fallback) | LOW |
| `NEXT_PUBLIC_GTM_ID` | `src/components/analytics/GoogleTagManager.tsx:6`, `app/analytics.tsx:35` | No | LOW |
| `NEXT_PUBLIC_CLARITY_ID` | `src/components/analytics/MicrosoftClarity.tsx:6`, `app/analytics.tsx:65` | Yes | LOW |
| `NEXT_PUBLIC_FB_PIXEL_ID` | `app/analytics.tsx:85`, `src/lib/consistency-engine.ts:260` | No | LOW |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `src/lib/consistency-engine.ts:261` | No | LOW |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | `src/lib/consistency-engine.ts:262` | No | LOW |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | `src/hooks/useNotifications.ts:131` | No | LOW (public key) |
| `NEXT_PUBLIC_APP_URL` | 40+ files | Yes | LOW |
| `NEXT_PUBLIC_SITE_URL` | multiple | Yes | LOW |
| `NEXT_PUBLIC_CDN_URL` | `src/lib/image-optimization/optimizer.ts:443` | No | LOW |
| `NEXT_PUBLIC_API_URL` | `src/lib/ui-system.tsx:125` | Yes | LOW |
| `NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED` | `src/components/finance/EquippedConsentForm.tsx:67` | No | LOW |
| `NEXT_PUBLIC_EQUIPPED_EMBED_URL` | `app/finance/handoff/HandoffFrame.tsx:13` | No | LOW |
| `NEXT_PUBLIC_DEMO_MODE` | `src/lib/demo-mode.ts:9` | Yes | LOW |
| `NEXT_PUBLIC_AVAILABLE_MODULES` | `app/portal/training/config/moduleConfig.ts:22,193` | No | LOW |
| `NEXT_PUBLIC_TRANSLATION_MODEL` | `src/lib/language-context.tsx:22` | No | LOW |
| `NEXT_PUBLIC_WS_URL` | `.env.example` | Yes | LOW |

## Feature flags / modes

| Env var | Used in | Severity |
|---|---|---|
| `NODE_ENV` | 40+ files | LOW |
| `VOICE_AGENT_ENABLED` | `src/lib/voice/route-helpers.ts:66`, `src/lib/voice/kill-switch.ts:71`, `app/api/voice/elevenlabs/webhook/route.ts:67`, `app/api/admin/voice/status/route.ts:35` | LOW |
| `VOICE_RETENTION_CRON_ENABLED` | `app/api/cron/voice-retention/route.ts:34` | LOW |
| `VOICE_DENY_LIST_JSON` | `src/lib/voice/deny-list.ts:38` | MEDIUM (panel data) |
| `COMPLIANCE_EVENTS_ENABLED` | `src/lib/compliance/events.ts:20` | LOW |
| `REDDIT_ORCHESTRATOR_ENABLED` | `app/api/cron/reddit-orchestrator/route.ts:27` | LOW |
| `GBP_ENABLED` | `src/lib/gbp/client.ts:152` | LOW |
| `ENABLE_DEMO_USERS` | `app/api/auth/login/route.ts:26` | LOW |
| `DEBUG_MODE` | (historic) | LOW |
| `LOG_LEVEL` | `src/lib/logger.ts:51`, `src/lib/config/elysia-config.ts:71` | LOW |

## Summary

- **CRITICAL env vars:** 9 (auth secrets, DB URLs, Supabase service role, Stripe keys, encryption secret)
- **HIGH env vars:** ~20 (AI providers, email, SMS, third-party APIs)
- **MEDIUM env vars:** ~5
- **LOW env vars:** ~25 (public IDs, flags, modes)
- **Total `process.env.*` references across src/app:** ~180
