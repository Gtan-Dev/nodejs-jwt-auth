// express
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
    authMiddleware
} = require('../middleware/authMiddleware');

// middlewares
router.use(authMiddleware);

router.get('/',  userController.index);
router.post('/',  userController.create);

module.exports = router;