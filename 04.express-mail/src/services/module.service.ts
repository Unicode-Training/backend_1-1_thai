import { prisma } from "../lib/prisma.js"

export const moduleService = {
    async findAll() {
        const data = await prisma.module.findMany({
            include: {
                moduleActions: {
                    include: {
                        action: true
                    }
                }
            }
        });

        return data.map(({ moduleActions, ...item }) => {
            return {
                ...item,
                actions: moduleActions.map((val) => val.action)
            }
        })
    }
}