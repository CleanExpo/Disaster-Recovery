-- AlterTable
ALTER TABLE "users" ADD COLUMN "passwordResetToken" TEXT;
ALTER TABLE "users" ADD COLUMN "passwordResetExpiry" TIMESTAMP(3);
