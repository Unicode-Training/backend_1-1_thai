import { HttpException } from "../exceptions/http.exception.js";
import { prisma } from "../lib/prisma.js"
import { allowPost, filterByUser } from "../policy/post.policy.js";
import { Post } from "../prisma/generated/prisma/client.js";

export const postService = {
    findAll() {
        return prisma.post.findMany({
            where: {
                ...filterByUser()
            }
        });
    },
    async find(id: number) {
        const data = await prisma.post.findUnique({
            where:
            {
                id,
                ...filterByUser()
            }
        });
        if (!data) {
            throw new HttpException("Post not found", 404);
        }
    },
    create(data: Post, userId: number) {
        return prisma.post.create({
            data: {
                ...data,
                postedById: userId
            }
        })
    },
    async update(data: Post, id: number) {
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!allowPost(post!)) {
            throw new HttpException("Forbidden", 403);
        }
        return prisma.post.update({
            where: {
                id,
            },
            data
        })
    },
    async delete(id: number) {
        const post = await prisma.post.findUnique({
            where: { id }
        });

        if (!allowPost(post!)) {
            throw new HttpException("Forbidden", 403);
        }

        return prisma.post.delete({
            where: {
                id,

            },
        })
    }
}