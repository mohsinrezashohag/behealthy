const app = require('./app');
const dbConnection = require('./config/dbConnection.js');
const dotenv = require('dotenv').config()



app.listen(process.env.PORT, () => {
    console.log("Server Running on : ", process.env.PORT);
})