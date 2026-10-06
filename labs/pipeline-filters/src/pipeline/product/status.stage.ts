import { ProductPipelineStage } from "../../types/product.type";

export const withStatus: ProductPipelineStage = (args, filters) => {
    if (filters.isActive === undefined) return args;

    return {
        ...args,
        where: {
            ...args.where,
            isActive: filters.isActive === 'true'
        }
    };
};