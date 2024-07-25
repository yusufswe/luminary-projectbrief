const { PrismaClient } = require('@prisma/client');
const { auth } = require('./auth');

const prisma = new PrismaClient();

async function findById() {
    try {
        const id = auth().id;
        console.log(`start ${id}`);
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        console.log(`user id is ${user.id} and name is ${user.name} and email is ${user.email}`);
        return user;
    } catch (error) {
        console.error("Error finding user by id:", error);
        return null;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = findById;