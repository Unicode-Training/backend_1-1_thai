import { Request, Response } from "express";
import { productService } from "../services/product.service";

export const productController = {
    async findAll(req: Request, res: Response) {
        const data = await productService.findAll(req.query);
        res.json({ data, success: true })
    }
}