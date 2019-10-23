const BaseRouter = require('../base/base.routes');
const UsersController = require('./users.controller');

class UsersRouter extends BaseRouter {
	constructor(controller) {
		super(controller);

		this.router.put('/:id/logwork', this.controller.logWork);
	}
}

module.exports = new UsersRouter(UsersController);
