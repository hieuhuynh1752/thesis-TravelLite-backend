/*
  Warnings:

  - You are about to drop the column `type` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "type",
ADD COLUMN     "visibility" "EventVisibility" NOT NULL DEFAULT 'PRIVATE';

-- DropEnum
DROP TYPE "EventType";
