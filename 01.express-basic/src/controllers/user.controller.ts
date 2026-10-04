import { Request, Response } from "express";
import { userService } from "../services/user.service.js";
import { UserQuery } from "../types/user.type.js";

export const userController = {
    async index(req: Request, res: Response) {
        const [data, count] = await userService.findAll(req.query as unknown as UserQuery);
        return res.json({
            data,
            success: true,
            message: "Get user success",
            meta: {
                total: count,
                currentPage: req.query.page ? +req.query.page : 1
            }
        })
    },

    async create(req: Request, res: Response) {
        const data = await userService.create(req.body);
        return res.json({
            data,
            message: "Create user success",
            success: true
        })
    },

    find(req: Request, res: Response) {
        const { id } = req.params;
        const data = userService.find(+id!);

        return res.json({ data })
    }

}