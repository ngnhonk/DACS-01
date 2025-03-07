const services = require('../services/user.service');

module.exports.getInformation = async (req, res) => {
    try {
        const user = await services.getInformation(req);
        res.json(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports.changeInformation = async (req, res) => {
    try {
        await services.changeInformation(req, res);
        res.json({
            message: "Updated your information"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteUser = async (req,res)=>{
    try {
        await services.deleteUser(req,res);
        res.json({
            message: "BYE~!!?"
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.changePassword = async (req,res)=>{
    try {
        await services.changePassword(req,res);
        res.json({
            message: "Updated your password successfully!"
        })
    } catch (error) {
        console.log(error);
    }
}