const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('config');


const loggerName = '[enableMongo]:';

const mongoConnection = config.database.connectionURL;


exports.connectMongo = function (cb = null) {
    mongoose.Promise = Promise;
    mongoose.connect(mongoConnection, { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function () {
        console.log(loggerName, 'Connection with MongoDB installed');
        if (cb != null) {
            cb();
        }
    });
};
