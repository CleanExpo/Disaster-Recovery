# Phase 29: Database Schema Migration & Local Development Setup

## Status: Ready for Execution

This guide documents how to complete the database schema synchronization with Supabase.

## Prerequisites Completed ✅

- Supabase database password has been reset and generated
- - .env.local DATABASE_URL template has been created in repository
  - - Vercel environment already has DATABASE_URL configured (production-ready)
    - - Prisma schema is finalized with 12 required models
     
      - ## Local Development Setup
     
      - ### Step 1: Get the Supabase Database Password
     
      - 1. Go to [Supabase Console](https://supabase.com/dashboard/project/mocxymmgpjipnfyvgqot/settings/database)
        2. 2. Click "Reset database password"
           3. 3. Click "Generate a password" to create a secure password
              4. 4. Copy the generated password to clipboard
                
                 5. ### Step 2: Update Local .env.local
                
                 6. Replace `PASSWORD_FROM_SUPABASE` with the actual password in your local `.env.local`:
                
                 7. ```
                    DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres
                    ```

                    **IMPORTANT:** Never commit this file with the actual password. Keep `.env.local` in `.gitignore`.

                    ### Step 3: Run Prisma Schema Push

                    ```bash
                    npm install
                    npx prisma db push
                    ```

                    This will:
                    - Create all 12 required database tables
                    - - Set up relationships and constraints
                      - - Initialize the proper schema for the application
                       
                        - ## Production Deployment
                       
                        - Vercel already has `DATABASE_URL` configured in environment variables (updated Oct 30, 2024).
                       
                        - To ensure production uses the correct schema:
                       
                        - ```bash
                          vercel env pull  # Pull environment variables from Vercel
                          npm run build     # Build application
                          npx prisma db push # Push schema to production database
                          ```

                          ## Tables Created by Prisma

                          The schema push will create these 12 tables:

                          1. `tenants` - Multi-tenant root organization
                          2. 2. `tenant_configurations` - Tenant settings
                             3. 3. `users` - User accounts with auth
                                4. 4. `user_preferences` - User UI preferences
                                   5. 5. `admin_service_categories` - Service categories
                                      6. 6. `admin_services` - Available services
                                         7. 7. `admin_themes` - UI themes
                                            8. 8. `service_requests` - User service requests
                                               9. 9. `contractor_profiles` - Contractor information
                                                  10. 10. `contractor_matches` - Contractor-to-request matching
                                                      11. 11. `messages` - User messaging system
                                                          12. 12. `contractor_preferences` - Contractor preferences
                                                             
                                                              13. ## Verification
                                                             
                                                              14. After running `prisma db push`, verify the schema:
                                                             
                                                              15. ```bash
                                                                  # View database schema
                                                                  npx prisma studio

                                                                  # Or query Supabase directly:
                                                                  # Go to SQL Editor in Supabase console
                                                                  # SELECT * FROM information_schema.tables WHERE table_schema = 'public';
                                                                  ```

                                                                  ## Troubleshooting

                                                                  ### "FATAL: Tenant or user not found"
                                                                  - Ensure DATABASE_URL uses correct credentials
                                                                  - - Verify password was copied correctly from Supabase
                                                                    - - Check that Supabase project is in PRODUCTION environment (not disabled)
                                                                     
                                                                      - ### Tables already exist
                                                                      - If you see "relation already exists" errors:
                                                                      - ```bash
                                                                        # Reset database (DANGER: deletes all data)
                                                                        npx prisma migrate reset
                                                                        ```

                                                                        ### Connection refused
                                                                        - Verify network access is allowed (check Supabase Network Restrictions)
                                                                        - - Ensure you're using connection pooler URL (port 6543), not direct connection (port 5432)
                                                                         
                                                                          - ## Next Steps (Phase 30)
                                                                         
                                                                          - After successful schema migration:
                                                                         
                                                                          - 1. Test signup flow to verify user creation works
                                                                            2. 2. Test login flow with created accounts
                                                                               3. 3. Test dashboard access for different user roles
                                                                                  4. 4. Implement Google OAuth integration
                                                                                     5. 5. Complete remaining features toward 100% functionality
                                                                                       
                                                                                        6. ## Files Modified
                                                                                       
                                                                                        7. - `.env.local` - Added DATABASE_URL template (Phase 27)
                                                                                           - - `PHASE_29_DATABASE_SETUP.md` - This setup guide (Phase 29)
                                                                                            
                                                                                             - ## Commands Summary
                                                                                            
                                                                                             - ```bash
                                                                                               # Local development
                                                                                               npm install
                                                                                               # Fill in DATABASE_URL in .env.local with actual password
                                                                                               npx prisma db push

                                                                                               # Production deployment
                                                                                               vercel env pull
                                                                                               npm run build
                                                                                               npx prisma db push
                                                                                               ```

                                                                                               ---

                                                                                               **Phase 29 Created:** Dec 23, 2024
                                                                                               **Status:** Ready for Developer Execution
