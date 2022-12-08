const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const doctorControllers = require('../controllers/doctor.controller')


router.route('/get-doctor-account-by-userId')
    .get(authMiddleware, doctorControllers.getDoctorAccountByUserId)

router.route('/update-doctor-profile')
    .post(authMiddleware, doctorControllers.updateDoctorProfile)

router.route('/get-appointments-by-doctor-id')
    .get(authMiddleware, doctorControllers.getDoctorAppointments)

router.route('/change-appointment-status')
    .post(authMiddleware, doctorControllers.changeAppointmentStatus)

module.exports = router