import express, { Router } from "express";
import { dashboardController } from "../controllers/admin/dashboard.controller.js";
import { roleController } from "../controllers/admin/role.controller.js";
import { onlyAdminMiddleware } from "../middlewares/only-admin.middleware.js";
import { userRoleController } from "../controllers/admin/user-role.controller.js";
import { productController } from "../controllers/admin/product.controller.js";
import { permissionMiddleware } from "../middlewares/permission.middleware.js";
import { postController } from "../controllers/admin/post.controller.js";

const router: Router = express.Router();

router.get('/dashboard', dashboardController.findAll);

router.get('/products', permissionMiddleware('products.read'), productController.findAll);
router.post('/products', permissionMiddleware('products.create'), productController.create);
router.patch('/products/:id', permissionMiddleware('products.update'), productController.update);
router.delete('/products/:id', permissionMiddleware('products.delete'), productController.delete);

router.get('/posts', permissionMiddleware('posts.read'), postController.findAll);
router.post('/posts', permissionMiddleware('posts.create'), postController.create);
router.patch('/posts/:id', permissionMiddleware('posts.update'), postController.update);
router.delete('/posts/:id', permissionMiddleware('posts.delete'), postController.delete);

router.use(onlyAdminMiddleware);
router.get('/roles', roleController.findAll);
router.post('/roles', roleController.create);
router.put('/roles/:id/permissions', roleController.assignPermissions);
router.post('/roles/:id/users', userRoleController.create);

export default router;