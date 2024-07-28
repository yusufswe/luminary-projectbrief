import { auth } from '@/libs/auth';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function getProjectBriefs() {
  try {
    const id = auth().id;
    console.log(`user id is in ${id}`);
	const projectBrief = await prisma.projectBrief.findMany({
	  where: {
		userId: id, 
	  },
	  include: {
		features: true, // Assuming `features` is the relation field name in ProjectBrief model
		objective: true, // Assuming `objectives` is the relation field name in ProjectBrief model
		userStories: true, // Assuming `userStories` is the relation field name in ProjectBrief model
	  },
	});
	console.log(projectBrief);
	return projectBrief;
  } catch (error) {
	console.error('Error fetching project brief with details:', error);
	throw error;
  } finally {
	await prisma.$disconnect();
  }
}