const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]

    jwt.verify(token, process.env.USER_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: 'Auth Failed',
        })
      } else {
        req.body.userId = decoded.id
        next()
      }
    })
  } catch (error) {}
}
