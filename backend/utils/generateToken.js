var jwt = require('jsonwebtoken');

module.exports.generateToken = (userId) => {
    return jwt.sign(userId, process.env.USER_SECRET_KEY, { expiresIn: '7days' });
}
