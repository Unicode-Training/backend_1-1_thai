import { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export const userController = {
    async index(req: Request, res: Response) {
        const data = await userService.findAll();
        return res.json({ data })
    },

    create(req: Request, res: Response) {
        return res.json({
            body: req.body
        })
    },

    find(req: Request, res: Response) {
        const { id } = req.params;
        const data = userService.find(+id!);

        return res.json({ data })
    }

}