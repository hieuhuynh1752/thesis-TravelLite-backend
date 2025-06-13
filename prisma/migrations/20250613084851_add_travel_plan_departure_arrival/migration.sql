/*
  Warnings:

  - You are about to drop the column `plannedAt` on the `TravelPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TravelPlan" DROP COLUMN "plannedAt",
ADD COLUMN     "arrivalBy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
