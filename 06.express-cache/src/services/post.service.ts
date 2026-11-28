import { HttpException } from "../exceptions/http.exception.js";
import { redisClient } from "../lib/ioredis.js";
import { prisma } from "../lib/prisma.js"
import { allowPost } from "../policy/post.policy.js";
import { Post } from "../prisma/generated/prisma/client.js";
import { cache } from "../utils/cache.js";
import { md5 } from "../utils/utils.js";

export const postService = {
    async findAll(query: { q: string, sort: 'desc' | 'asc' }) {
        //search params: q=abc&page=1

        const params = new URLSearchParams(query);
        params.sort();

        const searchParams = md5(params.toString().toLowerCase());

        // let listVersion = await redisClient.get('post:list:version') as unknown as number;
        // if (!listVersion) {
        //     listVersion = await redisClient.incr('post:list:version');
        // }

        // const cacheKey = `posts:list:v${listVersion}:params:${searchParams}`;
        const cacheKey = `v1:posts:list:params:${searchParams}`;
        //Gom tags
        const tags = 'post-list';
        redisClient.lpush(tags, cacheKey);

        return cache.remember(cacheKey, () => {
            const { q, sort } = query;
            return prisma.post.findMany({
                omit: {
                    content: true
                },
                orderBy: {
                    id: sort
                },
                where: {
                    title: {
                        contains: q
                    }
                }
            });
        })

    },
    async find(id: number) {
        const cacheKey = `posts:detail:${id}`;
        return cache.remember(cacheKey, async () => {
            const data = await prisma.post.findUnique({
                where:
                {
                    id,
                }
            });
            if (!data) {
                throw new HttpException("Post not found", 404);
            }

            return data;
        })

    },
    async create(data: Post, userId: number) {
        const post = await prisma.post.create({
            data: {
                ...data,
                postedById: userId,
            }
        });

        // const cacheKey = 'posts:list';
        // cache.forget([cacheKey]);
        // redisClient.incr('post:list:version')
        const tags = 'post-list';
        const cacheKeyList = await redisClient.lrange(tags, 0, -1);
        cache.forget(cacheKeyList);
        redisClient.del(tags);
        return post;
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

        //invalidate: list, detail:id
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

        //Invalidate: 
        // - list
        // - detail:id
    }
}

//Invalidate list
//1. Versioning
//- key của list -> đặt version
//- khi cần invalidate -> tăng version

//2. Tags
//Gom các key của list vào 1 tag