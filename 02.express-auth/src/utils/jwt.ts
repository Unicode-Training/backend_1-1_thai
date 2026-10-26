
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.js";
export const generateToken = (payload: JwtPayload) => {
    const accessToken = jsonwebtoken.sign(payload, AUTH_CONFIG.JWT_SECRET as string, {
        expiresIn: AUTH_CONFIG.JWT_EXPIRE as unknown as number
    });
    return {
        accessToken
    }
}

export const verifyAccessToken = (token: string) => {
    try {
        return jsonwebtoken.verify(token, AUTH_CONFIG.JWT_SECRET as string);
    } catch {
        return false;
    }
}