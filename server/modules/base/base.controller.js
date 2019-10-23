class BaseController {
	constructor(service) {
		this.service = service;

		this.load = this.load.bind(this);
		this.getAllData = this.getAllData.bind(this);
		this.getList = this.getList.bind(this);
		this.getOne = this.getOne.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.delete = this.delete.bind(this);
	}

	async load(req, res, next) {
		try {
			const { params } = req;
			const { id } = params;
			const model = await this.service.getOne(id);

			if(!model) {
				return res.json({message: "Not found"});
			}

			req.model = model;
			return next();
		} catch(error) {
			return res.json(error);
		}
	}

	/* 
		API: /all
		Method: GET
	*/
	async getAllData(req, res) {
		try {
			const list = await this.service.getAllData();
			return res.json(list);
		} catch(error) {
			return res.json(error);
		}
	}

	/* 
		API: /
		Method: GET
	*/
	async getList(req, res) {
		try {
			const list = await this.service.getList();
			return res.json(list);
		} catch(error) {
			return res.json(error);
		}
	}

	/* 
		API: /:id
		Method: GET
	*/
	getOne(req, res) {
		try {
			const { model } = req;
			return res.json(model);
		} catch(error) {
			return res.json(error);
		}
	}

	/* 
		API: /
		Method: POST
	*/
	async create(req, res) {
		try {
			const data = req.body;
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
			const data = req.body;
			const updatedData = await this.service.update(id, data);
			return res.json(updatedData);
		} catch(error) {
			return res.json(error);
		}
	}

	/* 
		API: /:id
		Method: DELETE
	*/
	async delete(req, res) {
		try {
			const { id } = req.params;
			await this.service.delete(id);
			return res.json({message: "Success"});
		} catch(error) {
			return res.json(error);
		}
	}
}

module.exports = BaseController;
