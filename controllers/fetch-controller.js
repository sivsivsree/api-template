"use strict";
const httpStatusCodes = require("http-status-codes");
const fs = require('fs');

const fetch = (req, res) => {
    const imageId = req.params.imageId;
    const filePath = UPLOAD_DIR + '/' + imageId;
    console.log("Over here", filePath);
    if (fs.existsSync(filePath)) {

        res.sendFile(filePath);
    } else {
        console.log("Error Over here");
        let err = new Error();
        err.code = "NO_IMAGE_ID";
        err.message = "No image with the current name.";
        res.status(httpStatusCodes.NOT_FOUND).json(err);
    }
};

const fetchByBucket = (req, res) => {
    const imageId = req.params.imageId;
    const bucket = req.params.bucket;
    const filePath = 'uploads/' + bucket + "_" + imageId;
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        let err = new Error();
        err.code = "NO_IMAGE_ID";
        err.message = "No image with the current name.";
        res.status(httpStatusCodes.NOT_FOUND).json(err);
    }
};


module.exports = {
    fetch: fetch,
    fetchByBucket: fetchByBucket
};
