import express from "express";
import indexRouter from "./routes/index.route";
const PORT = 3000;
const app = express();
app.use('/api', indexRouter);
app.listen(PORT, () => {
    console.log(`Server running port: ${PORT}`);
});
