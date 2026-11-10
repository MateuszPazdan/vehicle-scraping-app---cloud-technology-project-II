/*
  Warnings:

  - You are about to drop the column `registrationNr` on the `Vehicle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registration_number]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registration_certificate_number` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `registration_number` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year_of_production` on the `Vehicle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "OwnerVehicle" DROP CONSTRAINT "OwnerVehicle_vehicleId_fkey";

-- DropIndex
DROP INDEX "Vehicle_registrationNr_key";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "registrationNr",
ADD COLUMN     "registration_certificate_number" TEXT NOT NULL,
ADD COLUMN     "registration_number" TEXT NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL,
DROP COLUMN "year_of_production",
ADD COLUMN     "year_of_production" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registration_number_key" ON "Vehicle"("registration_number");

-- AddForeignKey
ALTER TABLE "OwnerVehicle" ADD CONSTRAINT "OwnerVehicle_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
