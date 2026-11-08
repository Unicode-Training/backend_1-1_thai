import { Request, Response } from "express";
import { postService } from "../../services/post.service.js";
export const postController = {
    async findAll(req: Request, res: Response) {
        const data = await postService.findAll();
        return res.json({
            data,
            success: true
        })
    },
    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await postService.find(+id!);
        return res.json({
            data,
            success: true
        })
    },
    async create(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await postService.create(req.body, userId!);
        return res.json({
            data,
            success: true
        })
    },
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = await postService.update(req.body, +id!);
        return res.json({
            data,
            success: true
        })
    },
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const data = await postService.delete(+id!);
        return res.json({
            data,
            success: true
        })
    }
}

//?x=a&y=b