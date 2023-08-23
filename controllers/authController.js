const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Don't forget to import jwt

class Auth {
    async login(req, res) {
        const {
            email,
            password
        } = req.body;

        try {
            const user = await User.findOne({
                email: email
            });

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Verify password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: "Invalid password"
                });
            }

            // Create token
            
            const token = jwt.sign({
                user: user
            }, process.env.TOKEN_SECRET);
            res.header("Authorization", `Bearer ${token}`).json({
                message: "Login successful",
                token: token,
            });
        } catch (error) {
            res.status(400).json({
                message: "Login failed",
                error: error.message
            });
        }
    }

    async logout(req, res) {
        res.header("Authorization", "").json({
            message: "Logout successful"
        });
    }
}

module.exports = new Auth();