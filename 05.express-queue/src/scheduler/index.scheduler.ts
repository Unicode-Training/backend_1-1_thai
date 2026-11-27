import "dotenv/config";
import { subscriptionScheduler } from "./subscription.scheduler.js"
import { emailSubscriptionExpiredScheduler } from "./email-subscription-expired.js";

const bootstrap = async () => {
    await subscriptionScheduler('*/5 * * * * *');
    await emailSubscriptionExpiredScheduler('*/5 * * * * *')
}

bootstrap();