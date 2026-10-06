import express from "express";
import { productController } from "../controllers/product.controller";
const router = express.Router();
router.get('/products', productController.findAll);
export default router;