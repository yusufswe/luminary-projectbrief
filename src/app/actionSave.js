"use server";

import { findUser } from '@/libs/findUser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveBrief(data) {
  const { name_app, description, objectives, key_features, user_stories } = data;

  try {
    const { id } = await findUser();

    console.log(`user id is ${id}`);

    const projectBrief = await prisma.projectBrief.create({
      data: {
        name: name_app,
        description,
        userId: id,
        objective: {
          createMany: {
            data: objectives.map((objective) => ({ name: objective.name })),
          },
        },
        features: {
          createMany: {
            data: key_features.map((feature) => ({ name: feature.name, detail: feature.detail })),
          },
        },
        userStories: {
          createMany: {
            data: user_stories.map((userStory) => ({ name: userStory.name })),
          },
        },
      },
      include: {
        objective: true,
        features: true,
        userStories: true,
      },
    });

    return projectBrief;
  } catch (error) {
    console.error("Error creating project brief with data:", error);
    throw error;
  }
}