/*
  Warnings:

  - The values [DRAFT] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('ACTIVE', 'FINISHED', 'CANCELLED');
ALTER TABLE "Event" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Event" ALTER COLUMN "status" TYPE "EventStatus_new" USING ("status"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "EventStatus_old";
ALTER TABLE "Event" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'PRIVATE',
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
