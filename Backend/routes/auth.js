const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const payload = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    const queryParams = new URLSearchParams({
      token,
      id : req.user._id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
    }).toString();
    
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?${queryParams}`);
    
  }
);

module.exports = router;
