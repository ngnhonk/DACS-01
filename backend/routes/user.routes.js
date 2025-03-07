const express = require('express');
const router = express.Router();
const {
    authenticate,
    authorize
} = require('../middlewares/auth.middlewares');
const bodyParser = require('body-parser');
const userControllers = require("../controllers/user.controller");
const userMiddlewares = require('../middlewares/user.middlewares');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

// API chung (Bất kỳ user nào đăng nhập cũng có thể truy cập) 
router.get('/profile', authenticate, userControllers.getInformation);
router.put('/update', authenticate, userControllers.changeInformation);
router.put('/change-password', authenticate, userMiddlewares.passwordValidation, userControllers.changePassword);
router.delete('/delete', authenticate, userControllers.deleteUser);

// API chỉ admin mới có thể truy cập
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
    res.json({
        message: 'Welcome Admin',
        user: req.user
    });
});

// API chỉ admin và moderator có thể truy cập
router.get('/moderator', authenticate, authorize('admin', 'moderator'), (req, res) => {
    res.json({
        message: 'Welcome Moderator',
        user: req.user
    });
});


module.exports = router;