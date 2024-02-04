-- DropForeignKey
ALTER TABLE "Instructure" DROP CONSTRAINT "Instructure_studentId_fkey";

-- AlterTable
ALTER TABLE "Instructure" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Instructure" ADD CONSTRAINT "Instructure_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
