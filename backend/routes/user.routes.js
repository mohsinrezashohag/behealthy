const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/user.controller')
const authMiddleware = require('../middleware/authMiddleware')

router.route('/register').post(userControllers.registerUser)
router.route('/login').post(userControllers.loginUser)

router
  .route('/get-user-by-id')
  .post(authMiddleware, userControllers.getCurrentUserById)

router.route('/apply-doctor-account').post(userControllers.applyDoctorAccount)

module.exports = router
