const mongoDB = require('./database/enableMongo');
mongoDB.connectMongo();
require("./database/registerModels");
const mongoose = require('mongoose');


