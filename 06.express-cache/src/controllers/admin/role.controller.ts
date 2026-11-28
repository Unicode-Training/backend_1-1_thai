import { Request, Response } from "express";
import { roleService } from "../../services/role.service.js";
import { permissionService } from "../../services/permission.service.js";

export const roleController = {
    async findAll(req: Request, res: Response) {
        const data = await roleService.findAll();
        return res.json({
            data,
            success: true,
            message: "Get list role success"
        })
    },

    async create(req: Request, res: Response) {
        const data = await roleService.create(req.body);
        return res.status(201).json({
            data,
            success: true,
            message: "Create role success"
        })
    },

    async assignPermissions(req: Request, res: Response) {
        const { id } = req.params;
        const data = await permissionService.assignPermissionToRole(+id!, req.body);
        return res.json({
            data,
            success: true,
            message: "Assign permission success"
        });
    }
}