import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import { HttpException } from "../exceptions/http.exception.js";
import HttpStatus from "http-status";
import { prisma } from "../lib/prisma.js";
import { JwtPayload } from "jsonwebtoken";
import { redisClient } from "../lib/ioredis.js";
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ').at(-1);

    const decoded = verifyAccessToken(token!) as JwtPayload;

    if (!decoded) {
        throw new HttpException("Unathorize", HttpStatus.UNAUTHORIZED);
    }

    //- Check blacklist (Redis)
    const blacklistExisting = await redisClient.exists(`blacklist:${decoded.jti}`);
    if (blacklistExisting) {
        throw new HttpException("Unathorize", HttpStatus.UNAUTHORIZED);
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    });

    // - Check user bị khóa hay không?
    // - Check user kích hoạt chưa?
    req.user = user;
    req.jti = decoded.jti!;
    req.exp = decoded.exp!;

    next(); //Cho phép đi tiếp
}

//Lấy danh sách khóa học của tôi
// Route -> Middleware (Query user) -> MyCourseController 
// - Decode token
// - userId -> query tới users_courses