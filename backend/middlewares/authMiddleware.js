// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Get the token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID (from decoded token) and attach it to request object
      req.user = await User.findById(decoded.id).select("-password");

      // Call next middleware
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
