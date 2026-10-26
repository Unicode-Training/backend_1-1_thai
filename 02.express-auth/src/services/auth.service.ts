import { HttpException } from "../exceptions/http.exception.js";
import { verifyPassword } from "../utils/hashing.js";
import { generateToken } from "../utils/jwt.js";
import { userService } from "./user.service.js";
import HttpStatus from "http-status";

export const authService = {
    async login(email: string, password: string) {
        //1. Query kiểm tra user có tồn tại k?
        const user = await userService.findUserByEmail(email);
        if (!user) {
            throw new HttpException("Email or password invalid", HttpStatus.UNAUTHORIZED)
        }
        //2. Lấy password hash trong db
        const passwordHash = user.password;
        //3. So sánh bằng bcrypt
        if (!verifyPassword(password, passwordHash)) {
            throw new HttpException("Email or password invalid", HttpStatus.UNAUTHORIZED)
        }
        //4. Tạo token
        const token = generateToken({ id: user.id, jti: crypto.randomUUID() });
        return token;
    }
}