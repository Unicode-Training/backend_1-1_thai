import { JwtPayload } from "jsonwebtoken";
import { HttpException } from "../exceptions/http.exception.js";
import { redisClient } from "../lib/ioredis.js";
import { verifyPassword } from "../utils/hashing.js";
import { decodeToken, generateToken, verifyRefreshToken } from "../utils/jwt.js";
import { userService } from "./user.service.js";
import HttpStatus from "http-status";
import { generateOTP } from "../utils/auth.js";
import { sendMailTemplate } from "../utils/mail.js";

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
        const jti = crypto.randomUUID();
        const token = generateToken({ id: user.id, jti });

        //Lưu refresh token vào redis
        //Key: refreshToken:{userId}:{jti}
        const refreshDecoded = decodeToken(token.refreshToken) as JwtPayload;
        const accessDecoded = decodeToken(token.accessToken) as JwtPayload;
        const ttl = Math.ceil(refreshDecoded.exp! - Date.now() / 1000);
        await redisClient.setex(`refreshToken:${user.id}:${jti}`, ttl, accessDecoded.exp!.toString());

        return token;
    },

    async logout(jti: string, exp: number, userId: number) {
        const ttl = Math.ceil(exp - Date.now() / 1000);
        await redisClient.setex(`blacklist:${jti}`, ttl, 'true');
        await redisClient.del(`refreshToken:${userId}:${jti}`);
    },

    async refreshToken(token: string) {
        //Verify token
        const decoded = verifyRefreshToken(token) as JwtPayload;
        if (!decoded) {
            throw new HttpException("Refresh token invalid", HttpStatus.UNAUTHORIZED);
        }

        //Check tồn tại
        const refreshExisting = await redisClient.exists(`refreshToken:${decoded.id}:${decoded.jti}`);
        if (!refreshExisting) {
            throw new HttpException("Refresh token invalid", HttpStatus.UNAUTHORIZED);
        }

        //Tạo token mới
        const jti = crypto.randomUUID();
        const newToken = generateToken({ id: decoded.id, jti });
        const refreshDecoded = decodeToken(newToken.refreshToken) as JwtPayload;
        const accessDecoded = decodeToken(newToken.accessToken) as JwtPayload;
        const ttl = Math.ceil(refreshDecoded.exp! - Date.now() / 1000);
        await redisClient.setex(`refreshToken:${decoded.id}:${jti}`, ttl, accessDecoded.exp!.toString());

        //Thu hồi refresh cũ
        await redisClient.del(`refreshToken:${decoded.id}:${decoded.jti}`);

        return newToken;
    },

    async revoke(userId: number) {
        const keys = await redisClient.keys(`refreshToken:${userId}:*`);
        for (const key of keys) {
            const jti = key.split(':').at(-1);
            const accessExp = await redisClient.get(key);
            const accessExpNumber = Number(accessExp);
            const ttl = Math.ceil((accessExpNumber - Date.now() / 1000));
            redisClient.del(key);
            redisClient.setex(`blacklist:${jti}`, ttl, 'true');
        }
        // Promise.all(keys.map(key => redisClient.del(key)))
    },

    async forgotPassword(email: string) {
        const user = await userService.findUserByEmail(email);
        if (user) {
            const otp = generateOTP();
            const currentOtp = await redisClient.get(`otp_user_${user.id}`);
            if (currentOtp) {
                await redisClient.del(`otp_${currentOtp}`);
            }
            await redisClient.setex(`otp_${otp}`, 300, user.id);
            await redisClient.setex(`otp_user_${user.id}`, 300, otp);
            sendMailTemplate(user.email, 'Mã lấy lại mật khẩu', 'forgot-password', {
                email: user.email,
                otp
            })
        }
    },

    async resetPassword(otp: string, password: string) {
        const userId = await redisClient.get(`otp_${otp}`);
        if (!userId) {
            throw new HttpException('Không khả dụng', 400);
        }
        await userService.updatePassword(+userId, password);
        const keys = [`otp_${otp}`, `otp_user_${userId}`];
        await redisClient.del(...keys);
    }

}

/*
Refresh token
- Login -> Tạo access, refresh -> Lưu jti của refresh token lên redis với ttl tương ứng exp của refresh
- Refresh token
+ Verify refresh token
+ Check refresh có trên redis hay không?
+ Tạo access + refresh mới 
+ Thêm jti của refresh mới vào redis
+ Thu hồi jti refresh cũ khỏi redis
==> Refresh token rotation

Khu thu hồi 
-> Xóa refresh token -> ok
-> Blacklist access token liên quan
+ jti -> ok
+ exp

//Security

- Refresh Rotation
- Fingerprint
- Expire time ngắn

Đặt logs:
- Chia level: info, warning, error,....
- Dùng middleware chung để bắt tất cả => Lưu vào file hoặc database khác (remote) -> Nhóm theo từng level
- Lập lịch định kỳ dọn dẹp -> Giải phóng tài nguyên

Frontend:
- URL
- METHOD
- PAYLOAD
- Headers: x-ip, authorization, user-agent, accept,...
- status
- response body
*/