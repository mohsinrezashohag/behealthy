const Doctors = require('../models/doctorModel')
const Appointments = require('../models/appointmentModel')
const Users = require('../models/userModel')



module.exports.getDoctorAccountByUserId = async (req, res) => {
    try {
        const doctor = await Doctors.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: 'Doctor Account Found',
            data: doctor
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Doctor Account Not Found'
        })
    }
}


module.exports.updateDoctorProfile = async (req, res) => {
    try {

        const updateDoctor = await Doctors.findOneAndUpdate({ userId: req.body.userId }, req.body)
        res.status(200).send({
            success: true,
            message: 'Doctor Account updated successfully',
            data: updateDoctor
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Doctor Account updated failed',
        })
    }
}

module.exports.getDoctorAppointments = async (req, res) => {
    try {
        const userId = req.body.userId;
        const doctor = await Doctors.findOne({ userId: userId });
        const appointments = await Appointments.find({ doctorId: doctor._id })
        res.status(200).send({
            success: true,
            message: 'Appointments Loaded successfully',
            data: appointments
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Appointments Loaded failed',

        })
    }
}

module.exports.changeAppointmentStatus = async (req, res) => {
    try {
        const appointmentId = req.body.appointmentId;
        const status = req.body.status;
        const appointment = await Appointments.findOneAndUpdate({ _id: appointmentId }, { status: status });

        const user = await Users.findOne({ _id: appointment?.userId });

        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: "appointment-status-changed",
            message: `Your appointment status has been ${status}`,
            onClickPath: "/appointments",
        });
        const updateUser = await Users.findOneAndUpdate({ _id: appointment?.userId }, user)
        res.status(200).send({
            success: true,
            message: 'Appointments Updated successfully',
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: 'Appointments Updated failed',
        })
    }
}