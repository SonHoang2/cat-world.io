const {Router} = require('express');
const catControllers = require('../controllers/catControllers');

const router = Router();

router.get('/show', catControllers.show);
router.put('/update/catdata', catControllers.update)

module.exports = router;
