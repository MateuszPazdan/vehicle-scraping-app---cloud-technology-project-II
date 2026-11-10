/*
  Warnings:

  - A unique constraint covering the columns `[certificateNumber]` on the table `DismantlingCertificate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[registration_certificate_number]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "status" SET DEFAULT 'RECEIVED_FOR_DISMANTLING';

-- AlterTable
ALTER TABLE "WasteEntry" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "DismantlingCertificate_certificateNumber_key" ON "DismantlingCertificate"("certificateNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registration_certificate_number_key" ON "Vehicle"("registration_certificate_number");
