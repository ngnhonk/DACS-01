const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');

const postController = require('../controllers/post.controller');
const likeController = require("../controllers/like.controller");
const commentController = require("../controllers/comment.controller");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post("/like", authenticate, likeController.toggleLikePost); // { post_id } = req.body;
router.post("/likes", authenticate, likeController.countPostLikes); // {post_id} = req.body
router.get("/comments", authenticate, commentController.getAllComments); // {post_id} = req.body
router.post("/comment/like", authenticate, likeController.toggleLikeComment); // { post_id, comment_id } = req.body
router.get("/comment/reply", authenticate, commentController.getReply); // req.body.comment_id
router.put("/comment/update", authenticate, commentController.updateComment); // {post_id, parent_comment_id, content} = req.body
router.delete("/comment/delete", authenticate, commentController.deleteComment); // {post_id} = req.body
router.put("/pin", authenticate, postController.pinPost); // { post_id } = req.body
router.put("/lock", authenticate, postController.lockPost); // { post_id } = req.body
router.post("/create", authenticate, postController.createPost); // {category_id, title, content, image_url, views, is_pinned, is_locked} = req.body
router.put("/update", authenticate, postController.updatePost); // {category_id, title, content, image_url, views, is_pinned, is_locked} = req.body
router.delete("/delete", authenticate, postController.deletePost); // { post_id } = req.body
router.get('/', authenticate, postController.getAllFormattedPosts);
router.get("/:postId/like-status", authenticate, likeController.checkLikeStatus);
router.get('/byUser', authenticate, postController.getPostsByUser);

router.get('/test', postController.getPostsByUser);

// Only admin and moderator

router.post('/', authenticate, authorize('admin', 'moderator'), postController.createPost);
router.put('/:id', authenticate, authorize('admin', 'moderator'), postController.updatePost);
router.delete('/:id', authenticate, authorize('admin', 'moderator'), postController.deletePost);

module.exports = router;