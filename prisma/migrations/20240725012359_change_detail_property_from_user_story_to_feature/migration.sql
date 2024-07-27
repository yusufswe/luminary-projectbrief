/*
  Warnings:

  - You are about to drop the column `detail` on the `UserStory` table. All the data in the column will be lost.
  - Added the required column `detail` to the `Feature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "detail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserStory" DROP COLUMN "detail";
