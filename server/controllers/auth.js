import User from "../models/user.js"
import getTokenUserData from "../utils/getTokenUserData.js"
import { attachCookiesToResponse } from "../utils/jwt.js"

const register = async (req, res) => {
    try {
        if (req.body.role === "admin") {
            return res.status(401).json({
              msg: "Not authorized to register as an admin",
            });
        }
        const user = await User.create(req.body);
        const tokenUser = getTokenUserData(user);
        return res.status(201).json({ success: true, data: tokenUser, msg: "Registered" });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || "Something went wrong while registering a user.",
        });
    }
}

const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = !username
        ? await User.findOne({ email })
        : await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ success: false, msg: "User not found"});
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, msg: "Invalid password" });
        }

        const token = user.createJWT()
        const tokenUser = getTokenUserData(user)
        attachCookiesToResponse({ res, user: tokenUser })

        return res.status(201).json({ 
            success: true, 
            data: tokenUser,
            token: token,
            msg: "Logged in",
        });
    } catch (err) {
        return res.status(500).json({
            msg: err.message || "Something went wrong while logging in a user.",
        })
    }
}

const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now() +1000),
    })
    return res.status(200).json({ success: true, msg: "Logged out" });
}

export { register, login, logout }