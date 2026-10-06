export const withPagination = (args: any, filters: any) => {
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;

    return {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
    };
};