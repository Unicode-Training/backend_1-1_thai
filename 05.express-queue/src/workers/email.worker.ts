import { UnrecoverableError, Worker } from "bullmq";
import { QUEUE_NAME } from "../constants/queue.constant.js";
import { workerConnection } from "../lib/bullmq.js";
import { subscribeClient } from "../lib/ioredis.js";

let timeoutId;
const sendRequest = async (completed) => {
    await new Promise((resolve) => {
        timeoutId = setTimeout(() => {
            resolve('');
            completed()
        }, 10000);
    });
    console.log('Đã gửi email');
}

//Worker khởi tạo -> Tạo AbortController
const emailWorker = new Worker(QUEUE_NAME.EMAIL, async (job, token, signal) => {

    return new Promise((resolve, reject) => {
        signal?.addEventListener('abort', () => {
            // Access the cancellation reason
            const reason = signal.reason || 'No reason provided';
            console.log(`Job ${job.id} cancelled: ${reason}`);
            // if (timeoutId) {
            //     clearTimeout(timeoutId);
            // }
            // reject(new Error(`Cancelled: ${reason}`));
            reject(new UnrecoverableError(`Cancelled: ${reason}`));
        });

        // Your processing logic
        sendRequest(resolve);
        // resolve('a');
    });


    // console.log('Bắt đầu job...');

    // signal?.addEventListener('abort', () => {
    //     // Access the cancellation reason
    //     throw new Error('OK');
    // });

    // await sendRequest();

    // console.log('Xong Job');

    // throw new Error('Lỗi worker');
    // console.log(job.name, job.data);

    //Nếu không có lỗi xảy ra -> Hoàn thành
    //Nếu có lỗi -> failed
    // switch (job.name) {
    //     case JOB_NAME.AUTH_LOGIN_NOTICE:
    //         //check timeout
    //         //return -> completed
    //         console.log('completed');

    //         return {
    //             abc: '124'
    //         }
    //         console.log(job.data.random);
    //         break;
    //     default:
    //         throw new Error(job.name + 'not exist');
    // }
}, {
    connection: workerConnection,
    concurrency: 1,

});

subscribeClient.subscribe('email-job');
subscribeClient.on('message', (message) => {
    if (message === 'email-job') {
        emailWorker.cancelAllJobs();
    }
})

// emailWorker.on('failed', (job) => {
//     console.log(job);
// });

//concurrency -> Đồng thời
//Job 1, Job 2, Job 3
//=>Worker lấy job 1 -> Xử lý -> Completed | Failed -> Lấy job 2 -> ...

//Concurrency = 3
//Job 1, Job 2, Job 3
//=> Worker lấy 1 gửi đi xử lý
//=> Worker lấy 2 gửi đi xử lý
//=> Worker lấy 3 gửi đi xử lý

//Nếu là I/O Bound -> Libuv (Tác vụ bất động bộ)
//Nếu là CPU Bound -> Xử lý trực tiếp tại Call Stack

//daemon (Chạy 1 lần khi khởi động) vs scheduler (Chạy theo lịch)