const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
	description: { type: String, required: true },
});

// Virtual for the category's url.
CategorySchema.virtual('url').get(function () {
	return `/inventory/category/${this._id}`;
});
