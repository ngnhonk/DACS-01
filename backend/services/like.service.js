const db = require('../config/database');

module.exports.toggleLikePost = async (req, res) => {
    const {
        post_id
    } = req.body;
    const isLiked = await module.exports.isPostLiked(post_id, req.user.id);
    if (isLiked) {
        await module.exports.dislikePost(req);
        return;
    } else {
        await module.exports.likePost(req);
        return;
    }

};

module.exports.toggleLikeComment = async (req, res) => {

    const {
        post_id,
        comment_id
    } = req.body;
    const isLiked = await module.exports.isCommentLiked(post_id, comment_id, req.user.id);
    if (isLiked) {
        await module.exports.dislikeComment(req);
        return;
    } else {
        await module.exports.likeComment(req);
        return;
    }

};

module.exports.likePost = async (req) => {
    const {
        post_id
    } = req.body;
    await db('likes').insert({
        user_id: req.user.id,
        post_id,
        comment_id: null,
        is_comment: false
    });
};

module.exports.likeComment = async (req) => {
    const {
        post_id,
        comment_id
    } = req.body;
    await db('likes').insert({
        user_id: req.user.id,
        post_id,
        comment_id,
        is_comment: true
    });
};

module.exports.dislikePost = async (req) => {
    const {
        post_id
    } = req.body;
    await db('likes')
        .where({
            user_id: req.user.id,
            post_id,
            is_comment: false
        })
        .del();
};


module.exports.dislikeComment = async (req) => {
    const {
        post_id,
        comment_id
    } = req.body;
    await db('likes')
        .where({
            user_id: req.user.id,
            post_id,
            comment_id,
            is_comment: true
        })
        .del();
};

module.exports.isPostLiked = async (post_id, user_id) => {
    const like = await db('likes')
        .where({
            user_id,
            post_id,
            is_comment: false
        })
        .first();
    return !!like;
};

module.exports.isCommentLiked = async (post_id, comment_id, user_id) => {
    const like = await db('likes')
        .where({
            user_id,
            post_id,
            comment_id,
            is_comment: true
        })
        .first();
    return !!like;
};

module.exports.countPostLikes = async (req, res) => {
    const count = await db('likes')
        .where({
            post_id: req.body.post_id
        })
        .andWhere({
            is_comment: false
        })
        .count('* as total')
        .first();
    return count;
}

module.exports.countCommentLikes = async (req, res) => {
    const count = await db('likes')
        .where({
            post_id: req.body.post_id,
            comment_id: req.body.comment_id
        })
        .andWhere({
            is_comment: true
        })
        .count('* as total')
        .first();
    return count;
}