import { Queue } from "bullmq";
import { QUEUE_NAME } from "../constants/queue.constant.js";
import { queueConnection } from "../lib/bullmq.js";

export const subscriptionQueue = new Queue(QUEUE_NAME.SUBSCRIPTION, {
    connection: queueConnection,
    defaultJobOptions: {
        // removeOnComplete: true,
        // removeOnFail: true
    }
})