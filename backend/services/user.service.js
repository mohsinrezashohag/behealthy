const Users = require('../models/userModel')

module.exports.registerUserService = async (data) => {
    const user = await Users.create(data)
    return user;
}
module.exports.checkUserExists = async (email) => {
    const user = Users.findOne({ email: email })
    return user
}
