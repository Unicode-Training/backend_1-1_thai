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
    },

    async logout(req: Request, res: Response) {
        const { jti, exp, user } = req;
        await authService.logout(jti!, exp!, user!.id);
        return res.json({
            success: true
        });
    },

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        const data = await authService.refreshToken(refreshToken);
        return res.json({
            success: true,
            data
        })
    },

    async revoke(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await authService.revoke(userId!);
        return res.json({
            data,
            success: true
        })
    },

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;
        await authService.forgotPassword(email);
        return res.json({
            success: true
        });
    },

    async resetPassword(req: Request, res: Response) {
        const { otp, password } = req.body;
        await authService.resetPassword(otp, password);
        return res.json({
            success: true
        });
    }
}