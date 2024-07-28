"use server";

import { findUser } from '@/libs/findUser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveBrief(data) {
  const { name_app, description, objectives, key_features, user_stories } = data;

  try {
    const { id } = await findUser();

    console.log(`user id is ${id}`);

    const transaction = await prisma.$transaction(async () => {
      const projectBrief = await prisma.projectBrief.create({
        data: { name: name_app, description, userId: id },
      });

      // Use createMany for objectives, features, and user stories
      await prisma.objective.createMany({
        data: objectives.map((objective) => ({
          name: objective.name,
          projectBriefsId: projectBrief.brief_id,
        })),
      });

      await prisma.feature.createMany({
        data: key_features.map((feature) => ({
          name: feature.name,
          detail: feature.detail,
          projectBriefsId: projectBrief.brief_id,
        })),
      });

      await prisma.userStory.createMany({
        data: user_stories.map((userStory) => ({
          name: userStory.name,
          projectBriefsId: projectBrief.brief_id,
        })),
      });

      return projectBrief;
    });

    return transaction;
  } catch (error) {
    console.error("Error creating project brief with data:", error);
    throw error; // Rethrow or handle as needed
  }
}
