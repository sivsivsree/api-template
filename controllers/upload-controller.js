"use strict";

const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const storeage = mongoose.model('storage');
const router = express.Router();


const uploadFile = async (req, res) => {

    if (req.file) {
        try {
            await new storeage({
                filename: req.file.filename,
                url: config.server.url + '/file/' + req.file.filename,
                bucket: req.body.bucket
            }).save();
            res.json({success: true, file: req.file.filename, url: config.server.url + '/file/' + req.file.filename});
        } catch (e) {
            res.json({success: false, message: e.message});
        }
    } else {
       // throw UloadException();
       // console.log(req);
        res.json({success: false, message: 'No files attached.'});
    }

};

const status = (req, res) => {
    res.json({status: "running fine."});
};


module.exports = {
    upload: uploadFile,
    status: status
};
