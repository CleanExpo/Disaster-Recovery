// Single entrypoint for DB helpers + Prisma.
// Prefer importing from `@/lib/db` throughout the codebase.
//
// Note: this file is `src/lib/db.ts`, so avoid `./db` which would self-resolve.
export { prisma } from './db/index';
export { default } from './db/index';
export * from './db/index';
