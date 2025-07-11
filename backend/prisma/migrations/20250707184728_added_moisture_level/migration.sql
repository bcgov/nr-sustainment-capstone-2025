/*
  Warnings:

  - Added the required column `moisture_level` to the `OMAReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OMAReport" ADD COLUMN     "moisture_level" TEXT NOT NULL;
