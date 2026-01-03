# How to Get Supabase Database Connection String

## Step-by-Step Instructions:

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com
   - Login to your account
   - Select your project (either "Disaster Recovery New" or "Disaster Recovery Fresh")

2. **Navigate to Database Settings**
   - Click on "Project Settings" (gear icon in sidebar)
   - Click on "Database" in the left menu

3. **Copy Connection Strings**
   
   You'll see two connection string options:
   
   **A. Connection Pooling** (Recommended for Prisma)
   - Look for "Connection string" section
   - Select "URI" format
   - Click "Use connection pooling"
   - Copy the string that looks like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
   
   **B. Direct Connection** (For migrations)
   - In the same section
   - Uncheck "Use connection pooling"
   - Copy the string that looks like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

4. **Get Your Database Password**
   - If you don't see the password in the connection string
   - Scroll down to "Database password" section
   - You may need to reset it if you forgot it
   - Click "Reset database password" if needed

## What to Send Me:

Please copy and paste BOTH strings:
1. ✅ Connection pooling string (for DATABASE_URL)
2. ✅ Direct connection string (for DIRECT_URL)

Example format (with fake data):
```
# Connection Pooling
postgresql://postgres.xoomalxaybjjcxschhrf:YourPasswordHere@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres

# Direct Connection
postgresql://postgres.xoomalxaybjjcxschhrf:YourPasswordHere@db.xoomalxaybjjcxschhrf.supabase.co:5432/postgres
```

## Note:
- Replace `[YOUR-PASSWORD]` with your actual database password
- Don't share the password publicly - we can use environment variables
- The project refs you have are: xoomalxaybjjcxschhrf or lccqasmurmsisnnjqqmr
