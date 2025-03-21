const db = require("../config/database");

module.exports.getAllPosts = async (req) => {
  let posts = db("posts as p")
    .join("users as u", "p.user_id", "u.id")
    .select("p.*", "u.username as author");
  return posts;
};

module.exports.getOnePost = async (req) => {
  let posts = db("posts").select("*").where({ id: req.body.id });
  return posts;
};

module.exports.createPost = async (req) => {
  let user_id = req.user.id;
  let { category_id, title, content, image_url, views, is_pinned, is_locked } =
    req.body;
  await db("posts").insert({
    user_id,
    category_id,
    title,
    content,
    image_url,
    views,
    is_pinned,
    is_locked,
  });
  return;
};

module.exports.updatePost = async (req) => {
  let { title, content } = req.body;
  await db("posts")
    .update({
      title,
      content,
    })
    .where({ id: req.params.postId });
  return;
};

module.exports.deletePost = async (req) => {
  await db("posts").where({ id: req.body.id }).del();
  return;
};

module.exports.pinPost = async (req) => {
  const { post_id } = req.body;
  const post = await db("posts").where({ post_id }).first();
  const newStatus = post.is_pinned ? 0 : 1;
  await db("posts").where({ id }).update({ is_pinned: newStatus });
};

module.exports.lockPost = async (req) => {
  const { post_id } = req.body;
  const post = await db("posts").where({ post_id }).first();
  const newStatus = post.is_locked ? 0 : 1;
  await db("posts").where({ id }).update({ is_locked: newStatus });
};

module.exports.getFormattedPost = async (req) => {
  let { postId } = req.params;
  const rawData = await db("posts as p")
    .leftJoin("users as u", "p.user_id", "u.id")
    .leftJoin("comments as c", "c.post_id", "p.id")
    .leftJoin("users as cu", "c.user_id", "cu.id")
    .where("p.id", postId)
    .select(
      "p.id as post_id",
      "p.title",
      "p.content",
      "u.id as user_id",
      "u.username",
      "c.id as comment_id",
      "c.content as comment_content",
      "c.parent_comment_id",
      "cu.id as comment_user_id",
      "cu.username as comment_username"
    )
    .orderBy("c.parent_comment_id", "asc");

  const post = {
    id: rawData[0].post_id,
    title: rawData[0].title,
    content: rawData[0].content,
    user: {
      id: rawData[0].user_id,
      username: rawData[0].username,
    },
    comments: [],
  };

  const commentMap = {};

  rawData.forEach((row) => {
    if (!row.comment_id) return;

    const comment = {
      id: row.comment_id,
      content: row.comment_content,
      user: {
        id: row.comment_user_id,
        username: row.comment_username,
      },
      replies: [],
    };

    commentMap[comment.id] = comment;

    if (row.parent_comment_id === null) {
      post.comments.push(comment);
    } else {
      commentMap[row.parent_comment_id].replies.push(comment);
    }
  });

  return post;
};

module.exports.getAllFormattedPosts = async () => {
  const rawData = await db("posts as p")
    .leftJoin("users as u", "p.user_id", "u.id")
    .leftJoin("comments as c", "c.post_id", "p.id")
    .leftJoin("users as cu", "c.user_id", "cu.id")
    .select(
      "p.id as post_id",
      "p.title",
      "p.content",
      "p.category_id as categoryId",
      "u.id as user_id",
      "u.username",
      "c.id as comment_id",
      "c.content as comment_content",
      "c.parent_comment_id",
      "cu.id as comment_user_id",
      "cu.username as comment_username"
    )
    .orderBy("c.parent_comment_id", "asc");

  const postMap = {};
  const commentMap = {};

  rawData.forEach((row) => {
    if (!postMap[row.post_id]) {
      postMap[row.post_id] = {
        id: row.post_id,
        title: row.title,
        content: row.content,
        categoryId: row.categoryId,
        user: {
          id: row.user_id,
          username: row.username,
        },
        comments: [],
      };
    }

    if (row.comment_id) {
      const comment = {
        id: row.comment_id,
        content: row.comment_content,
        user: {
          id: row.comment_user_id,
          username: row.comment_username,
        },
        replies: [],
      };

      commentMap[comment.id] = comment;

      if (row.parent_comment_id === null) {
        postMap[row.post_id].comments.push(comment);
      } else {
        if (commentMap[row.parent_comment_id]) {
          commentMap[row.parent_comment_id].replies.push(comment);
        } else {
          console.warn(
            `Parent comment ${row.parent_comment_id} not found yet for comment ${row.comment_id}`
          );
        }
      }
    }
  });

  return Object.values(postMap);
};

