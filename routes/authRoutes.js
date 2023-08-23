const authController = require('../controllers/authController');

const authRoutes = require('express').Router();

authRoutes.get('/login', authController.login)
authRoutes.get('/logout', authController.logout)


module.exports = authRoutes;