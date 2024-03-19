/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Musician" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "occupations" TEXT[],
    "description" TEXT NOT NULL,
    "site" TEXT,

    CONSTRAINT "Musician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberOnBand" (
    "musicianId" TEXT NOT NULL,
    "bandId" TEXT NOT NULL,

    CONSTRAINT "MemberOnBand_pkey" PRIMARY KEY ("musicianId","bandId")
);

-- CreateTable
CREATE TABLE "Band" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "formedAt" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "site" TEXT,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MemberOnBand" ADD CONSTRAINT "MemberOnBand_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "Musician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnBand" ADD CONSTRAINT "MemberOnBand_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
