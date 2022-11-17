const { registerUserService, checkUserExists, getUserById } = require("../services/user.service");
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken')


module.exports.registerUser = async (req, res, next) => {
    try {
        const newUser = req.body;

        if (newUser.password.length < 6 && newUser.confirmPassword.length < 5) {
            return res.status(200).send({
                success: false,
                message: 'Password must be more then 5 digit'
            })
        }

        if (newUser.password !== newUser.confirmPassword) {
            return res.status(200).send({
                success: false,
                message: 'Password does not matched'
            })
        }

        const userExists = await checkUserExists(newUser.email)
        if (userExists) {
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            })
        }

        const user = await registerUserService(newUser);
        res.status(200).send({
            success: true,
            message: 'User registered successfully',
            data: user
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message

        })
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const userData = req.body;

        const user = await checkUserExists(userData.email)
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "You dis not register yet"
            })
        }

        const comparePasswords = await bcrypt.compare(userData.password, user.password)
        if (!comparePasswords) {
            return res.status(200).send({
                success: false,
                message: 'Wrong Password'
            })
        }


        const id = user._id
        const token = generateToken({ id: id });
        const { password, ...userInfo } = user.toObject();

        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            data: { userInfo, token }
        })


    } catch (error) {
        res.status(401).send({
            success: false,
            message: "Something is wrong with your account",
        })
    }
}

module.exports.getCurrentUserById = async (req, res) => {
    try {
        const user = await getUserById(req.body.userId)
        console.log(req.body.userId);
        console.log(user);
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'User Does Not Exist'
            })
        }
        else {
            return res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: 'Error getting user info'
        })
    }
} 