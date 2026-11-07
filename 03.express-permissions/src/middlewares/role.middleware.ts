import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception.js";

export const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.type === 'CLIENT') {
        throw new HttpException("Forbidden", 403);
    }
    next();
}