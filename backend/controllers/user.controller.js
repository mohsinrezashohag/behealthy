const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')
const Users = require('../models/userModel')
const Doctors = require('../models/doctorModel')
const Appointments = require('../models/appointmentModel')
const moment = require('moment')


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

    const userExists = await Users.findOne({ email: newUser.email })
    if (userExists) {
      return res.status(200).send({
        success: false,
        message: 'User already exists',
      })
    }

    const user = await Users.create(newUser)

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
    const user = await Users.findOne({ email: userData.email })
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
    const userId = req.body.userId;
    const user = await Users.findOne({ _id: userId })

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

    const newDoctor = req.body
    const doctor = await Doctors.create(newDoctor)

    const adminUser = await Users.findOne({ isAdmin: true })

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


    const updateAdmin = await Users.findByIdAndUpdate(adminUser._id, { unseenNotifications })

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

    const userId = req.body.id;
    const user = await Users.findOne({ _id: userId })
    const unseenNotifications = user.unseenNotifications;
    const oldSeenNotifications = user.seenNotifications;
    oldSeenNotifications.push(...unseenNotifications)
    user.unseenNotifications = [],
      user.seenNotifications = oldSeenNotifications;

    const updatedUser = await Users.findByIdAndUpdate(userId, user)

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

    const userId = req.body.userId;

    const user = await Users.findOne({ _id: userId })
    user.seenNotifications = [];
    const updatedUser = await Users.findByIdAndUpdate(userId, user);

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


module.exports.getAllApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctors.find({ status: 'approved' })
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






module.exports.getDoctorAccountById = async (req, res) => {
  try {
    const doctor = await Doctors.findOne({ _id: req.body.doctorId });
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


module.exports.bookAppointment = async (req, res) => {
  try {
    const appointment = req.body;
    appointment.date = moment(req.body.date, 'DD:MM:YYYY').toISOString()
    appointment.time = moment(req.body.time, 'HH:mm').toISOString()
    appointment.status = 'pending'
    const newAppointment = await Appointments.create(appointment);



    const user = await Users.findOne({ _id: newAppointment?.doctorInfo?.userId });

    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: `New appointment request from ${appointment?.userInfo.name}`,
      message: "You have a new appointment request",
      onClickPath: "/doctor/appointments"
    })


    const updateUser = await Users.findOneAndUpdate({ _id: newAppointment?.doctorInfo?.userId }, user)

    res.status(200).send({
      success: true,
      message: 'Appointment Requested Successfully',
      data: newAppointment,
    })
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Appointment Request Failed'

    })
  }
}


module.exports.checkAvailability = async (req, res) => {
  try {

    const date = moment(req.body.date, 'DD:MM:YYYY').toISOString()
    const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
    const toTime = moment(req.body.time, 'DD:MM:YYYY').add(1, 'hours')

    const doctorId = req.body.doctorId;

    const appointments = await Appointments.find({ date: date, doctorId: doctorId, time: { $gte: fromTime, $lte: toTime } })

    if (appointments.length > 0) {
      res.status(200).send({
        success: false,
        message: 'Schedule Not Available'
      })
    }
    else {
      res.status(200).send({
        success: true,
        message: 'Schedule Available'
      })
    }

  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Internal Server error',

    })
  }
}






module.exports.getAppointmentsById = async (req, res) => {
  try {
    const userId = req.body.userId;
    const appointments = await Appointments.find({ userId: userId });
    res.status(200).send({
      message: "Appointments loaded successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Appointments Loaded failed",
    })
  }
}