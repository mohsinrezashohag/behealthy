const Users = require('../models/userModel')

module.exports.registerUserService = async (data) => {
    const user = await Users.create(data)
    return user;
}
module.exports.checkUserExists = async (email) => {
    const user = await Users.findOne({ email: email })
    return user
}
module.exports.getUserById = async (id) => {
    const user = await Users.findOne({ _id: id })
    return user
}