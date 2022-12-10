const { default: mongoose } = require('mongoose')


const appointmentSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    userInfo: {
        type: Object,
        required: true,
    },
    doctorInfo: {
        type: Object,
        required: true,

    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        required: true
    }
}, {
    timestamps: true
})

const appointmentModel = mongoose.model('Appointments', appointmentSchema)

module.exports = appointmentModel