/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Band` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Musician` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Band_name_key" ON "Band"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Musician_name_key" ON "Musician"("name");
