const express = require('express')
const app = express()
const cors = require('cors')

// middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Working Fine')
})

const userRoutes = require('./routes/user.routes')
const adminRoutes = require('./routes/admin.routes')

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/admin', adminRoutes)

module.exports = app
