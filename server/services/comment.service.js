const db = require("../config/database");

module.exports.getReply = async (req) => {
  let { parent_comment_id } = req.query;
  let comment = await db("comments as c")
    .join("users as u", "c.user_id", "u.id")
    .where("c.parent_comment_id", "=", parent_comment_id)
    .select("c.*", "u.username as username");
  return comment;
};

module.exports.getAllComments = async (req) => {
  let { post_id } = req.query;
  let comments = await db("comments as c")
    .join("users as u", "c.user_id", "u.id")
    .join("posts as p", "p.id", "c.post_id")
    .where("c.post_id", post_id)
    .andWhere("c.parent_comment_id", null)
    .select("c.*", "u.username as username");

  return comments;
};

module.exports.createComment = async (req) => {
  let user_id = req.user.id;
  let { content } = req.body;
  let post_id = req.params.id;
  await db("comments").insert({ post_id, user_id, content });
  return;
};

module.exports.createReply = async (req) => {
  let user_id = req.user.id;
  let { content } = req.body;
  let post_id = req.params.postId;
  let parent_comment_id = req.params.commentId;
  await db("comments").insert({ post_id, user_id, parent_comment_id, content });
  return;
};

module.exports.updateComment = async (req) => {
  let user_id = req.user.id;
  let { post_id, content } = req.body;
  await db("comments")
    .update({ post_id, content })
    .where({ id: req.params.id });
  return;
};

module.exports.deleteComment = async (req) => {
  await db("comments").where({ id: req.params.id }).del();
  return;
};

module.exports.getCommentsByUser = async (req) => {
  let user_id = req.user.id;
  let comments = await db("comments as c")
    .join("posts as p", "c.post_id", "p.id")
    .leftJoin("comments as parent", "c.parent_comment_id", "parent.id")
    .select(
      "c.*",
      "p.title as post_title",
      "c.parent_comment_id as parent",
      db.raw("COALESCE(parent.content, '') as parent_content")
    )
    .where("c.user_id", user_id);

  return comments;
};
