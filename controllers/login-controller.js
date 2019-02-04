"use strict";

const express = require('express');
const router = express.Router();
const config = require('config');
const jwt = require('jsonwebtoken');
const logger = require('../helpers/logger');

const loginModel = require('../models/login-modal');

const Error = require("../exceptions/errors");
const ValidateError = Error.ValidateError;

const LoginError = Error.LoginError;


const login = async (req, res) => {
    const methodName = "[login] : ";
    logger.info(methodName + JSON.stringify(req.body));

    try {
        let user = await loginModel.findUserWithCredentials(req.body.username, req.body.password);

        if (user) {
            console.log(user);
            let token = jwt.sign({id: user._id, role: user.role}, config.jwt.secret, {
                expiresIn: config.jwt.expiresIn
            });
            res.json({success: true, token: token, role: user.role});

        } else {
            throw "No users";
        }
    } catch (e) {
        Error.res(res, new LoginError(e));
    }

};

const verify = async (req, res) => {
    const methodName = "[verify] : ";
    logger.info(methodName + req.body);

    try {
        let user = await loginModel.findOneId(req.body.decoded._id);
        if (user._id) {
            res.json({success: true, verified: true});
        } else {
            throw "No users";
        }

    } catch (e) {
        Error.res(res, new LoginError(e));
    }

};

module.exports = {
    login: login,
    verify: verify
};
