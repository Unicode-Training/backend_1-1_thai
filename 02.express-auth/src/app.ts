import express, { Request, Response } from "express";
import "dotenv/config";
import routerIndex from "./routes/index.route.js";
import { loggingMiddleware } from "./middlewares/logging.middleware.js";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/error.middleware.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//Global middleware
app.use(loggingMiddleware);

app.use('/api', routerIndex);

//Error handling
// - Not found
// - Error

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Chạy thành công: ${PORT}`);
})