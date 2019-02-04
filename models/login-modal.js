const mongoose = require('mongoose');
const auth = mongoose.model('users');

const logger = require('../helpers/logger');

const findUserWithCredentials = (username, password) => {

    const methodName = "[findUserWithCredentials] : ";
    logger.debug(methodName + "Username " + username + " password:" + password);


    if (!username || !password) {
        throw "Username Password Incorrect.";
    }
    return auth.findOne({username: username, password: password});
};


const findOneId = (id) => {
    if (!id) {
        throw "Not a vaild ID"
    }
    return auth.findOne({_id: id});

};

module.exports = {
    findUserWithCredentials: findUserWithCredentials,
    findOneId: findOneId
};
