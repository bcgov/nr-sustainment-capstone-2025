/*
  Warnings:

  - You are about to drop the `Coverage_Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OMA_Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Soil_Penetration_Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Coverage_Report" DROP CONSTRAINT "Coverage_Report_noteId_fkey";

-- DropForeignKey
ALTER TABLE "Coverage_Report" DROP CONSTRAINT "Coverage_Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "OMA_Report" DROP CONSTRAINT "OMA_Report_noteId_fkey";

-- DropForeignKey
ALTER TABLE "OMA_Report" DROP CONSTRAINT "OMA_Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "Soil_Penetration_Report" DROP CONSTRAINT "Soil_Penetration_Report_userId_fkey";

-- DropTable
DROP TABLE "Coverage_Report";

-- DropTable
DROP TABLE "OMA_Report";

-- DropTable
DROP TABLE "Soil_Penetration_Report";

-- CreateTable
CREATE TABLE "CoverageReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coverage_percentage" INTEGER NOT NULL,
    "coverage_picture" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "noteId" INTEGER,

    CONSTRAINT "CoverageReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OMAReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hue" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "chroma" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "noteId" INTEGER,

    CONSTRAINT "OMAReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoilPenetrationReport" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "depths" DOUBLE PRECISION[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SoilPenetrationReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoverageReport" ADD CONSTRAINT "CoverageReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverageReport" ADD CONSTRAINT "CoverageReport_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OMAReport" ADD CONSTRAINT "OMAReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OMAReport" ADD CONSTRAINT "OMAReport_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoilPenetrationReport" ADD CONSTRAINT "SoilPenetrationReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
