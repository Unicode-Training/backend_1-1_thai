import { Request, Response } from "express";
import { userRoleService } from "../../services/user-role.service.js";

export const userRoleController = {
    async create(req: Request, res: Response) {
        const { id } = req.params;
        const data = await userRoleService.create(+id!, req.body);
        return res.json({
            data,
            success: true
        })
    }
}