const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Must be an valid email'],
    },
    password: {
      type: String,
      required: true,
      // validate: {
      //     validator: (value) => {
      //         validator.isStrongPassword(value, {
      //             minLength: 8,
      //             minLowercase: 1,
      //             minUppercase: 1,
      //             minNumbers: 1
      //         })
      //     },
      //     messages: 'password  is not strong enough'
      // }
    },
    confirmPassword: {
      type: String,
      required: true,
      // validate: {
      //     validator: function (value) {
      //         return value = this.password
      //     },
      //     messages: 'password is not matched'
      // }
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  this.confirmPassword = undefined
  next()
})

const userMOdel = mongoose.model('Users', userSchema)
module.exports = userMOdel
