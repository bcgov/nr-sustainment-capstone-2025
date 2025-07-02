-- CreateTable
CREATE TABLE "Soil_Penetration_Report" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "depths" DOUBLE PRECISION[],
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Soil_Penetration_Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Soil_Penetration_Report" ADD CONSTRAINT "Soil_Penetration_Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
