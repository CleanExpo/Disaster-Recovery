/**
 * Seed initial super_admin user.
 *
 * Usage:
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npx tsx scripts/core/seed-admin.ts
 *
 * Environment variables:
 *   ADMIN_EMAIL    — email address for the super_admin account (required)
 *   ADMIN_PASSWORD — plaintext password, will be hashed with bcrypt (required)
 */

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('Error: ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.');
    console.error(
      'Usage: ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=secret npx tsx scripts/core/seed-admin.ts',
    );
    process.exit(1);
  }

  // Check if a super_admin already exists
  const existing = await prisma.user.findFirst({
    where: { userType: 'SUPER_ADMIN' },
  });

  if (existing) {
    console.log(`A super_admin already exists (${existing.email}). Skipping.`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { userType: 'SUPER_ADMIN', password: hashed },
    create: {
      id: randomUUID(),
      email,
      password: hashed,
      name: 'Super Admin',
      userType: 'SUPER_ADMIN',
    },
  });

  console.log(`super_admin user created/updated: ${user.email} (id: ${user.id})`);
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
