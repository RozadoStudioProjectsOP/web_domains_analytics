import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

userSchema.pre("save", async function () {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
  })
  
  userSchema.methods.comparePassword = function (password) {
    return bcryptjs.compare(password, this.password)
  }
  
  userSchema.methods.createJWT = function () {
    return jwt.sign(
      { userId: this._id, name: this.username, role: this.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    )
  }

export default mongoose.model("users", userSchema);