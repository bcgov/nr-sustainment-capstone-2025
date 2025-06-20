/*
  Warnings:

  - You are about to drop the column `labelId` on the `Coverage_Report` table. All the data in the column will be lost.
  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Coverage_Report" DROP CONSTRAINT "Coverage_Report_labelId_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_userId_fkey";

-- AlterTable
ALTER TABLE "Coverage_Report" DROP COLUMN "labelId",
ADD COLUMN     "noteId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Label";

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "note" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Coverage_Report" ADD CONSTRAINT "Coverage_Report_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
