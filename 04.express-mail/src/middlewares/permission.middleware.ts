import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception.js";

export const permissionMiddleware = (name: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user?.type === 'ADMIN') {
        return next();
    }
    const permissions = new Set(user?.permissions);

    if (!permissions.has(name)) {
        throw new HttpException("Forbidden", 403);
    }

    next();
}