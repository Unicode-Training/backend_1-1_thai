import { faker } from '@faker-js/faker';
import { prisma } from '../lib/prisma.js';
import { User } from './generated/prisma/client.js';
const main = async () => {
    enum Status {
        ACTIVE = 'ACTIVE',
        INACTIVE = 'INACTIVE',

    }
    const data = [...Array(50)].map(() => ({
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456',
        status: faker.helpers.enumValue(Status)
    })) as unknown as User[];

    await prisma.user.createMany({
        data
    })
}

main().then(() => {
    process.exit();
})