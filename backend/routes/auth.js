//backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @route  POST /api/auth/signup
// @desc   Register new user
// @access Public
router.post('/signup', async (req, res) => {
  const {username, email, password} = req.body;

  try { 
    // Check if user exists
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({ message: 'User already exists'});
    }

    // Create if new user if user doesn't exist
    user = new User({username, email, password});
    await user.save();
    // Create JWT
    const token = jwt.sign( {id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // respond with success code and user data
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route POST /api/auth/login
// @desc Authenticate user & get token
// @access Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    //Check if user exists 
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }
    // Check the password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'});
    }
    // Create JWT
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })
    // respond with token and user details
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
});

module.exports = router;