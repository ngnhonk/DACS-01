const services = require('../services/category.service');


module.exports.getAllCategories = async (req,res)=>{
    try {
        let categories = await services.getAllCategories(req,res);
        res.json({
            message: "All categories",
            categories: categories
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getOneCategory = async (req,res)=>{
    try {
        let categories = await services.getOneCategory(req,res);
        res.json({
            message: "Category",
            categories: categories
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.createCategory = async (req, res) => {
    try {
        let added = await services.createCategory(req, res);
        res.json({
            message: `Added category successfully`,
            id: added
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.udpateCategory = async (req, res) => {
    try {
        await services.updateCategory(req, res);
        res.json({
            message: `Updated category successfully`,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        await services.deleteCategory(req, res);
        res.json({
            message: `Deleted category successfully`,
        })
    } catch (error) {
        console.log(error);
    }
}