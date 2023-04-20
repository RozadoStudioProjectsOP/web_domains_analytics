import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";

import conn from "./db/connection.js";
import auth from "./routes/auth.js";
import scrapy from "./routes/scrapy.js";
import passport from "./controllers/passport.js";

dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors({ origin: [process.env.CORS_ORIGIN_PROD, process.env.CORS_ORIGIN_DEV], credentials: true }));
app.use(helmet());


app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth)
app.use("/scrapy", scrapy)

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