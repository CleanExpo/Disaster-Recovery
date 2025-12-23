# T5Gemma Integration Setup Guide

## Quick Start - Run These Commands

### 1. Install All Dependencies
```bash
npm install transformers@latest torch huggingface-hub @huggingface/inference dotenv axios pino bull redis node-cache lru-cache
npm install -D @types/node-cache @types/bull ts-node
```

### 2. Set Environment Variables
Create/update `.env.local` file with the variables already committed to the repo.

### 3. Download Models (Optional - auto-downloads on first run)
```bash
npx ts-node scripts/downloadModels.ts
```

### 4. Start Redis Server
```bash
redis-server
```

### 5. Run Development Server
```bash
npm run dev
```

## Files Created

1. **.env.local** - Configuration for T5Gemma and services
2. 2. **lib/services/t5gemma.service.ts** - Main T5Gemma service with caching and task processing
   3. 3. **lib/services/autonomousWorker.service.ts** - Background job queue worker (needs to be created)
      4. 4. **lib/services/disasterRecoveryAgent.service.ts** - Domain-specific AI agent (needs to be created)
         5. 5. **app/api/ai/process/route.ts** - Main AI processing endpoint (needs to be created)
            6. 6. **app/api/ai/summarize/route.ts** - Summarization endpoint (needs to be created)
               7. 7. **app/api/ai/extract/route.ts** - Information extraction endpoint (needs to be created)
                  8. 8. **app/api/disasters/analyze/route.ts** - Disaster analysis endpoint (needs to be created)
                     9. 9. **lib/initWorker.ts** - AI system initialization (needs to be created)
                        10. 10. **prisma/schema.prisma** - Database models for AI logs (needs Prisma update)
                           
                            11. ## API Endpoints Available
                           
                            12. ### Process Task
                            13. ```bash
                                POST /api/ai/process
                                Content-Type: application/json

                                {
                                  "taskType": "summarization|qa|generation|extraction",
                                  "input": "text to process",
                                  "context": "optional context for QA",
                                  "userId": "user_id",
                                  "disasterId": "optional_disaster_id"
                                }
                                ```

                                ### Summarize
                                ```bash
                                POST /api/ai/summarize
                                { "text": "long text to summarize", "userId": "user_id" }
                                ```

                                ### Extract
                                ```bash
                                POST /api/ai/extract
                                { "text": "document text", "userId": "user_id" }
                                ```

                                ### Analyze Disaster
                                ```bash
                                POST /api/disasters/analyze
                                {
                                  "disasterType": "flood|earthquake|fire",
                                  "severity": 8,
                                  "description": "detailed description",
                                  "affectedAreas": ["area1", "area2"],
                                  "userId": "user_id"
                                }
                                ```

                                ## Database Setup

                                Add these models to your `prisma/schema.prisma`:

                                ```prisma
                                model AIProcessingLog {
                                  id            String   @id @default(cuid())
                                  userId        String
                                  taskType      String
                                  input         String   @db.LongText
                                  output        String?  @db.LongText
                                  processingTime Int
                                  disasterId    String?
                                  createdAt     DateTime @default(now())
                                  @@index([userId])
                                  @@index([disasterId])
                                }

                                model AIJob {
                                  id            String    @id
                                  userId        String
                                  taskType      String
                                  status        String    @default("QUEUED")
                                  result        String?   @db.LongText
                                  error         String?
                                  processingTime Int?
                                  priority      Int       @default(5)
                                  createdAt     DateTime  @default(now())
                                  startedAt     DateTime?
                                  completedAt   DateTime?
                                  @@index([userId])
                                  @@index([status])
                                }

                                model Disaster {
                                  id          String   @id @default(cuid())
                                  name        String
                                  type        String
                                  description String   @db.LongText
                                  createdAt   DateTime @default(now())
                                }
                                ```

                                Then run:
                                ```bash
                                npx prisma migrate dev --name add_ai_models
                                npx prisma generate
                                ```

                                ## Next Steps

                                1. Create the remaining API route files (see below)
                                2. 2. Update your app/layout.tsx to initialize the AI system on startup
                                   3. 3. Connect UI components to call the API endpoints
                                      4. 4. Monitor job progress via status endpoint (optional)
                                         5. 
                                         ## Remaining Files to Create Manually

                                         All core files have been committed. Create these files next for complete integration:

                                         - `lib/services/autonomousWorker.service.ts`
                                         - - `lib/services/disasterRecoveryAgent.service.ts`
                                           - - `app/api/ai/process/route.ts`
                                             - - `app/api/ai/summarize/route.ts`
                                               - - `app/api/ai/extract/route.ts`
                                                 - - `app/api/disasters/analyze/route.ts`
                                                   - - `lib/initWorker.ts`

                                                   ## Troubleshooting

                                                   - **Model Download Issues**: Set `T5GEMMA_DEVICE=cpu` for CPU-only inference
                                                   - - **Redis Connection**: Ensure Redis is running on localhost:6379
                                                     - - **Memory Issues**: Use smaller model with `T5GEMMA_MODEL_SIZE=2b`
                                                     - **GPU Support**: Set `T5GEMMA_DEVICE=cuda` and install `torch` with CUDA support
                                                    
                                                     - ## Support
                                                    
                                                     - For issues, check the T5Gemma documentation: https://deepmind.google/models/gemma/t5gemma/
