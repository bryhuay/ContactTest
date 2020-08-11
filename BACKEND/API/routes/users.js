const express = require('express');
const router = express.Router();
const User = require('../controllers/userController');
const checkAuth = require('../middlewares/check-auth');


router.post('/login',User.login);
router.post('/', User.create);

module.exports = router;