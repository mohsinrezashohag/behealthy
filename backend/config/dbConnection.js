const { default: mongoose } = require("mongoose")
require('dotenv').config();



mongoose.connect(process.env.DB)

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log("MongoDB & Mongoose  connected");
})

connection.on('error', (error) => {
    console.log("Mongo db connection failed : ", error);
})


module.exports = mongoose;