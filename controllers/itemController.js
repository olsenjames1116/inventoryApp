const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

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
exports.itemCreatePost = [
	// Convert the category to an array.
	(req, res, next) => {
		if (!Array.isArray(req.body.category)) {
			req.body.category =
				typeof req.body.category === 'undefined' ? [] : [req.body.category];
		}
		next();
	},

	// Validate and sanitize fields.
	body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('description', 'Description must not be empty.')
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body('price')
		.trim()
		.escape()
		.isFloat()
		.withMessage('Price must be a number.')
		.isFloat({ min: 0 })
		.withMessage('Price must be greater than or equal to 0.'),
	body('quantity')
		.trim()
		.escape()
		.isInt()
		.withMessage('Quantity must be a whole number.')
		.isInt({ min: 0 })
		.withMessage('Quantity must be greater than or equal to 0.'),
	body('category').escape(),

	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create an Item object with escaped and trimmed data.
		const item = new Item({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			quantity: req.body.quantity,
			category: req.body.category,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.

			// Get all categories for a form.
			const allCategories = await Category.find().sort({ name: 1 }).exec();

			// Mark our selected categories as checked.
			for (const category of allCategories) {
				if (item.category.includes(category._id)) {
					category.checked = 'true';
				}
			}

			res.render('itemForm', {
				title: 'Create Item',
				categories: allCategories,
				item: item,
				errors: errors.array(),
			});
		} else {
			// Data from form is valid. Save item.
			await item.save();
			res.redirect(item.url);
		}
	}),
];

// Display Item delete form on GET.
exports.itemDeleteGet = asyncHandler(async (req, res, next) => {
	// Get details of item.
	const item = await Item.findById(req.params.id).exec();

	if (item === null) {
		// No results.
		const err = new Error('Item not found.');
		err.status = 404;
		return next(err);
	}

	res.render('itemDelete', {
		title: 'Delete Item',
		item: item,
	});
});

// Display Item delete form on POST.
exports.itemDeletePost = asyncHandler(async (req, res, next) => {
	// Get details of item.
	const item = await Item.findById(req.params.id).exec();

	// Delete object and redirect to the list of items.
	await Item.findByIdAndDelete(req.body.itemid);
	res.redirect('/inventory/items');
});

// Display Item update form on GET.
exports.itemUpdateGet = asyncHandler(async (req, res, next) => {
	// Get item for form.
	const [item, allCategories] = await Promise.all([
		Item.findById(req.params.id).populate('category').exec(),
		Category.find().sort({ name: 1 }).exec(),
	]);

	if (item === null) {
		// No results.
		const err = new Error('Item not found.');
		err.status = 404;
		return next(err);
	}

	res.render('itemForm', {
		title: 'Update Item',
		item: item,
		categories: allCategories,
	});
});

// Display Item update form on POST.
exports.itemUpdatePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Item update POST`);
});
