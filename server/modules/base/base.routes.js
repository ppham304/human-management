const { Router } = require('express');

class BaseRouter {
	constructor(controller) {
		this.controller = controller;
		this.router = new Router();

		this.router.get('/all', this.controller.getAllDataSelectFields);
		this.router.get('/', this.controller.getList);
		this.router.get('/:id', this.controller.getOne);
		this.router.post('/', this.controller.create);
		this.router.put('/:id', this.controller.update);
		this.router.delete('/:id', this.controller.delete);
		this.router.param('id', this.controller.load);
	}
}

module.exports = BaseRouter;
