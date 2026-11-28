import { prisma } from '../lib/prisma.js';
const main = async () => {
    await prisma.$executeRaw`TRUNCATE TABLE modules RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE actions RESTART IDENTITY CASCADE`;

    await prisma.module.createMany({
        data: [
            {
                name: "products",
                title: "Quản lý sản phẩm"
            },
            {
                name: "posts",
                title: "Quản lý bài viết"
            },
            {
                name: "users",
                title: "Quản lý người dùng"
            }
        ]
    });

    await prisma.action.createMany({
        data: [
            {
                name: "read",
                title: "Xem"
            },
            {
                name: "create",
                title: "Thêm"
            },
            {
                name: "update",
                title: "Sửa"
            },
            {
                name: "delete",
                title: "Xóa"
            }
        ]
    });

    await prisma.moduleAction.createMany({
        data: [
            {
                moduleId: 1,
                actionId: 1
            },
            {
                moduleId: 1,
                actionId: 2
            },
            {
                moduleId: 1,
                actionId: 3
            },
            {
                moduleId: 1,
                actionId: 4
            },
            {
                moduleId: 2,
                actionId: 1
            },
            {
                moduleId: 2,
                actionId: 2
            },
            {
                moduleId: 2,
                actionId: 3
            },
            {
                moduleId: 2,
                actionId: 4
            },
            {
                moduleId: 3,
                actionId: 1
            },
            {
                moduleId: 3,
                actionId: 2
            },
            {
                moduleId: 3,
                actionId: 3
            },
            {
                moduleId: 3,
                actionId: 4
            }
        ]
    })
}

main().then(() => {
    process.exit();
})