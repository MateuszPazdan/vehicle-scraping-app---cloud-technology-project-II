/*
  Warnings:

  - You are about to drop the column `Id_number` on the `Owner` table. All the data in the column will be lost.
  - Added the required column `id_number` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "Id_number",
ADD COLUMN     "id_number" TEXT NOT NULL;
