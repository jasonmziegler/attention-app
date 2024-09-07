// backend/routes/user.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;