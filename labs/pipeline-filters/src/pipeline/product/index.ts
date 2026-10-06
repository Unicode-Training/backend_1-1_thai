import { withPagination } from '../core/pagination.stage';
import { withSearch } from './search.stage';
import { withPriceRange } from './price.stage';
import { withStatus } from './status.stage';
import { ProductFilter, ProductPipelineStage, ProductQueryArgs } from '../../types/product.type';

export const runProductPipeline = (filters: ProductFilter): ProductQueryArgs => {

    const pipeline: ProductPipelineStage[] = [
        withSearch,
        withPriceRange,
        withStatus,
        withPagination
    ];

    const initialArgs: ProductQueryArgs = {
        where: {},
        orderBy: { createdAt: 'desc' }
    };

    return pipeline.reduce(
        (currentArgs, stage) => stage(currentArgs, filters),
        initialArgs
    );
};
