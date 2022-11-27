const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/authMiddleware');



router.route('/get-all-users')
    .get(authMiddleware, adminController.getAllUsers)


router.route('/get-all-doctors')
    .get(authMiddleware, adminController.getAllDoctors)


module.exports = router