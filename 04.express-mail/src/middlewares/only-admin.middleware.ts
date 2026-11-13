import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception.js";

export const onlyAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user?.type === 'ADMIN') {
        return next();
    }
    throw new HttpException("Forbidden", 403);
}   