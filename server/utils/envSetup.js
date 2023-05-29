// setting up and exporting variables 
// used in the app based on the environment
import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV;
export const CALLBACK_URL = process.env.NODE_ENV === "production" ? process.env.CALLBACK_URL_PROD : process.env.CALLBACK_URL_DEV;
export const MONGO_URI = process.env.NODE_ENV === "production" ? process.env.MONGO_URI_PROD
    : process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_TEST;