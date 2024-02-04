-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "instructureId" TEXT,
    "classTime" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "img" TEXT,
    "featured" BOOLEAN NOT NULL,
    "studentId" TEXT,
    "isPublic" BOOLEAN NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profileImg" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Instructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_instructureId_fkey" FOREIGN KEY ("instructureId") REFERENCES "Instructure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructure" ADD CONSTRAINT "Instructure_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
