import mongoose from "mongoose";

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.log("Failed to connect to the database" + err)
        process.exit(9);
    }
};

export default conn