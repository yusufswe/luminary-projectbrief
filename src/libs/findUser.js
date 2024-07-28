const { PrismaClient } = require('@prisma/client');
const { auth } = require('./auth');

const prisma = new PrismaClient();

export async function findUser() {
    try {
        const id = auth().id;
        console.log(`user id is in ${id}`);
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        console.log(`user` , user);
        return user;

    } catch (error) {
        return null;
    } finally {
        await prisma.$disconnect();
    }
}
