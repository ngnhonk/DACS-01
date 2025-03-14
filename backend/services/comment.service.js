const db = require("../config/database");

module.exports.getReply = async (req, res) => {
  let { parent_comment_id } = req.query;
  let comment = await db("comments as c")
    .join("users as u", "c.user_id", "u.id")
    .where("c.parent_comment_id", "=", parent_comment_id)
    .select("c.*", "u.username as username");
  return comment;
};

module.exports.getAllComments = async (req, res) => {
  let { post_id } = req.query;
  let comments = await db("comments as c")
    .join("users as u", "c.user_id", "u.id")
    .join("posts as p", "p.id", "c.post_id")
    .where("c.post_id", post_id)
    .andWhere("c.parent_comment_id", null)
    .select("c.*", "u.username as username");

  return comments;
};

module.exports.createComment = async (req, res) => {
  let user_id = req.user.id;
  let { post_id, parent_comment_id, content } = req.body;
  await db("comments").insert({ post_id, user_id, parent_comment_id, content });
  return;
};

module.exports.updateComment = async (req, res) => {
  let user_id = req.user.id;
  let { post_id, parent_comment_id, content } = req.body;
  await db("comments")
    .update({ post_id, user_id, parent_comment_id, content })
    .where({ id: req.params.id });
  return;
};

module.exports.deleteComment = async (req, res) => {
  await db("comments").where({ id: req.body.post_id }).del();
  return;
};
