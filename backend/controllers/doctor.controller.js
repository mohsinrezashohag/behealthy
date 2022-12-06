const Doctors = require('../models/doctorModel')



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