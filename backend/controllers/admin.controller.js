const Users = require('../models/userModel')
const Doctors = require('../models/doctorModel')

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find({})
        res.status(200).send({
            message: "Users fetched successfully",
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Users fetched failed",
        })
    }
}

module.exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctors.find({})
        res.status(200).send({
            message: "Doctors fetched successfully",
            success: true,
            data: doctors,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Doctors Loaded failed",
        })
    }
}


module.exports.updateDoctorAccountStatus = async (req, res) => {
    try {
        const { doctorId, status } = req.body;

        const doctor = await Doctors.findByIdAndUpdate(doctorId, {
            status: status,
        });

        const user = await Users.findOne({ _id: doctor?.userId });


        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request-changed",
            message: `Your doctor account has been ${status}`,
            onClickPath: "/notifications",
        });
        user.isDoctor = status === "approved" ? true : false;
        await Users.findOneAndUpdate({ _id: doctor?.userId }, user)

        res.status(200).send({
            message: "Doctor status updated successfully",
            success: true,
            data: doctor,
        });
    } catch (error) {
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
}