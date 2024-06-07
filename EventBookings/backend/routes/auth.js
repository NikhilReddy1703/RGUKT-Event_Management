// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    const stu = await Student.findOne({username});
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isAdmin = username[0].toLowerCase() === 'a';
    console.log(isAdmin);
    res.status(200).json({ isAdmin , stu });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
