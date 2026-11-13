import { prisma } from '../lib/prisma.js';
import { createPasswordHash } from '../utils/hashing.js';
import { UserCreateManyInput } from './generated/prisma/models.js';
const main = async () => {

    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;

    const data: UserCreateManyInput[] = [
        {
            name: "User 1",
            email: "user1@gmail.com",
            password: createPasswordHash('123456'),
            type: 'CLIENT',
            status: "ACTIVE"
        },
        {
            name: "User 2",
            email: "user2@gmail.com",
            password: createPasswordHash('123456'),
            type: 'ADMIN',
            status: "ACTIVE"
        },
        {
            name: "User 3",
            email: "user3@gmail.com",
            password: createPasswordHash('123456'),
            type: 'STAFF',
            status: "ACTIVE"
        },
        {
            name: "User 4",
            email: "user4@gmail.com",
            password: createPasswordHash('123456'),
            type: 'STAFF',
            status: "ACTIVE"
        }
    ];

    await prisma.user.createMany({
        data
    })

}

main().then(() => {
    process.exit();
})