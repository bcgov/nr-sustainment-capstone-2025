-- AddForeignKey
ALTER TABLE "Coverage_Report" ADD CONSTRAINT "Coverage_Report_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE SET NULL ON UPDATE CASCADE;
