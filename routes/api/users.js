const express = require('express');
const router = express.Router();
const User = require('../../models/User');


router.get('/test', (req, res) => res.json({msg: 'User works'}));

// @route POST/api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  
})

module.exports = router;