import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// =======================
// SIGNUP
// =======================
export const signup = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        // 1️⃣ Basic validation
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 2️⃣ Normalize email
        email = email.toLowerCase();

        // 3️⃣ Check existing user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 4️⃣ Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // 5️⃣ Save user
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
    message: "User created successfully",
    user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
    },
});


    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// =======================
// LOGIN
// =======================
export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // 1️⃣ Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        // 2️⃣ Normalize email
        email = email.toLowerCase();

        // 3️⃣ Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 4️⃣ Compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 5️⃣ Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
