/*
  Warnings:

  - You are about to drop the column `depths` on the `SoilPenetrationReport` table. All the data in the column will be lost.
  - Added the required column `score` to the `SoilPenetrationReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SoilPenetrationReport" DROP COLUMN "depths",
ADD COLUMN     "score" INTEGER NOT NULL;
