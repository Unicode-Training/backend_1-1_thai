import { Redis } from "ioredis";
import { DB_CONFIG } from "../config/database.js";
export const redisClient = new Redis(DB_CONFIG.REDIS_URL);