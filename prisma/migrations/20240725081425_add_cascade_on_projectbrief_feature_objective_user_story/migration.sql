-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_projectBriefsId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectBrief" DROP CONSTRAINT "ProjectBrief_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserStory" DROP CONSTRAINT "UserStory_projectBriefsId_fkey";

-- DropForeignKey
ALTER TABLE "objective" DROP CONSTRAINT "objective_projectBriefsId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectBrief" ADD CONSTRAINT "ProjectBrief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objective" ADD CONSTRAINT "objective_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE CASCADE ON UPDATE CASCADE;
