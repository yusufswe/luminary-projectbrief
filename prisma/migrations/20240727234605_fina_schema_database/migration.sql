-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photoUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectBrief" (
    "brief_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectBrief_pkey" PRIMARY KEY ("brief_id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "feature_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "projectBriefsId" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("feature_id")
);

-- CreateTable
CREATE TABLE "objective" (
    "objective_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectBriefsId" TEXT NOT NULL,

    CONSTRAINT "objective_pkey" PRIMARY KEY ("objective_id")
);

-- CreateTable
CREATE TABLE "UserStory" (
    "userStory_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectBriefsId" TEXT NOT NULL,

    CONSTRAINT "UserStory_pkey" PRIMARY KEY ("userStory_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ProjectBrief" ADD CONSTRAINT "ProjectBrief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objective" ADD CONSTRAINT "objective_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStory" ADD CONSTRAINT "UserStory_projectBriefsId_fkey" FOREIGN KEY ("projectBriefsId") REFERENCES "ProjectBrief"("brief_id") ON DELETE CASCADE ON UPDATE CASCADE;
