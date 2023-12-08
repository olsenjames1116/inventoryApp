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
				$group: {
					_id: null,
					total: { $sum: '$quantity' },
				},
			},
		]).exec(),
		Category.countDocuments({}).exec(),
	]);

	res.render('index', {
		title: 'Shoelace Express Inventory',
		itemCount: itemCount,
		totalItems: totalItems[0].total,
		categoryCount: categoryCount,
	});
});

// Display a list of all items.
exports.itemList = asyncHandler(async (req, res, next) => {
	const allItems = await Item.find({}, 'name')
		.collation({ locale: 'en' })
		.sort({ name: 1 })
		.exec();

	res.render('itemList', {
		title: 'Item List',
		itemList: allItems,
	});
});

// Display detail page for a specific Item.
exports.itemDetail = asyncHandler(async (req, res, next) => {
	const item = await Item.findById(req.params.id).populate('category').exec();

	if (item === null) {
		// No results.
		const err = new Error('Item not found.');
		err.status = 404;
		return next(err);
	}

	res.render('itemDetail', {
		title: 'Item Detail',
		item: item,
	});
});

// Display Item create form on GET.
exports.itemCreateGet = asyncHandler(async (req, res, next) => {
	// Get all categories which we can use for our item.
	const allCategories = await Category.find().sort({ name: 1 }).exec();

	res.render('itemForm', {
		title: 'Create Item',
		categories: allCategories,
	});
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
