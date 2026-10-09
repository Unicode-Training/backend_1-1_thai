import express, { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import routerAdmin from "./admin.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createUserSchema } from "../validators/user.validator.js";
import { validate } from "../middlewares/validate.middleware.js";
import { postController } from "../controllers/post.controller.js";

const router: Router = express.Router();

// router.use(authMiddleware);
router.get('/users', userController.index);
router.get('/users/:id', userController.find);
router.post('/users', validate(createUserSchema), userController.create);
router.patch('/users/:id/posts', userController.assignPost);
router.patch('/users/:id/images', userController.images);
router.get('/posts', postController.findAll);
router.patch('/posts/:id', postController.update);

router.use('/admin', authMiddleware, routerAdmin);

export default router;