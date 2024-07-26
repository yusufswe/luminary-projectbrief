const { PrismaClient } = require('@prisma/client');
const { auth } = require('./auth');

const prisma = new PrismaClient();

async function findById() {
    try {
        const id = auth().id;

        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        return user;
    } catch (error) {

        return null;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = findById;