import { Worker } from "bullmq";
import { QUEUE_NAME } from "../constants/queue.constant.js";
import { workerConnection } from "../lib/bullmq.js";

new Worker(QUEUE_NAME.SUBSCRIPTION, async (job) => {
    console.log(job.name);
}, {
    connection: workerConnection
})