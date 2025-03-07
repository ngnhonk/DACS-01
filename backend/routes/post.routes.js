const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');

const controllers = require('../controllers/post.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// API chỉ admin và moderator có thể truy cập
router.get('/', authenticate, authorize('admin', 'moderator'), controllers.getAllPosts);
router.get('/:id', authenticate, authorize('admin', 'moderator'), controllers.getOnePost);
router.post('/', authenticate, authorize('admin', 'moderator'), controllers.createPost);
router.put('/:id', authenticate, authorize('admin', 'moderator'), controllers.updatePost);
router.delete('/:id', authenticate, authorize('admin', 'moderator'), controllers.deletePost);

module.exports = router;