"use server";


import { findUser } from '@/libs/findUser';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function saveBrief(data) {
  const { name_app, description, objectives, key_features, user_stories } = data;

  try {
    const {id} = await findUser();

    console.log(`user id is in ${id}`);
    const result = await prisma.$transaction(async () => {
      const projectBrief = await createProjectBrief(name_app, description, id);
      await createObjectives(projectBrief.brief_id, objectives);
      await createFeatures(projectBrief.brief_id, key_features);
      await createUserStories(projectBrief.brief_id, user_stories);
      return projectBrief;
    });
    return result;
  } catch (error) {
    console.error("Error creating project brief with data:", error);
    throw error; // Rethrow or handle as needed
  }
}

async function createProjectBrief(name, description, userId) {
  return prisma.projectBrief.create({
    data: { name, description, userId },
  });
}

async function createObjectives(projectBriefId, objectives) {
  return Promise.all(
    objectives.map((objective) =>
      prisma.objective.create({
        data: {
          name: objective.name,
          projectBriefsId: projectBriefId,
        },
      })
    )
  );
}

async function createFeatures(projectBriefId, key_features) {
  return Promise.all(
    key_features.map((feature) =>
      prisma.feature.create({
        data: {
          name: feature.name,
          detail: feature.detail,
          projectBriefsId: projectBriefId,
        },
      })
    )
  );
}

async function createUserStories(projectBriefId, user_stories) {
  return Promise.all(
    user_stories.map((userStory) =>
      prisma.userStory.create({
        data: {
          name: userStory.name,
          projectBriefsId: projectBriefId,
        },
      })
    )
  );
}
