import { Request, Response } from "express";
import { moduleService } from "../../services/module.service.js";

export const moduleController = {
    async findAll(req: Request, res: Response) {
        const data = await moduleService.findAll();
        return res.json({
            data,
            success: true,
            message: "Get module success"
        });
    }
}