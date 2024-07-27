/*
  Warnings:

  - You are about to drop the column `objectives` on the `ProjectBrief` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectBrief" DROP COLUMN "objectives";

-- CreateTable
CREATE TABLE "objective" (
    "objective_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectBriefsId" TEXT NOT NULL,

    CONSTRAINT "objective_pkey" PRIMARY KEY ("objective_id")
);

-- AddForeignKey
ALTER TABLE "objective" ADD CONSTRAINT "objective_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE RESTRICT ON UPDATE CASCADE;
