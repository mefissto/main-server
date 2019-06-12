const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/google', authController.google);

router.get('/facebook', authController.facebook);

module.exports = router;
