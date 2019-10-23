const BaseService = require('../base/base.service');
const UsersModel = require('./users.model');

class UsersService extends BaseService {
	constructor(collection) {
		super(collection);
	}
}

module.exports = new UsersService(UsersModel);
