import { subscriptionQueue } from "../queue/subscription.queue.js";

export const subscriptionScheduler = async (pattern: string) => {
    await subscriptionQueue.upsertJobScheduler(
        'check-subscription-daily',
        {
            // every: 3000, // Job will repeat every 10000 milliseconds (10 seconds)
            pattern
        },
        {
            name: 'check-expire-subscription',
            data: {},
        },
    );
}

//[{id: 1, youtubeId: '123'}, {{id: 2, youtubeId: '124'}}]