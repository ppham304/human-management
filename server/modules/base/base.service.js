class BaseService {
	constructor(collection) {
	  this.collection = collection;
	}

	getAllDataSelectFields(fields) {
		return this.collection.find({})
		.select(fields)
		.exec();
	}

	getList() {
		return this.collection.find({
			deletedAt: null,
		})
		.exec();
	}

	getOne(id) {
		return this.collection.findOne({
			_id: id,
			deletedAt: null,
		})
		.exec();
	}

	create(data) {
		return this.collection.create(data);
	}

	update(id, data) {
		return this.collection.findOneAndUpdate({
			_id: id,
		}, data,
		{new: true})
		.exec();
	}

	delete(id) {
		return this.collection.updateOne({
			_id: id,
		}, {
			deletedAt: new Date(),
		})
		.exec();
	}
}

module.exports = BaseService;
