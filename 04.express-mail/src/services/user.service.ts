import { HttpException } from "../exceptions/http.exception.js";
import { prisma } from "../lib/prisma.js"
import { createPasswordHash } from "../utils/hashing.js";

export const userService = {
    findUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
    },

    updatePassword(id: number, password: string) {
        return prisma.user.update({
            where: { id },
            data: {
                password: createPasswordHash(password)
            }
        })
    },

    async getProfile(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            omit: {
                password: true
            },
            include: {
                userRoles: {
                    include: {
                        role: {
                            include: {
                                rolePermissions: {
                                    include: {
                                        permission: true
                                    }
                                }
                            }
                        }
                    }
                },
                userPermissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });

        if (!user) {
            throw new HttpException("User not found", 401);
        };

        const { userRoles, userPermissions, ...data } = user;

        const permissionData: string[] = [];
        userRoles.forEach(({ role }) => {
            role.rolePermissions.forEach(({ permission }) => {
                permissionData.push(permission.name);
            })
        });

        userPermissions.forEach(({ permission }) => {
            permissionData.push(permission.name);
        })

        const permissions = [...new Set(permissionData)];

        return {
            ...data,
            permissions
        };
    }
}
