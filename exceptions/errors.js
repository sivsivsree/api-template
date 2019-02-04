"use strict";
const logger = require('../helpers/logger');

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.code = "NOTFOUND";
        this.error = "NotFoundError";
        this.msg = message;
    }
}

class ValidateError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.code = "UNAUTHORIZED";
        this.error = "ValidateError";
        this.msg = message;
    }
}

class LoginError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.code = "UNAUTHORIZED";
        this.error = "LoginError";
        this.msg = message;
    }
}


const res = (res, error) => {
    if (error.status) {
        logger.error(`[${error.error}]: ${error.msg}`);
        res.status(error.status).json(error);
    } else {
        logger.error(`[error]: ${error}`);
        res.status(404).json(error);
    }


};

module.exports = {
    res: res,
    NotFoundError: NotFoundError,
    ValidateError: ValidateError,
    LoginError: LoginError,
};
