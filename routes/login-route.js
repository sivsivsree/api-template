'use strict';

const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login-controller');

router.route('/login').post(loginController.login);
router.route('/verify').post(loginController. verify);


module.exports = {
    router: router
};
