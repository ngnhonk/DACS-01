const db = require("../config/database");

module.exports.getOneComment = async (req,res) =>{
    let comment = await db('comments').select('*').where({id: req.params.id});
    return comment;
}

module.exports.getAllComments = async (req,res)=>{
    let comments = await db('comments').select('*');
    return comments;
}

module.exports.createComment = async(req,res)=>{
    let user_id = req.user.id;
    let {post_id, parent_comment_id, content} = req.body;
    await db('comments').insert({post_id, user_id, parent_comment_id, content});
    return; 
}

module.exports.updateComment = async(req,res)=>{
    let user_id = req.user.id;
    let {post_id, parent_comment_id, content} = req.body;
    await db('comments').update({post_id, user_id, parent_comment_id, content}).where({id: req.params.id});
    return;
}

module.exports.deleteComment = async(req,res)=>{
    await db('comments').where({id: req.params.id}).del();
    return; 
}