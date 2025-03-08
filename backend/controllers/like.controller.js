const services = require('../services/like.service');


module.exports.countLikes = async (req, res) => {
    try {
        let count = await services.countLikes(req);
        res.json({
            message: "Total likes",
            data: count
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.toggleLikePost = async (req, res) => {
    try {
        await services.toggleLikePost(req,res);
        res.json({message: "Toggle like post successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.toggleLikeComment = async (req, res) => {
    try {
        await services.toggleLikeComment(req,res);
        res.json({message: "Toggle like comment successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};