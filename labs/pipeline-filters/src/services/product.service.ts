import { ProductFindManyArgs } from "../generated/prisma/models";
import { prisma } from "../libs/prisma";
import { runProductPipeline } from "../pipeline/product";
import { ProductFilter } from "../types/product.type";

export const productService = {
    findAll(filters: ProductFilter) {
        const queryArgs = {
            where: {},
            orderBy: { createdAt: 'desc' }
        } as ProductFindManyArgs;

        if (filters.search) {
            queryArgs.where!.name = {
                contains: filters.search,
            };
        }

        if (filters.minPrice || filters.maxPrice) {
            queryArgs.where!.price = {
                ...(filters.minPrice && { gte: parseFloat(filters.minPrice) }),
                ...(filters.maxPrice && { lte: parseFloat(filters.maxPrice) })
            };
        }

        if (filters.isActive !== undefined) {
            queryArgs.where!.isActive = filters.isActive === 'true';
        }

        const page = parseInt(filters.page!) || 1;
        const limit = parseInt(filters.limit!) || 10;

        queryArgs.skip = (page - 1) * limit;
        queryArgs.take = limit;

        return prisma.product.findMany(queryArgs);
    },

    findAllWithPipeline(filters: ProductFilter) {
        const queryArgs = runProductPipeline(filters);
        return prisma.product.findMany(queryArgs);
    }
}