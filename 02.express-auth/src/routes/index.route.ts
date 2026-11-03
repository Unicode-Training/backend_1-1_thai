import express, { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import routerAdmin from "./admin.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createUserSchema } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postController } from "../controllers/post.controller.js";
import { authController } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/auth.validator.js";

const router: Router = express.Router();

// router.use(authMiddleware);
router.get('/users', userController.index);
router.get('/users/:id', userController.find);
router.post('/users', validate(createUserSchema), userController.create);
router.patch('/users/:id/posts', userController.assignPost);
router.patch('/users/:id/images', userController.images);
router.put('/posts', postController.findAll);
router.options('/posts', postController.findAllPreflight);
router.patch('/posts/:id', postController.update);
router.post('/users/:id/courses', userController.assignCourses);
router.get('/users/:id/courses', userController.courses);
router.get('/top-users', userController.topUsers);

router.use('/admin', authMiddleware, routerAdmin);

router.post('/auth/login', validate(loginSchema), authController.login);
router.get('/auth/me', authMiddleware, authController.profile);
router.delete('/auth/logout', authMiddleware, authController.logout);
router.post('/auth/refresh-token', authController.refreshToken);
router.delete('/auth/revoke', authMiddleware, authController.revoke);

export default router;