-- CreateTable
CREATE TABLE "Coverage_Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coverage_percentage" INTEGER,
    "coverage_picture" TEXT,

    CONSTRAINT "Coverage_Report_pkey" PRIMARY KEY ("id")
);
