const {
  registerUserService,
  getUserByIdService,
  createDoctorService,
  checkUserExistsService,
  updateAdminService,
  getAdminService,
  markAllAsSeenService,
  deleteAllNotificationService,
} = require('../services/user.service')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

module.exports.registerUser = async (req, res, next) => {
  try {
    const newUser = req.body

    if (newUser.password.length < 6 && newUser.confirmPassword.length < 5) {
      return res.status(200).send({
        success: false,
        message: 'Password must be more then 5 digit',
      })
    }

    if (newUser.password !== newUser.confirmPassword) {
      return res.status(200).send({
        success: false,
        message: 'Password does not matched',
      })
    }

    const userExists = await checkUserExistsService(newUser.email)
    if (userExists) {
      return res.status(200).send({
        success: false,
        message: 'User already exists',
      })
    }

    const user = await registerUserService(newUser)
    res.status(200).send({
      success: true,
      message: 'User registered successfully',
      data: user,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    })
  }
}

module.exports.loginUser = async (req, res) => {
  try {
    const userData = req.body

    const user = await checkUserExistsService(userData.email)
    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'You did not register yet',
      })
    }

    const comparePasswords = await bcrypt.compare(
      userData.password,
      user.password
    )
    if (!comparePasswords) {
      return res.status(200).send({
        success: false,
        message: 'Wrong Credentials',
      })
    }

    const id = user._id
    const token = generateToken({ id: id })
    const { password, ...userInfo } = user.toObject()

    res.status(200).send({
      success: true,
      message: 'User logged in successfully',
      data: { userInfo, token },
    })
  } catch (error) {
    res.status(401).send({
      success: false,
      message: 'Something is wrong with your account',
    })
  }
}

module.exports.getCurrentUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.body.userId)
    if (!user) {
      return res.status(200).send({
        success: false,
        message: 'User Does Not Exist',
      })
    } else {
      const { password, ...userInfos } = user.toObject()
      return res.status(200).send({
        success: true,
        data: userInfos,
      })
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: 'Error getting user info',
    })
  }
}

module.exports.applyDoctorAccount = async (req, res, next) => {
  try {
    console.log('hitting here')
    const newDoctor = req.body
    const doctor = await createDoctorService(newDoctor)
    const adminUser = await getAdminService()

    const unseenNotifications = adminUser.unseenNotifications

    unseenNotifications.push({
      type: 'Doctor Account Request',
      message: `${doctor?.firstName + ' ' + doctor?.lastName} has requested for Doctor Account`,
      data: {
        doctorId: doctor?._id,
        doctorName: doctor?.firstName + ' ' + doctor?.lastName,
      },
      onClickPath: '/admin/doctors',
    })

    await updateAdminService(adminUser._id, { unseenNotifications })

    res.status(200).send({
      success: true,
      message: 'Doctor Account Requested Successfully',
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Some thing Wrong in backend',
    })
  }
}


module.exports.markAllAsSeen = async (req, res) => {
  try {

    console.log("hitting mark all as read");
    const userId = req.body.userId;
    const updatedUser = await markAllAsSeenService(userId);

    res.status(200).send({
      success: true,
      message: "Marked all as seen",
      data: updatedUser
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Marked all as seen not working"
    })
  }
}



module.exports.deleteAllNotification = async (req, res) => {
  try {
    console.log("delete hitting");
    const userId = req.body.userId;
    const updatedUser = await deleteAllNotificationService(userId);
    res.status(200).send({
      success: true,
      message: "Deleted All Notifications",
      data: updatedUser
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Failed to delete all notifications"
    })
  }
}