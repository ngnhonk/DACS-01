const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;