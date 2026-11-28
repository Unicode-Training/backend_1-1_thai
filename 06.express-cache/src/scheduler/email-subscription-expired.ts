import { subscriptionQueue } from "../queue/subscription.queue.js";

export const emailSubscriptionExpiredScheduler = async (pattern: string) => {
    await subscriptionQueue.upsertJobScheduler(
        'send-subscription-expired-daily',
        {
            // every: 3000, // Job will repeat every 10000 milliseconds (10 seconds)
            pattern
        },
        {
            name: 'send-subscription-expired',
            data: {}
        },
    );
}
