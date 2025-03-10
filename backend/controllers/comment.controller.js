const services = require('../services/comment.service');

module.exports.getAllComments = async (req, res) => {
    try {
        let comments = await services.getAllComments(req, res);
        res.json({
            message: "Get all comments",
            comments: comments
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports.getOneComment = async (req, res) => {
    try {
        let comment = await services.getOneComment(req, res);
        res.json({
            message: "Get one comment",
            comment: comment
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports.createComment = async (req, res) => {
    try {
        await services.createComment(req, res);
        res.json({
            message: "Created one comment",
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        await services.updateComment(req, res);
        res.json({
            message: "Updated one comment",
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        await services.deleteComment(req, res);
        res.json({
            message: "Deleted one comment",
        });

    } catch (error) {
        console.log(error);
    }
}