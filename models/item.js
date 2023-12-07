const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: { type: String, required: true, maxLength: 100 },
	description: { type: String, required: true },
	category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
	price: { type: Number, required: true },
	numberInStock: { type: Number, required: true, default: 0 },
});

// Virtual for item's url.
ItemSchema.virtual('url').get(function () {
	return `/inventory/item/${this._id}`;
});

// Export model.
module.exports = mongoose.model('Item', ItemSchema);
