const { Router } = require('express');
const UsersRouter = require('./users/users.routes');

const rootRouter = new Router();

rootRouter.use('/users', UsersRouter.router);

module.exports = rootRouter;
