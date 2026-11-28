import { Queue } from "bullmq";
import { QUEUE_NAME } from "../constants/queue.constant.js";
import { queueConnection } from "../lib/bullmq.js";

export const emailQueue = new Queue(QUEUE_NAME.EMAIL, {
    connection: queueConnection
});