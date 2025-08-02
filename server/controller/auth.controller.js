import { Auth } from "../models/auth.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, bio, password } = req.body;

        if (!name || !email || !bio || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await Auth.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await Auth.create({ name, email, bio, password });

        generateToken(newUser._id, res);

        res.status(201).json({ message: "User registered successfully", data: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await Auth.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res);

        res.status(200).json({ message: "Login successful", data: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({ message: "User is authenticated", data: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}