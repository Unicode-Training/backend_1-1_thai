import { User } from "./user.type.ts";

declare global {
    namespace Express {
        export interface Request {
            user?: User | null
        }
    }
}
