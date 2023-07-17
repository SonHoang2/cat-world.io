const {Router} = require('express');
const authController = require('../controllers/authController');
const VerificationToken = require('../middleware/VerificationToken')

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.post('/login/google', authController.google_login)
router.post('/forgot-password', authController.sendVerificationCode)
router.post('/check-verification-code', authController.checkVerificationCode)
router.post('/reset-password', VerificationToken ,authController.resetPassword)

module.exports = router;