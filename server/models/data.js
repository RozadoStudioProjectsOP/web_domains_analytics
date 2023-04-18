
import mongoose from "mongoose";

const wordCloudSchema = new mongoose.Schema({
    domain: {
        type: String,
        unique: true,
        required: true,
    },
    words: {
        type: Object,
    },
    scrapeDate: {
        type: Date,
    }
}, {
    collection: 'wordClouds' // specify the collection name here
});

export default mongoose.model("wordClouds", wordCloudSchema);