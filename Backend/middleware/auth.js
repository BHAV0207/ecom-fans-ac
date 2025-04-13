const jwt = require("jsonwebtoken");
const passport = require("passport");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
};

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const payload = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    const queryParams = new URLSearchParams({
      token,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
    }).toString();
    
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?${queryParams}`);
    
  }
);

module.exports = {
  protect,
  authorize,
  router,
};
