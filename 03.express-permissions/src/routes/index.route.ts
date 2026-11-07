import express, { Router } from "express";
import routerAdmin from "./admin.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authController } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/auth.validator.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router: Router = express.Router();

router.use('/admin', authMiddleware, roleMiddleware, routerAdmin);

router.post('/auth/login', validate(loginSchema), authController.login);
router.get('/auth/me', authMiddleware, authController.profile);
router.delete('/auth/logout', authMiddleware, authController.logout);
router.post('/auth/refresh-token', authController.refreshToken);
router.delete('/auth/revoke', authMiddleware, authController.revoke);

export default router;