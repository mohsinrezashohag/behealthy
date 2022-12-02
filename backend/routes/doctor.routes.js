const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const doctorControllers = require('../controllers/doctor.controller')


router.route('/get-doctor-account-by-userId')
    .get(authMiddleware, doctorControllers.getDoctorAccountByUserId)

router.route('/update-doctor-profile')
    .post(authMiddleware, doctorControllers.updateDoctorProfile)

module.exports = router