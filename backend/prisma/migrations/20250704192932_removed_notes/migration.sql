/*
  Warnings:

  - You are about to drop the column `noteId` on the `CoverageReport` table. All the data in the column will be lost.
  - You are about to drop the column `noteId` on the `OMAReport` table. All the data in the column will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoverageReport" DROP CONSTRAINT "CoverageReport_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "OMAReport" DROP CONSTRAINT "OMAReport_noteId_fkey";

-- AlterTable
ALTER TABLE "CoverageReport" DROP COLUMN "noteId";

-- AlterTable
ALTER TABLE "OMAReport" DROP COLUMN "noteId";

-- DropTable
DROP TABLE "Note";
