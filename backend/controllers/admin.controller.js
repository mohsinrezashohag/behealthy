const { getAllUsersService, getAllDoctorsService } = require("../services/admin.service");

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const res = await getAllUsersService();
        if (res) {
            res.status(200).send({
                success: true,
                message: "Users Loaded Successfully",
                data: res.data
            })
        }


    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Users Loaded failed",
        })
    }
}

module.exports.getAllDoctors = async () => {
    try {
        const res = await getAllDoctorsService();
        res.status(200).send({
            success: true,
            message: "Doctors Loaded Successfully",
            data: res
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Doctors Loaded failed",
        })
    }
}