const app = require('./app')
const dotenv = require('dotenv').config()
const dbConnection = require('./config/dbConnection')

app.listen(process.env.PORT, () => {
  console.log('Server Running on : ', process.env.PORT)
})
