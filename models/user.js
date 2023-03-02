import mongoose from "mongoose";

const roles = ["user", "admin"];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        enum: roles,
        default: "user",
    },
});

export default mongoose.model("users", userSchema);