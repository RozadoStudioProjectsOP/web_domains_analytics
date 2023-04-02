import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    domain: {
        type: String,
        unique: true,
        required: true,
    },
    URL: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    scrapeDate: {
        type: Date,
    }
}, {
    collection: 'Words' // specify the collection name here
});

export default mongoose.model("data", dataSchema);