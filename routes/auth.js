const express = require('express');
const router = express.Router();
const passport = require('passport');

// 42 OAuth login route
router.get('/42', passport.authenticate('42'));

// 42 OAuth callback route
router.get('/42/callback', 
  passport.authenticate('42', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;