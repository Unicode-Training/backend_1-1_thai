import { Redis } from "ioredis";
import { DB_CONFIG } from "../config/database.js";

export const queueConnection = new Redis(DB_CONFIG.REDIS_URL);

export const workerConnection = new Redis(DB_CONFIG.REDIS_URL, {
    maxRetriesPerRequest: null
});