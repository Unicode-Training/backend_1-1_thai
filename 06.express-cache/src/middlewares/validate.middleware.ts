import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject, ZodType } from "zod";
import { HttpException } from "../exceptions/http.exception.js";
import status from "http-status";

export const validate = (schema: ZodType) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = await schema.parseAsync(req.body ?? {});
        req.body = body;
        next();
    } catch (error) {
        if (error instanceof ZodError) {
            // console.log(error.issues);
            const errors = Object.fromEntries(error.issues.map(({ path, message }) => [path[0], message]));
            throw new HttpException("Validate Failed", status.BAD_REQUEST, errors);
        }
        throw new HttpException("Internal Server Error")
    }
}

//Mass Assignment