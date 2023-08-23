const authController = require('../controllers/authController');

const authRoutes = require('express').Router();

authRoutes.post('/login', authController.login)
authRoutes.get('/logout', authController.logout)


module.exports = authRoutes;
