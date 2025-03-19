const services = require("../services/post.service");

module.exports.getAllPosts = async (req, res) => {
  try {
    let posts = await services.getAllPosts(req);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getPostsByCategory = async (req, res) => {
  try {
    let posts = await services.getPostsByCategory(req);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getOnePost = async (req, res) => {
  try {
    let post = await services.getOnePost(req);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

module.exports.createPost = async (req, res) => {
  try {
    await services.createPost(req);
    res.json({ message: "Create a new post successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updatePost = async (req, res) => {
  try {
    await services.updatePost(req);
    res.json({ message: "Updated post successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    await services.deletePost(req);
    res.json({ message: "Deleted post successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.pinPost = async (req, res) => {
  try {
    await services.pinPost(req);
    res.json({ message: "Toggle pin status successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.lockPost = async (req, res) => {
  try {
    await services.lockPost(req);
    res.json({ message: "Toggle lock status successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFormattedPost = async (req, res) => {
  try {
    let posts = await services.getFormattedPost(req, res);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllFormattedPosts = async (req, res) => {
  try {
    let posts = await services.getAllFormattedPosts(req, res);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getPostsByUser = async (req, res) => {
  try {
    let posts = await services.getPostsByUser(req, res);
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

module.exports.updatePostCategory = async (req, res) => {
  try {
  await services.updatePostCategory(req, res);
    res.json({message: "Update caregory for post successfully"});
  } catch (error) {
    console.log(error);
  }
};
