/*
  Warnings:

  - You are about to drop the column `key_features` on the `ProjectBrief` table. All the data in the column will be lost.
  - You are about to drop the column `user_stories` on the `ProjectBrief` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectBrief" DROP COLUMN "key_features",
DROP COLUMN "user_stories";
