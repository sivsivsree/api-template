'use strict';

const uploadRouter = require('./routes/upload-route');
const fetchRouter = require('./routes/fetch-route');
const loginRouter = require('./routes/login-route');

const routerRegistration = (app) => {

    app.use(uploadRouter.router);

    app.use(fetchRouter.router);

    app.use(loginRouter.router);


};

module.exports = routerRegistration;
