const BaseService = require('../base/base.service');
const UsersModel = require('./users.model');

class UsersService extends BaseService {
	constructor(collection) {
		super(collection);
	}

	async getAllShortName() {
		const listFields = {
			"name.short": 1,
			"_id": 0,
		};
		return await this.getAllDataSelectFields(listFields);
	}
}

module.exports = new UsersService(UsersModel);
