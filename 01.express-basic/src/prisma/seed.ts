import { faker } from '@faker-js/faker';
import { prisma } from '../lib/prisma.js';
const main = async () => {
    // enum Status {
    //     ACTIVE = 'ACTIVE',
    //     INACTIVE = 'INACTIVE',

    // }
    // const data = [...Array(50)].map(() => ({
    //     fullName: faker.person.fullName(),
    //     email: faker.internet.email(),
    //     password: '123456',
    //     status: faker.helpers.enumValue(Status)
    // })) as unknown as User[];

    // await prisma.user.createMany({
    //     data
    // })



    await prisma.post.createMany({
        data: [...Array(10)].map(() => {
            return {
                title: faker.lorem.sentence(5),
                content: faker.lorem.sentences(10),
                userId: 1
            }
        })
    });

    await prisma.post.createMany({
        data: [...Array(5)].map(() => {
            return {
                title: faker.lorem.sentence(5),
                content: faker.lorem.sentences(10),
                userId: 2
            }
        })
    });

    await prisma.post.createMany({
        data: [...Array(7)].map(() => {
            return {
                title: faker.lorem.sentence(5),
                content: faker.lorem.sentences(10),
                userId: 3
            }
        })
    });

}

main().then(() => {
    process.exit();
})