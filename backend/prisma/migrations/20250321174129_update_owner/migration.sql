/*
  Warnings:

  - A unique constraint covering the columns `[pesel]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Id_number` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesel` to the `Owner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "Id_number" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "pesel" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Owner_pesel_key" ON "Owner"("pesel");
