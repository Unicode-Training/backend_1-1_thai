import { redisClient } from "../lib/ioredis.js"

export const cache = {
    async remember<T>(key: string, callback: () => Promise<T>, ttl = 3600) {
        const cacheKey = `cache_${key}`;
        const cached = await redisClient.get(cacheKey);
        if (!cached) {
            const data = await callback();
            redisClient.setex(cacheKey, ttl, JSON.stringify(data));
            return data;
        }
        return JSON.parse(cached);
    },

    async forever<T>(key: string, callback: () => Promise<T>) {
        const cacheKey = `cache_${key}`;
        const cached = await redisClient.get(cacheKey);
        if (!cached) {
            const data = await callback();
            redisClient.set(cacheKey, JSON.stringify(data));
            return data;
        }
        return JSON.parse(cached);
    },

    async forget(key: string[]) {
        const cacheKey = `cache_${key}`;
        await redisClient.unlink(...cacheKey);
    }
}