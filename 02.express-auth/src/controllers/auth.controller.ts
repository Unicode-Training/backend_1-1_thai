import { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

export const authController = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        return res.json({
            data,
            success: true,
            message: "Login success"
        })
    },

    async profile(req: Request, res: Response) {
        return res.json({
            data: req.user
        });
    }
}