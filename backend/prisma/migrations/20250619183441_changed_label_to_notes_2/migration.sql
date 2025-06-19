/*
  Warnings:

  - Made the column `coverage_percentage` on table `Coverage_Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coverage_picture` on table `Coverage_Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Coverage_Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Coverage_Report" DROP CONSTRAINT "Coverage_Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- AlterTable
ALTER TABLE "Coverage_Report" ALTER COLUMN "coverage_percentage" SET NOT NULL,
ALTER COLUMN "coverage_picture" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Coverage_Report" ADD CONSTRAINT "Coverage_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
