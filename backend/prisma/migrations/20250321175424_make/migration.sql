/*
  Warnings:

  - A unique constraint covering the columns `[id_number]` on the table `Owner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Owner_id_number_key" ON "Owner"("id_number");
