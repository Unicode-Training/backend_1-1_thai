import { prisma } from "../lib/prisma.js"

export const permissionService = {
    async assignPermissionToRole(roleId: number, permissionValues: string[]) {

        const permissions = await Promise.all(permissionValues.map(async (permissionName) => {
            let permission = await prisma.permission.findFirst({
                where: {
                    name: permissionName
                }
            });
            if (!permission) {
                permission = await prisma.permission.create({
                    data: {
                        name: permissionName
                    }
                })
            }

            return permission;
        }));

        const rolePermissionsOnDb = await prisma.rolePermissions.findMany({
            where: {
                roleId
            }
        });

        const onRolePermissionCreate = permissions.filter(permission => !rolePermissionsOnDb.find(val => val.permissionId === permission.id));


        const onRolePermissionDelete = rolePermissionsOnDb.filter((item) => !permissions.find(val => val.id === item.permissionId));

        await prisma.$transaction(async (tx) => {
            await tx.rolePermissions.createMany({
                data: onRolePermissionCreate.map(val => ({ roleId, permissionId: val.id }))
            });
            await tx.rolePermissions.deleteMany({
                where: {
                    id: {
                        in: onRolePermissionDelete.map(val => val.id)
                    }
                }
            })
        });
    }
}