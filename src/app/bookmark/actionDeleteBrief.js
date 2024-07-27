"use server"

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function deleteProjectBrief(brief_id){
    try {
        await prisma.projectBrief.delete({
            where: {
                brief_id: brief_id,
            },
        });
        return brief_id;
    } catch (error) {
        console.error('Error fetching project brief with details:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}