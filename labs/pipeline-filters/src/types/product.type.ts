import { Prisma } from "../generated/prisma/client";

export type ProductFilter = {
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    isActive?: string;
    page?: string;
    limit?: string;
}

export type ProductQueryArgs = Prisma.ProductFindManyArgs;

export type ProductPipelineStage = (args: ProductQueryArgs, filters: ProductFilter) => ProductQueryArgs;