import { UserStatus } from "../prisma/generated/prisma/enums.js";

export type UserQuery = {
    q: string;
    status: UserStatus,
    sort: "latest" | "oldest",
    page: number,
    limit: number,
    select: string
}