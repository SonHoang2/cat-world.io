const {Router} = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/login/google', authController.google_login)

module.exports = router;