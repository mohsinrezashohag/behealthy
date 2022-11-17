var jwt = require('jsonwebtoken');

module.exports.generateToken = (id) => {
    return jwt.sign(id, process.env.USER_SECRET_KEY, { expiresIn: '7days' });
}
