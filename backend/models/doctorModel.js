const { default: mongoose } = require('mongoose')

const doctorSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  feePerConsultation: {
    type: String,
    required: true,
  },
  timings: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'approved'],
      messages: `input should be within the values : {values}`,
    },
    default: 'pending',
  },
}, {
  timestamps: true,
})

const doctorModel = mongoose.model('Doctors', doctorSchema)

module.exports = doctorModel
