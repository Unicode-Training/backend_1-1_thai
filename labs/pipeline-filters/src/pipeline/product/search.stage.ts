import { ProductPipelineStage } from "../../types/product.type";

export const withSearch: ProductPipelineStage = (args, filters) => {
    if (!filters.search) return args;

    return {
        ...args,
        where: {
            ...args.where,
            name: {
                contains: filters.search,
            }
        }
    };
};