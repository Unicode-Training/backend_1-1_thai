import { prisma } from "../lib/prisma.js";

export const userRoleService = {
    create(roleId: number, data: number[]) {
        return prisma.userRole.createMany({
            data: data.map((val) => ({
                roleId,
                userId: val
            }))
        })
    }
}