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
router.route('/mark-all-as-seen').post(userControllers.MarkAllAsSeen)

module.exports = router
