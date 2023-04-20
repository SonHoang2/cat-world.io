const {Router} = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.post('/user/edit', userController.edit)

module.exports = router;