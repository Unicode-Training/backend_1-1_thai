import { prisma } from "../lib/prisma.js"
import { Role } from "../prisma/generated/prisma/client.js";

export const roleService = {
    findAll() {
        return prisma.role.findMany();
    },

    create(data: Role) {
        return prisma.role.create({ data })
    }
}