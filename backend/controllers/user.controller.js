const { registerUserService, checkUserExists } = require("../services/user.service");

module.exports.registerUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const userExists = checkUserExists(newUser.email)

        if (userExists) {
            return res.status(400).json({
                status: 'failed',
                message: 'User already exists'
            })
        }

        const user = registerUserService(newUser);
        res.status(200).json({
            status: 'success',
            message: 'User registered successfully',
            data: user
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'User registered failed'

        })
    }
}

