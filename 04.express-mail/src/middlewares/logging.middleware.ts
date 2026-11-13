import { NextFunction, Request, Response } from "express";

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('loggingMiddleware');
    next(); //Cho phép đi tiếp
}