-- CreateTable
CREATE TABLE "emissionFactor" (
    "id" SERIAL NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "emissionFactor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emissionFactor_vehicleType_key" ON "emissionFactor"("vehicleType");
