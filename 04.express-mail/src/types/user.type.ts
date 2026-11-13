import { UserStatus, UserType } from "../prisma/generated/prisma/enums.js";

export type UserQuery = {
    q: string;
    status: UserStatus,
    sort: "latest" | "oldest",
    page: number,
    limit: number,
    select: string
}

export type User = {
    id: number;
    name: string;
    email: string;
    status: UserStatus;
    type: UserType;
    permissions: string[]
}