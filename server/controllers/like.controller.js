const services = require("../services/like.service");

module.exports.countPostLikes = async (req, res) => {
  try {
    let count = await services.countPostLikes(req);
    res.json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports.countCommentLikes = async (req, res) => {
  try {
    let count = await services.countCommentLikes(req);
    res.json({
      message: "Total likes",
      data: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.toggleLikePost = async (req, res) => {
  try {
    await services.toggleLikePost(req, res);
    res.json({ message: "Toggle like post successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.toggleLikeComment = async (req, res) => {
  try {
    await services.toggleLikeComment(req, res);
    res.json({ message: "Toggle like comment successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.checkLikeStatus = async (req, res) => {
  try {
    let status = await services.checkLikeStatus(req,res);
    res.json(status) ;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
