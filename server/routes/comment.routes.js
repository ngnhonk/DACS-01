const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');

const commentController = require("../controllers/comment.controller");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


router.get('/', authenticate, commentController.getCommentsByUser);
router.put('/:id', authenticate, commentController.updateComment);
router.delete('/:id', authenticate, commentController.deleteComment);

module.exports = router;