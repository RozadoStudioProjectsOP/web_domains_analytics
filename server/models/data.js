
import mongoose from "mongoose";

const wordCloudSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true,
    },
    words: {
        type: Object,
    },
    scrapeDate: {
        type: Date,
    },
    expired: {
        tpye: Boolean
    }
}, {
    collection: 'wordClouds' // specify the collection name here
});

export default mongoose.model("wordClouds", wordCloudSchema);