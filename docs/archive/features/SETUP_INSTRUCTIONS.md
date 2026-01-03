# Setup Instructions - Final Steps to 100% Operational

**Current Status**: 95% Complete - Database setup required
**Estimated Time**: 5 minutes

---

## What's Already Complete ✅

- ✅ All 35 lint warnings fixed (100%)
- ✅ All tests passing - 151/151 (100%)
- ✅ Production build working
- ✅ UI/UX fully styled
- ✅ API routes implemented
- ✅ Authentication logic connected
- ✅ All code committed and pushed (7 commits)

---

## Option 1: Supabase (RECOMMENDED - 5 minutes)

### Step 1: Run SQL in Supabase

1. Open Supabase SQL Editor:
   https://supabase.com/dashboard/project/xoomalxaybjjcxschhrf/sql/new

2. Copy the entire contents of `SUPABASE_SETUP.sql`

3. Paste into the SQL editor

4. Click "Run" (Ctrl+Enter)

5. Verify you see:
   ```
   Database setup complete!
   3 rows returned with admin, client, contractor users
   ```

### Step 2: Start Application

```bash
# Kill any running servers
# (Close all terminal windows running npm/node)

# Start dev server
npm run dev

# Open browser
http://localhost:3000/login
```

### Step 3: Test Login

**Email**: `admin@disasterrecovery.com`
**Password**: `Password123!`

**Expected**: Login succeeds → Redirects to dashboard

✅ **DONE! System 100% functional**

---

## Option 2: Local PostgreSQL (10 minutes)

### Prerequisites
- Restart Windows (to clear Prisma file locks)

### Step 1: Start Docker Containers

```bash
docker start disaster-recovery-db disaster-recovery-redis

# Or if containers don't exist:
docker run -d --name disaster-recovery-db \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=disaster_recovery \
  -p 5432:5432 \
  postgres:15-alpine

docker run -d --name disaster-recovery-redis \
  -p 6379:6379 \
  redis:7-alpine
```

### Step 2: Set Up Database

```bash
# The tables and users already exist in the container!
# Verify:
docker exec disaster-recovery-db psql -U postgres -d disaster_recovery -c "SELECT email, userType FROM users;"

# Should show 3 users
```

### Step 3: Update Environment

```bash
# Create .env file
cat > .env << 'EOF'
DATABASE_URL="postgresql://postgres:password123@localhost:5432/disaster_recovery?schema=public"
DIRECT_URL="postgresql://postgres:password123@localhost:5432/disaster_recovery?schema=public"
EOF

# Create .env.local file
cat > .env.local << 'EOF'
DATABASE_URL="postgresql://postgres:password123@localhost:5432/disaster_recovery?schema=public"
DIRECT_URL="postgresql://postgres:password123@localhost:5432/disaster_recovery?schema=public"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-development-secret-change-in-production-12345678
JWT_SECRET=local-jwt-secret-change-in-production-987654321
REDIS_URL=redis://localhost:6379
EOF
```

### Step 4: Start Application

```bash
npx prisma generate
npm run dev
```

### Step 5: Test Login

Open `http://localhost:3000/login`

Login with: `admin@disasterrecovery.com` / `Password123!`

✅ **DONE! System 100% functional**

---

## Test Credentials

All users have the same password: `Password123!`

| Email | Role | Description |
|-------|------|-------------|
| admin@disasterrecovery.com | ADMIN | Full admin access |
| client@example.com | CLIENT | Client dashboard |
| contractor@example.com | CONTRACTOR | Contractor portal |

---

## Troubleshooting

### Issue: "Port 3000 is in use"

**Solution**: Kill all Node processes
- Windows: Close all terminal windows running npm/node
- Or use a different port: `npm run dev -- -p 3010`

### Issue: "Prisma generate fails with EPERM"

**Solution**: Restart Windows to clear file locks
- This is a Windows-specific file locking issue
- After restart, Prisma will generate successfully

### Issue: "Can't reach database"

**Solution**: Check Docker containers
```bash
docker ps  # Should show disaster-recovery-db running
docker logs disaster-recovery-db  # Check for errors
```

### Issue: "Authentication failed"

**Solution**: Check .env files
- Ensure DATABASE_URL is correctly set
- For local: postgres:password123@localhost:5432
- For Supabase: Use the URL from this file

---

## Verification Commands

### Check Code Quality
```bash
npm run lint      # Should show: ✔ No ESLint warnings or errors
npm run test:ci   # Should show: 151/151 tests passing
npm run build     # Should compile successfully
```

### Check Database (Local)
```bash
docker ps  # Check containers running
docker exec disaster-recovery-db psql -U postgres -d disaster_recovery -c "\dt"  # List tables
docker exec disaster-recovery-db psql -U postgres -d disaster_recovery -c "SELECT email, userType FROM users;"  # Check users
```

### Check Database (Supabase)
- Go to: https://supabase.com/dashboard/project/xoomalxaybjjcxschhrf/editor
- Click on "users" table
- Should see 3 rows

---

## Current Configuration

**Environment files are set to**: Supabase

**Supabase Project**: Disaster-Recovery-Fresh (xoomalxaybjjcxschhrf)

**Database**: PostgreSQL 15

**Tables**: 11 main tables (users, tenants, contractor_profiles, service_requests, messages, etc.)

---

## Success Criteria

When setup is complete, you should be able to:

✅ Login with test credentials
✅ See admin dashboard after login
✅ Navigate between pages
✅ View styled UI/UX
✅ Make API calls to database
✅ Full system functionality

---

## Quick Start (TL;DR)

**Using Supabase** (FASTEST):
1. Run `SUPABASE_SETUP.sql` in Supabase SQL Editor
2. `npm run dev`
3. Open `http://localhost:3000/login`
4. Login: `admin@disasterrecovery.com` / `Password123!`
5. ✅ Done!

**Using Local Docker** (after Windows restart):
1. `docker start disaster-recovery-db disaster-recovery-redis`
2. Update .env to local (see Option 2 above)
3. `npm run dev`
4. Open `http://localhost:3000/login`
5. Login: `admin@disasterrecovery.com` / `Password123!`
6. ✅ Done!

---

## Support Files

- **SUPABASE_SETUP.sql** - Complete database setup script for Supabase
- **seed.sql** - Local PostgreSQL seed data
- **FINAL_STATUS.md** - Comprehensive status report
- **DATABASE_CONNECTION_STATUS.md** - Database setup details

---

**Status**: Ready for final setup and testing!
