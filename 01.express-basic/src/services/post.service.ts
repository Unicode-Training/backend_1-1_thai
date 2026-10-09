import { prisma } from "../lib/prisma.js"
import { Post } from "../prisma/generated/prisma/client.js";
export const postService = {
    async findAll() {
        // const keyword = 'user1';
        return prisma.post.findMany({
            // where: {
            //     user: {
            //         email: {
            //             contains: keyword
            //         }
            //     },
            // },
            include: {
                user: {
                    include: {
                        phones: true
                    }
                }
            }
            // select: {
            //     id: true,
            //     title: true,
            //     createdAt: true,
            //     updatedAt: true,
            //     user: {
            //         select: {
            //             fullName: true,
            //             email: true,
            //             phones: {
            //                 select: {
            //                     phone: true
            //                 }
            //             }
            //         }
            //     }
            // }
        });
    },

    async update(body: Post, id: number) {
        return prisma.post.update({
            where: {
                id
            },
            data: {
                // ...body,
                user: {
                    connect: {
                        id: 1
                    }
                }
            }
        })
    }
}

/*
Cần danh sách post + user của từng post
SELECT * FROM posts
Lặp qua từng post
SELECT * FROM users WHERE id = post.user_id
--> Query n + 1
Ví dụ: có 10 posts -> 11 truy vấn

Cách giải quyết

1. Lấy danh sách post => SELECT * FROM posts
Lấy ra được danh sách các userId

2. Truy vấn tới bảng bảng users => SELECT * FROM users WHERE id IN(danh-sach-user)

3. Ghép lại với nhau bằng logic
*/