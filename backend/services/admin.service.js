const Users = require('../models/userModel')
const Doctors = require('../models/doctorModel')

module.exports.getAllUsersService = async () => {
    const users = await Users.find({})
    return users
}
module.exports.getAllDoctorsService = async () => {
    const doctors = await Doctors.find({})
    return doctors
}