module.exports.getPostsByUser = async (req) => {
  const rawData = await db("posts as p")
    .leftJoin("users as u", "p.user_id", "u.id")
    .leftJoin("comments as c", "c.post_id", "p.id")
    .leftJoin("users as cu", "c.user_id", "cu.id")
    .where("p.user_id", "=", req.user.id)
    .select(
      "p.id as post_id",
      "p.title",
      "p.content",
      "u.id as user_id",
      "u.username",
      "c.id as comment_id",
      "c.content as comment_content",
      "c.parent_comment_id",
      "cu.id as comment_user_id",
      "cu.username as comment_username"
    )
    .orderBy("c.parent_comment_id", "asc");

  const postMap = {};
  const commentMap = {};

  rawData.forEach((row) => {
    if (!postMap[row.post_id]) {
      postMap[row.post_id] = {
        id: row.post_id,
        title: row.title,
        content: row.content,
        user: {
          id: row.user_id,
          username: row.username,
        },
        comments: [],
      };
    }

    if (row.comment_id) {
      const comment = {
        id: row.comment_id,
        content: row.comment_content,
        user: {
          id: row.comment_user_id,
          username: row.comment_username,
        },
        replies: [],
      };

      commentMap[comment.id] = comment;

      if (row.parent_comment_id === null) {
        postMap[row.post_id].comments.push(comment);
      } else {
        if (commentMap[row.parent_comment_id]) {
          commentMap[row.parent_comment_id].replies.push(comment);
        } else {
          console.warn(
            `Parent comment ${row.parent_comment_id} not found yet for comment ${row.comment_id}`
          );
        }
      }
    }
  });

  return Object.values(postMap);
};

module.exports.getPostsByCategory = async (req) => {
  let category_id = req.params.categoryId;
  const rawData = await db("posts as p")
    .leftJoin("users as u", "p.user_id", "u.id")
    .leftJoin("comments as c", "c.post_id", "p.id")
    .leftJoin("users as cu", "c.user_id", "cu.id")
    .where({ category_id })
    .select(
      "p.id as post_id",
      "p.title",
      "p.content",
      "u.id as user_id",
      "u.username",
      "c.id as comment_id",
      "c.content as comment_content",
      "c.parent_comment_id",
      "cu.id as comment_user_id",
      "cu.username as comment_username"
    )
    .orderBy("c.parent_comment_id", "asc");

  const postMap = {};
  const commentMap = {};

  rawData.forEach((row) => {
    if (!postMap[row.post_id]) {
      postMap[row.post_id] = {
        id: row.post_id,
        title: row.title,
        content: row.content,
        user: {
          id: row.user_id,
          username: row.username,
        },
        comments: [],
      };
    }

    if (row.comment_id) {
      const comment = {
        id: row.comment_id,
        content: row.comment_content,
        user: {
          id: row.comment_user_id,
          username: row.comment_username,
        },
        replies: [],
      };

      commentMap[comment.id] = comment;

      if (row.parent_comment_id === null) {
        postMap[row.post_id].comments.push(comment);
      } else {
        if (commentMap[row.parent_comment_id]) {
          commentMap[row.parent_comment_id].replies.push(comment);
        } else {
          console.warn(
            `Parent comment ${row.parent_comment_id} not found yet for comment ${row.comment_id}`
          );
        }
      }
    }
  });

  return Object.values(postMap);
};

module.exports.updatePostCategory = async (req) => {
  let { post_id, category_id } = req.body;
  await db("posts").update({ category_id }).where({ id: post_id });
  return;
};
