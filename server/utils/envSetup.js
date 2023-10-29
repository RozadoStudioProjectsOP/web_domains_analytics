// setting up and exporting variables 
// used in the app based on the environment
import dotenv from "dotenv";

dotenv.config();

// SCRAPY
export const DB = process.env.DB;
export const PROJECT = process.env.PROJECT;
export const SCRAPYD_URL = process.env.SCRAPYD_URL;
// CLIENT
export const BASE_URL = process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN_DEV;
// API
export const CALLBACK_URL = process.env.NODE_ENV === "production" ? process.env.CALLBACK_URL_PROD : process.env.CALLBACK_URL_DEV;
// DB
export const MONGO_URI = process.env.NODE_ENV === "production" ? process.env.MONGO_URI_PROD
    : process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_TEST;
// SSH
export const SSH_HOST = process.env.SSH_HOST;
export const SSH_USER = process.env.SSH_USER;
export const SSH_PASS = process.env.SSH_PASS;
export const SSH_DIR = process.env.SSH_DIR;