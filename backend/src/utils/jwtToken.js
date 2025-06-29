const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET, // Make sure this exists in your .env
        { expiresIn: "7d" } // You can change this to "1h", "30m", etc. if needed
    );
};

module.exports = { generateAccessToken };