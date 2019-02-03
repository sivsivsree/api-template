'use strict';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const fs = require('fs');
const config = require('config');
const Error = require('./exceptions/errors');
const httpStatusCodes = require("http-status-codes");


const mongoDB = require('./database/enableMongo');

const app = express();


// app monitor
// require('appmetrics-dash').attach();
// require('appmetrics-prometheus').attach();

// PORT definition
const PORT = process.env.PORT || config.server.PORT;


//global setups
/*global.APIKEY = crypto.createHash('md5').update(process.env.APIKEY).digest('hex');*/

// todo move this to config.
global.UPLOAD_DIR = __dirname + '/fileUploads';
global.FILE_URL = config.server.HOST + ':' + PORT + '/file/';


if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR)
}

// use the cors
app.use(cors());

// enable the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Logging for development
app.use(morgan('dev'));


// model registration for mongo
require("./database/registerModels");

// KEY validations and escapes
app.all('/*', [require('./controllers/validate-api-key')]);

// route definitions
const routerReg = require('./routeReg');
routerReg(app);


//app.use(express.static(__dirname + "/dist"));

// Error Handling
app.use((err, req, res, next) => {
    // logger.log('error', err);
    console.error("Error handler", err);
    Error.res(res, err);

});



// 404 custom errors
app.use((req, res) => {
    Error.res(res, new  Error.NotFoundError(req.originalUrl + ' not Found'));
});


// starting the Database and Server
mongoDB.connectMongo(() => {
    app.listen(PORT).on('error', console.log);
});


process.on('unhandledRejection', (reason, p) => {
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason.msg);

});
