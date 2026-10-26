import express, { Router } from "express";
import { dashboardController } from "../controllers/admin/dashboard.controller.js";

const router: Router = express.Router();

router.get('/dashboard', dashboardController.findAll);

export default router;