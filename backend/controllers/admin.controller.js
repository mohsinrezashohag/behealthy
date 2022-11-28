const { getAllUsersService, getAllDoctorsService } = require("../services/admin.service");


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService()
        res.status(200).send({
            message: "Doctors fetched successfully",
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Users Loaded failed",
        })
    }
}

module.exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await getAllDoctorsService();
        res.status(200).send({
            message: "Doctors fetched successfully",
            success: true,
            data: doctors,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Doctors Loaded failed",
        })
    }
}