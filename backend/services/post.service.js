const db = require('../config/database');

module.exports.getAllPosts = async (req,res)=>{
    let posts = db('posts').select('*');
    return posts;
}

module.exports.getOnePost = async (req,res)=>{
    let posts = db('posts').select('*').where({id: req.params.id});
    return posts;
}

module.exports.createPost = async (req,res) =>{
    let user_id = req.user.id;
    let {category_id, title, content, image_url, views, is_pinned, is_locked} = req.body;
    await db('posts').insert({user_id, category_id, title, content, image_url, views, is_pinned, is_locked});
    return ; 
}

module.exports.updatePost = async (req,res) =>{
    let user_id = req.user.id;
    let {category_id, title, content, image_url, views, is_pinned, is_locked} = req.body;
    await db('posts').update({category_id, title, content, image_url, views, is_pinned, is_locked}).where({id: req.params.id});
    return; 
}

module.exports.deletePost = async (req,res) =>{
    await db('posts').where({id: req.params.id}).del();
    return;
}

