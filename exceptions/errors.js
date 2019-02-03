"use strict";

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.code = "NOTFOUND";
        this.name = "NotFoundError";
        this.msg = message;
    }
}

class ValidateError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.code = "UNAUTHORIZED";
        this.name = "ValidateError";
        this.msg = message;
    }
}

class LoginError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.code = "UNAUTHORIZED";
        this.name = "LoginError";
        this.msg = message;
    }
}


const res = (res, error) => {
    if (error.status) {
        res.status(error.status).json(error);
    } else {
        res.status(404).json(error);
    }

};

module.exports = {
    res: res,
    NotFoundError: NotFoundError,
    ValidateError: ValidateError,
    LoginError: LoginError,
};
