const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controller');

router.route('/register')
    .post(userControllers.registerUser)


module.exports = router;