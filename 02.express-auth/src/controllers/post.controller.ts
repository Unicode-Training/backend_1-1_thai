import { Request, Response } from "express";
import { postService } from "../services/post.service.js";

export const postController = {
    async findAll(req: Request, res: Response) {
        const data = await postService.findAll();
        return res.json({
            data
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = await postService.update(req.body, +id!);
        return res.json({ data });
    }
}