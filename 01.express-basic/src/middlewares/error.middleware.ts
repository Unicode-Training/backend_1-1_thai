import { NextFunction, Request, Response } from "express";
import { HttpException, IHttpException } from "../exceptions/http.exception.js";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        message: `Not found path: ${req.path}`
    });
}

export const errorMiddleware = (err: IHttpException, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status! || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        ...(err.errors ? { errors: err.errors } : {})
    })
}