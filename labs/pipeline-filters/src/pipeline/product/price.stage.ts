import { ProductPipelineStage } from "../../types/product.type";

export const withPriceRange: ProductPipelineStage = (args, filters) => {
    if (!filters.minPrice && !filters.maxPrice) return args;

    return {
        ...args,
        where: {
            ...args.where,
            price: {
                ...(filters.minPrice && { gte: parseFloat(filters.minPrice) }),
                ...(filters.maxPrice && { lte: parseFloat(filters.maxPrice) })
            }
        }
    };
};