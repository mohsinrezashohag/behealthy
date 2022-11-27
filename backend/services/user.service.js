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
module.exports.updateAdminService = async (adminUserId, unseenNotifications) => {
  const res = await Users.findByIdAndUpdate(adminUserId, unseenNotifications)
  return res
}



module.exports.markAllAsSeenService = async (userId) => {
  const user = await Users.findOne({ _id: userId })
  console.log("old user :", user);

  const unseenNotifications = user.unseenNotifications;
  const seenNotifications = user.seenNotifications;

  seenNotifications.push(...unseenNotifications)

  user.unseenNotifications = [],
    user.seenNotifications = seenNotifications;
  const update = user;
  console.log("user update :", update);
  const updatedUser = await Users.findByIdAndUpdate(user._id, update)
  console.log(updatedUser);
  console.log("updated user :", updatedUser);
  return updatedUser;

}

module.exports.deleteAllNotificationService = async (userId) => {
  const user = await Users.findOne({ _id: userId })
  user.seenNotifications = [];
  const updatedUser = await Users.findByIdAndUpdate(user._id, user)
  return updatedUser
}