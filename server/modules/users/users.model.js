const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema(
	{
		name: {
			first: String,
			last: String,
			full: String,
			short: String,
		},
		birthday: Date,
		idNumber: String,
		addresses: [],
		phoneNumbers: [],
		emails: [],
		joinedDate: Date,
		expirationDate: Date,
		workedHours: {
			type: Number,
			default: 0,
		},
		totalSalary: {
			type: Number,
			default: 0,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		deletedAt: {
			type: Date,
			required: false,
		},
	},
	{
		versionKey: false,
		collection: 'hm-users',
	},
);

module.exports = mongoose.model("UsersModel", UsersSchema);
