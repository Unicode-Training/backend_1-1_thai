import { Request, Response } from "express"

export const dashboardController = {
    findAll(req: Request, res: Response) {
        return res.json({})
    }
}