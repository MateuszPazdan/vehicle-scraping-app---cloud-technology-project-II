/*
  Warnings:

  - Added the required column `totalPrice` to the `WasteTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WasteTransaction" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
