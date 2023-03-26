import mongoose from "mongoose";

const conn = async () => {
    const MONGO_URI = process.env.NODE_ENV === "production" ? process.env.MONGO_URI_PROD
    : process.env.NODE_ENV === "development" ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_TEST;
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Connected to the ${process.env.NODE_ENV} database`);
    } catch (err) {
        console.log("Failed to connect to the database" + err)
        process.exit(9);
    }
};

export default conn