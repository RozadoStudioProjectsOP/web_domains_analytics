import User from "../models/user.js"

const register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({ success: true, data: user, msg: "Registered" });

    } catch (err) {
        return res.status(500).json({
            msg: err.message || "Something went wrong while registering a user.",
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, msg: "Invalid email "});
        }

        return res.status(201).json({ success: true, msg: "Logged in" });
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