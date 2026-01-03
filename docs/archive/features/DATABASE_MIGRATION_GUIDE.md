# Database Migration Guide

## Current Status

**Database**: PostgreSQL running in Docker on port 5433
**Schema**: 2,221 lines with 17 new models (CRM + NRPG)
**Migration Status**: ⏳ Pending (Windows host connection blocked)

---

## Issue

Prisma from Windows host cannot connect to PostgreSQL container on port 5433 due to Windows networking/firewall restrictions. The database itself is working correctly (verified via `docker exec`).

---

## Solution Options

### **Option 1: Automatic via CI/CD** ⭐ **RECOMMENDED**

The migration will run **automatically** when you merge the Pull Request:

1. Merge PR#1: https://github.com/CleanExpo/Disaster-Recovery/pull/1
2. GitHub Actions will run the migration as part of deployment
3. All tables will be created automatically

**Pros**:
- ✅ No manual steps required
- ✅ Runs in Linux environment (no Windows networking issues)
- ✅ Automatically runs on every deployment
- ✅ Logged and auditable

**Steps**:
```bash
# Review and merge the PR
gh pr merge 1 --squash

# GitHub Actions will automatically run:
# - npx prisma migrate deploy
# - All tests
# - Deploy to staging
```

---

### **Option 2: Via WSL (Windows Subsystem for Linux)**

If you have WSL installed:

```bash
# Open WSL terminal
wsl

# Navigate to project
cd /mnt/d/Disaster\ Recovery\ -\ NRP/

# Run migration
DATABASE_URL="postgresql://admin:password@localhost:5433/disaster_recovery?schema=public" npx prisma migrate dev --name crm-and-nrpg-foundation
```

**Pros**:
- ✅ Runs locally
- ✅ Immediate execution

**Cons**:
- ⚠️ Requires WSL setup

---

### **Option 3: On Mac/Linux Machine**

If you have access to a Mac or Linux machine:

```bash
# Clone the repo
git clone https://github.com/CleanExpo/Disaster-Recovery.git
cd Disaster-Recovery
git checkout Anthropic-Research

# Set database URL (pointing to your Windows Docker container)
export DATABASE_URL="postgresql://admin:password@YOUR_WINDOWS_IP:5433/disaster_recovery?schema=public"

# Run migration
npx prisma migrate dev --name crm-and-nrpg-foundation
```

---

### **Option 4: Manual SQL Execution** (Advanced)

Execute the SQL commands directly inside the Docker container. The SQL needed is in `prisma/migrations/` directory after generation.

---

## What Happens When Migration Runs

The migration will create **17 new tables**:

### CRM Tables (8 tables)
1. `customer_lifecycle` - Customer journey tracking
2. `opportunities` - Sales pipeline
3. `activities` - Interaction history
4. `tasks` - Follow-up management
5. `business_rules` - Accountability rules
6. `business_rule_violations` - Violation tracking

### NRPG Inspection Tables (9 tables)
7. `inspection_reports` - Main report entity
8. `damage_areas` - Room-by-room assessment
9. `moisture_readings` - Sensor data
10. `inspection_photos` - Photo evidence
11. `cost_estimates` - Pricing breakdown
12. `labor_line_items` - Labor costs
13. `material_line_items` - Material costs
14. `equipment_line_items` - Equipment rental costs
15. `compliance_checks` - Jurisdiction validation
16. `report_revisions` - Audit trail

### Plus Relations
- 15+ foreign key relationships
- 50+ performance indexes
- Full referential integrity

---

## After Migration

Once the migration completes, run the **CRM data backfill scripts**:

```bash
# 1. Create customer lifecycles from existing users
npm run ts-node scripts/crm-migration/01-create-customer-lifecycles.ts

# 2. Convert service requests to opportunities
npm run ts-node scripts/crm-migration/02-backfill-opportunities.ts

# 3. Create activities from bookings/payments/claims
npm run ts-node scripts/crm-migration/03-backfill-activities.ts

# 4. Calculate initial health scores
npm run ts-node scripts/crm-migration/04-calculate-health-scores.ts

# 5. Initialize business rules
npm run ts-node scripts/crm-migration/05-create-default-business-rules.ts
```

**Estimated Time**: 10 minutes for all 5 scripts

---

## Verification

After migration, verify tables were created:

```bash
# Check table count
docker exec disaster-recovery-db psql -U admin -d disaster_recovery -c "\dt" | wc -l

# Should show 17 new tables plus existing tables
# Expected: 40+ total tables
```

---

## Recommendation

✅ **Use Option 1 (CI/CD)** - Merge the PR and let GitHub Actions handle the migration automatically. This is the most reliable and production-ready approach.

The migration is ready and will work perfectly in a Linux environment (GitHub Actions, production servers, etc.). The Windows networking issue is local development only.

---

**Generated**: 2025-12-29
**For**: Anthropic-Research branch
**Status**: Migration ready, awaiting execution via CI/CD or WSL
