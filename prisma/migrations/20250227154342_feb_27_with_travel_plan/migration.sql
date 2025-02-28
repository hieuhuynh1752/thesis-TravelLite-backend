/*
  Warnings:

  - You are about to drop the column `destinationPlaceId` on the `TravelPlan` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `TravelPlan` table. All the data in the column will be lost.
  - You are about to drop the column `originPlaceId` on the `TravelPlan` table. All the data in the column will be lost.
  - You are about to drop the `Waypoint` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[travelPlanId]` on the table `EventParticipant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destination` to the `TravelPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `TravelPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeDetails` to the `TravelPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCo2` to the `TravelPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TravelPlan" DROP CONSTRAINT "TravelPlan_destinationPlaceId_fkey";

-- DropForeignKey
ALTER TABLE "TravelPlan" DROP CONSTRAINT "TravelPlan_eventId_fkey";

-- DropForeignKey
ALTER TABLE "TravelPlan" DROP CONSTRAINT "TravelPlan_originPlaceId_fkey";

-- DropForeignKey
ALTER TABLE "Waypoint" DROP CONSTRAINT "Waypoint_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Waypoint" DROP CONSTRAINT "Waypoint_travelPlanId_fkey";

-- AlterTable
ALTER TABLE "EventParticipant" ADD COLUMN     "travelPlanId" INTEGER;

-- AlterTable
ALTER TABLE "TravelPlan" DROP COLUMN "destinationPlaceId",
DROP COLUMN "eventId",
DROP COLUMN "originPlaceId",
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL,
ADD COLUMN     "routeDetails" JSONB NOT NULL,
ADD COLUMN     "totalCo2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "travelSteps" JSONB[];

-- DropTable
DROP TABLE "Waypoint";

-- CreateIndex
CREATE UNIQUE INDEX "EventParticipant_travelPlanId_key" ON "EventParticipant"("travelPlanId");
