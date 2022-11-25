const Users = require('../models/userModel')
const Doctors = require('../models/doctorModel')

module.exports.registerUserService = async (data) => {
  const user = await Users.create(data)
  return user
}
module.exports.checkUserExistsService = async (email) => {
  const user = await Users.findOne({ email: email })
  return user
}
module.exports.getUserByIdService = async (id) => {
  const user = await Users.findOne({ _id: id })
  return user
}

module.exports.createDoctorService = async (newDoctor) => {
  const doctor = Doctors.create(newDoctor)
  return doctor
}
module.exports.getAdminService = async () => {
  const admin = await Users.findOne({ isAdmin: true })
  return admin
}
module.exports.updateAdminService = async (
  adminUserId,
  unseenNotifications
) => {
  const res = await Users.findByIdAndUpdate(adminUserId, unseenNotifications)
  return res
}
