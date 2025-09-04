const express = require('express');
require('dotenv').config();
const authenticate = require('../lib/authenticate')
const authController = require('../controllers/authController')

const router = express.Router()


router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);
router.get('/logout', authenticate, authController.logout);
router.post('/register', authController.register);

module.exports = router;



