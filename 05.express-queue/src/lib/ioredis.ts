import { Redis } from "ioredis";
import { DB_CONFIG } from "../config/database.js";
export const redisClient = new Redis(DB_CONFIG.REDIS_URL);

//import file a -> mở 1 kết nối
//import file b -> mở 1 kết nối mới