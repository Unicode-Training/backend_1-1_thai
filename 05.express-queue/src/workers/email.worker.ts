import { Worker } from "bullmq";
import { JOB_NAME, QUEUE_NAME } from "../constants/queue.constant.js";
import { workerConnection } from "../lib/bullmq.js";

new Worker(QUEUE_NAME.EMAIL, async (job) => {
    // throw new Error('Lỗi worker');
    // console.log(job.name, job.data);

    //Nếu không có lỗi xảy ra -> Hoàn thành
    //Nếu có lỗi -> failed
    switch (job.name) {
        case JOB_NAME.AUTH_LOGIN_NOTICE:
            console.log(job.data.random);
            break;
        default:
            throw new Error(job.name + 'not exist');
    }
}, {
    connection: workerConnection
});

// emailWorker.on('failed', (job) => {
//     console.log(job);
// });