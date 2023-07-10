const {Router} = require('express');
const userController = require('../controllers/userController');
const upload = require('../middleware/upload')
const router = Router();

router.post('/user/edit', userController.edit)
router.post('/image', upload.single('avatar'), userController.uploadImg)
router.post('/updateAvatar', userController.updateAvatar)

module.exports = router;