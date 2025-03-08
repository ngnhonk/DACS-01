const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');

const controllers = require('../controllers/like.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/like/post', authenticate, controllers.toggleLikePost);
router.post('/like/comment', authenticate, controllers.toggleLikeComment);
router.get("/like/count/post", authenticate, controllers.countPostLikes);
router.get("/like/count/comment", authenticate, controllers.countCommentLikes);

module.exports = router;