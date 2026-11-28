import { NextFunction, Request, Response } from "express";
import { asyncLocalStorage } from "../utils/context.js";

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Tạo một Map để lưu trữ dữ liệu của request hiện tại
    const store = new Map();
    store.set('req', req);

    // Chạy các middleware và route handler tiếp theo bên trong ngữ cảnh (context) này
    asyncLocalStorage.run(store, () => {
        next();
    });
}
