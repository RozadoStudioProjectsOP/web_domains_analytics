import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import cors from "cors";
import helmet from "helmet";

import conn from "./db/connection.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());
app.use(helmet());


app.use("/auth", auth)
app.get('/', (req, res) => {
    res.status(200);
    res.type("html").send("<h1>Web Domain Analytics</h1>");
});

const start = async () => {
    await conn();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
    start();
}

export { app, start };