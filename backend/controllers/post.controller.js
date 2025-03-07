const services = require ('../services/post.service');

module.exports.getAllPosts = async (req,res)=>{
    try {
        let posts = await services.getAllPosts(req,res);
        res.json({message: "Get all posts successfully",
            posts: posts
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.getOnePost = async (req,res)=>{
    try {
        let post = await services.getOnePost(req,res);
        res.json({message: "Get a post successfully",
            post: post
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.createPost = async (req,res) =>{
    try {
        await services.createPost(req,res);
        res.json({message: "Create a new post successfully"});
    } catch (error) {
        console.log(error);
    }
}

module.exports.updatePost = async (req,res) =>{
    try {
        await services.updatePost(req,res);
        res.json({message: "Updated post successfully"});
    } catch (error) {
        console.log(error);
    }
}

module.exports.deletePost = async (req,res) =>{
    try {
        await services.deletePost(req,res);
        res.json({message: "Deleted post successfully"});
    } catch (error) {
        console.log(error);
    }
}