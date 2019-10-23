const BaseController = require('../base/base.controller');
const UsersService = require('./users.service');

class UsersController extends BaseController {
	constructor(service) {
		super(service);

		this.logWork = this.logWork.bind(this);
	}

	setFullName(first, last) {
		let full = '';
		if(first && first != '') {
			full += first;
		}
		if(last && last != '') {
			full += ' ' + last;
		}
		full = full.trim();
		return full;
	}

	async setShortName(full, shortData) {
		const arrName = full.split(" ");
		let short = '';

		//Get short name by full name
		arrName.forEach((name, index) => {
			if(index === 0) {
				short += name.toLowerCase();
			} else {
				short += name.substr(0,1).toLowerCase();
			}
		});

		//Check when update
		if(shortData) {
			let first = shortData.substring(0, short.length);
			let last = !isNaN(shortData.substring(short.length));
			if(first === short && last) {
				return shortData;
			}
		}

		//Get all data (include deleted user)
		const list = await this.service.getAllData();
		if(list.length === 0)
			return short;

		//Get all short name (include deleted user)
		let listExistedShortName = list.map((user, index) => {
			return user.name.short;
		});

		//Get short name is existed with user name
		listExistedShortName = listExistedShortName.filter((shortName, index) => {
			return shortName.includes(short);
		});

		//Add number after short name
		if(listExistedShortName.length > 0) {
			let num = listExistedShortName.length + 1
			short += num;
		}

		return short;
	}

	/* 
		API: /
		Method: POST
	*/
	async create(req, res) {
		try {
			const data = req.body;

			if(data && data.name) {
				data.name.full = this.setFullName(data.name.first, data.name.last);
				data.name.short = await this.setShortName(data.name.full);
			}
			const createdData = await this.service.create(data);
			return res.json(createdData);
		} catch(error) {
			return res.json(error);
		}
	}

	/* 
		API: /:id
		Method: PUT
	*/
	async update(req, res) {
		try {
			const { id } = req.params;
			const { model } = req;
			const data = req.body;
			if(data && data.name) {
				data.name.full = this.setFullName(data.name.first, data.name.last);
				data.name.short = await this.setShortName(data.name.full, model.name.short);
			}
			const updatedData = await this.service.update(id, data);
			return res.json(updatedData);
		} catch(error) {
			return res.json(error);
		}
	}

	async logWork(req, res) {
		try {
			const { id } = req.params;
			const { model } = req;
			const data = req.body;

			if(model && data) {
				data.workedHours += model.workedHours;
			}
			const updatedData = await this.service.update(id, data);

			return res.json(updatedData);
		} catch(error) {
			return res.json(error);
		}
	}
}

module.exports = new UsersController(UsersService);
