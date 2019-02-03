"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = mongoose.model('users');
const config = require('config');
const jwt = require('jsonwebtoken');

const Error = require("../exceptions/errors");
const ValidateError = Error.ValidateError;

const LoginError =  Error.LoginError;


const login = async (req, res) => {
    console.log('[login]', req.body);

    try {
        if (!req.body.username || !req.body.password) {
            throw "Username Password Incorrect.";
        }


        let user = await auth.findOne({username: req.body.username, password: req.body.password});

        if (user) {

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
    console.log('[verify]', req.body);

    try {
        if (req.body.decoded._id) {

            let user = await auth.findOne({_id: req.body.decoded._id});
            if (user._id) {
                res.json({success: true, verified: true});
            } else {
                throw "No users";
            }

        } else {
            throw "Incorrect.";
        }
    } catch (e) {
        Error.res(res, new LoginError(e));
    }

};

module.exports = {
    login: login,
    verify: verify
};
