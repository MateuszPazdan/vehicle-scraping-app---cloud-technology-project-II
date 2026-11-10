/*
  Warnings:

  - You are about to drop the column `storageLocationId` on the `WasteType` table. All the data in the column will be lost.
  - You are about to drop the `OwnerVehicle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `wasteTypeId` to the `StorageLocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OwnerVehicle" DROP CONSTRAINT "OwnerVehicle_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "OwnerVehicle" DROP CONSTRAINT "OwnerVehicle_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "WasteType" DROP CONSTRAINT "WasteType_storageLocationId_fkey";

-- DropIndex
DROP INDEX "WasteType_storageLocationId_key";

-- AlterTable
ALTER TABLE "StorageLocation" ADD COLUMN     "wasteTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WasteType" DROP COLUMN "storageLocationId";

-- DropTable
DROP TABLE "OwnerVehicle";

-- CreateTable
CREATE TABLE "DismantlingCertificate" (
    "id" SERIAL NOT NULL,
    "certificateNumber" INTEGER NOT NULL,
    "fileLink" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "DismantlingCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OwnerToVehicle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OwnerToVehicle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "DismantlingCertificate_vehicleId_key" ON "DismantlingCertificate"("vehicleId");

-- CreateIndex
CREATE INDEX "_OwnerToVehicle_B_index" ON "_OwnerToVehicle"("B");

-- AddForeignKey
ALTER TABLE "DismantlingCertificate" ADD CONSTRAINT "DismantlingCertificate_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageLocation" ADD CONSTRAINT "StorageLocation_wasteTypeId_fkey" FOREIGN KEY ("wasteTypeId") REFERENCES "WasteType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnerToVehicle" ADD CONSTRAINT "_OwnerToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnerToVehicle" ADD CONSTRAINT "_OwnerToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
