var jwt = require('jsonwebtoken');

// node>crypto.randomBytes(64).toString('hex')

const generateToken = (user) => {
    return jwt.sign(user, process.env.USER_SECRET_KEY, { expiresIn: '7days' });
}

module.exports = generateToken