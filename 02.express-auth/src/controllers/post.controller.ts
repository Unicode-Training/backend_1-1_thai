import { Request, Response } from "express";
import { postService } from "../services/post.service.js";
const origins = [
    'http://localhost:1234',
    "http://localhost:5173"
];
export const postController = {
    //Preflight
    findAllPreflight(req: Request, res: Response) {

        if (origins.includes(req.get('origin') as string)) {
            res.set('Access-Control-Allow-Origin', req.get('origin') as string);
        }

        res.set('Access-Control-Allow-Headers', 'x-api-key');
        res.set('Access-Control-Allow-Methods', 'PUT,PATCH,DELETE');
        res.set('Access-Control-Allow-Credentials', 'true');
        return res.json({});
    },
    async findAll(req: Request, res: Response) {
        const data = await postService.findAll();
        if (origins.includes(req.get('origin') as string)) {
            res.set('Access-Control-Allow-Origin', req.get('origin') as string);
        }
        res.set('Access-Control-Allow-Credentials', 'true');
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