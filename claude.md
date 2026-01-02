# Disaster Recovery NRPG - Claude Configuration

> National Restoration Partner Gateway - Marketing Agency Platform
> Last Updated: 2026-01-03

## Project Overview

A Next.js 14 platform connecting property owners with restoration contractors across Australia. This is a **marketing agency** - contractors are independent businesses and become the sole point of contact after client matching.

## Critical Business Rules

1. **NO PHONE NUMBERS** - Email only: support@disasterrecovery.com.au
2. **Contractors are independent** - Platform facilitates matching only
3. **Dynamic SEO generation** - Pages created on contractor signup, not pre-generated
4. **Australian English** - colour, mould, organisation, specialised

## Tier Pricing (Population-Based)

| Tier | Population | Price/Month |
|------|------------|-------------|
| Rural | <50,000 | $395 |
| Semi-Rural | 50,001-200,000 | $595 |
| Tier 1 | 200,001-400,000 | $795 |
| Tier 2 | 400,001-1,000,000 | $995 |
| Tier 3 | >1,000,000 | $1,095 |

**10% buffer** applied to tier thresholds to prevent edge cases.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **CMS**: Sanity
- **Search**: PostgreSQL full-text (no Algolia)
- **Payments**: Stripe
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Key Directories
```
app/                    # Next.js App Router pages
├── api/               # API routes
├── [city]/area/[suburb]/   # Dynamic SEO pages
├── contractor/        # Contractor portal
├── client/            # Client portal
└── admin/             # Admin dashboard

lib/
├── geo/               # Tier calculation, radius, maps
├── search/            # PostgreSQL full-text search
├── sanity/            # CMS integration
└── prisma.ts          # Database client

components/
├── Map3D/             # 3D coverage visualisation
└── ui/                # Shared UI components

sanity/schemas/        # CMS content schemas
```

## System Status: 17/17 Complete

See SYSTEM_STATUS.md for full breakdown.

## Commands
```bash
npm run dev            # Development server
npm run build          # Production build
npm run test           # Run tests
npm run db:push        # Push Prisma schema
npm run db:studio      # Open Prisma Studio
```
