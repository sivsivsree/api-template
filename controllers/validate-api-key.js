'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const httpStatusCodes = require('http-status-codes');
const auth = mongoose.model('users');

const Error = require("../exceptions/errors");
const ValidateError = Error.ValidateError;

const validateServiceValidateRequest = (input, cb) => {
    const token = input.token;
    const originalUrl = input.originalUrl;


    if (originalUrl.indexOf('/file/') > -1 ||
        originalUrl.indexOf('/login') > -1 ||
        originalUrl.indexOf('/upload') > -1) {
        console.log('[validateServiceValidateRequest]', input);
        return cb();
    }

    try {
        if (token) {
            let decoded = jwt.verify(token, config.jwt.secret);
            return cb(null, decoded);
        } else {
            throw "API key not provided.";
        }
    } catch (e) {
        throw  new ValidateError(e);
        //return;

    }


};

const validateRequest = (req, res, next) => {
    const input = {};
    input.token = req.body.token || req.query.token || req.headers['x-token'];
    input.originalUrl = req.originalUrl;

    validateServiceValidateRequest(input, async (err, data) => {
        if (err) {
            next(err);
        } else {
            if (data) {
                try {
                    if (data.id) {
                        let user = await auth.findOne({_id: data.id});
                        if (user._id) {
                            req.user = user;
                        } else {
                           throw new ValidateError("No users");
                        }

                    } else {
                       throw new ValidateError("Incorrect.");
                    }

                } catch (e) {
                    throw new ValidateError(e.message);
                }
            }
            next();
        }
    });
};

module.exports = validateRequest;
