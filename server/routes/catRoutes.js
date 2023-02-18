const {Router} = require('express');
const catControllers = require('../controllers/catControllers');

const router = Router();

router.get('/show', catControllers.show_get);

module.exports = router;
