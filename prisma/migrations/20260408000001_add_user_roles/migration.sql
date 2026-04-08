-- AlterTable
-- Change the default role from "CLIENT" to "user" to align with the new RBAC
-- role values: "user" | "contractor" | "admin" | "super_admin"
-- Existing rows with "CLIENT" are left as-is; they are treated as non-admin by
-- isAdminRole() and will continue to work normally.

ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user';
