const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');
const controllers = require('../controllers/comment.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// API for all
router.get('/', authenticate, controllers.createComment);
router.delete('/:id', authenticate, controllers.deleteComment);

// API for admin/mods
router.get('/', authenticate, authorize('admin', 'moderator'), controllers.getAllComments);
router.get('/:id', authenticate, authorize('admin', 'moderator'), controllers.getOneComment);
router.post('/', authenticate, authorize('admin', 'moderator'), controllers.createComment);
router.put('/:id', authenticate, authorize('admin', 'moderator'), controllers.updateComment);
router.delete('/:id', authenticate, authorize('admin', 'moderator'), controllers.deleteComment);


module.exports = router;