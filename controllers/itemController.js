const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// Display index page for inventory.
exports.index = asyncHandler(async (req, res, next) => {
	// Get details of items and categories.
	const [itemCount, totalItems, categoryCount] = await Promise.all([
		Item.countDocuments({}).exec(),
		Item.aggregate([
			{
				$project: {
					itemsTotal: { $sum: '$numberInStock' },
				},
			},
		]),
		Category.countDocuments({}).exec(),
	]);

	res.render('index', {
		title: 'Shoelace Express Home',
		itemCount: itemCount,
		totalItems: totalItems,
		categoryCount: categoryCount,
	});
});

// Display a list of all items.
exports.itemList = asyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Item list');
});

// Display detail page for a specific Item.
exports.itemDetail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
});

// Display Item create form on GET.
exports.itemCreateGet = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item create GET`);
});

// Display Item create form on POST.
exports.itemCreatePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item create POST`);
});

// Display Item delete form on GET.
exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item delete GET`);
});

// Display Item delete form on POST.
exports.itemDeletePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item create POST`);
});

// Display Item update form on GET.
exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item update GET`);
});

// Display Item update form on POST.
exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item update POST`);
});
