const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');
const categoryControllers = require('../controllers/category.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// API chỉ admin và moderator có thể truy cập
router.get('/', categoryControllers.getAllCategories);
router.get('/:id', authenticate, authorize('admin', 'moderator'), categoryControllers.getOneCategory);
router.post('/', authenticate, authorize('admin', 'moderator'), categoryControllers.createCategory);
router.put('/:id', authenticate, authorize('admin', 'moderator'), categoryControllers.udpateCategory);
router.delete('/:id', authenticate, authorize('admin', 'moderator'), categoryControllers.deleteCategory);

module.exports = router;