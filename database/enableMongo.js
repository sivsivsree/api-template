const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('config');

const logger = require('../helpers/logger');

const loggerName = '[enableMongo]: ';

const mongoConnection = config.database.connectionURL;


exports.connectMongo = function (cb = null) {
    mongoose.Promise = Promise;
    mongoose.connect(mongoConnection, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
        logger.info(loggerName + 'Connection to mongodb established!!!!');
        if (cb != null) {
            cb();
        }
    });
};
