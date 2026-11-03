import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import routerIndex from "./routes/index.route.js";
import { loggingMiddleware } from "./middlewares/logging.middleware.js";
import { errorMiddleware, notFoundMiddleware } from "./middlewares/error.middleware.js";
const app = express();

app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

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