/*
  Warnings:

  - Made the column `note` on table `Note` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "note" SET NOT NULL;

-- CreateTable
CREATE TABLE "OMA_Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hue" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "chroma" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "noteId" INTEGER,

    CONSTRAINT "OMA_Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OMA_Report" ADD CONSTRAINT "OMA_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OMA_Report" ADD CONSTRAINT "OMA_Report_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
