/*
  Warnings:

  - You are about to drop the column `travelPlanId` on the `EventParticipant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "EventParticipant_travelPlanId_key";

-- DropIndex
DROP INDEX "TravelPlan_eventParticipantId_key";

-- AlterTable
ALTER TABLE "EventParticipant" DROP COLUMN "travelPlanId";
