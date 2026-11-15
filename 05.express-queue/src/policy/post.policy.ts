import { Post } from "../prisma/generated/prisma/client.js";
import { user } from "../utils/context.js";

export const allowPost = (post: Post) => {
    const currentUser = user();

    if (!currentUser) {
        return false;
    }
    if (currentUser.type === 'ADMIN') {
        return true;
    }

    return post.postedById === currentUser.id
}

export const filterByUser = () => {
    return (user()?.type === 'STAFF' ? {
        postedById: user()!.id
    } : {})
}