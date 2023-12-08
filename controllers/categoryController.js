const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

// Display a list of all Category.
exports.categoryList = asyncHandler(async (req, res, next) => {
	const allCategories = await Category.find({}, 'name')
		.collation({ locale: 'en' })
		.sort({ name: 1 })
		.exec();

	res.render('categoryList', {
		title: 'Category List',
		categoryList: allCategories,
	});
});

// Display detail page for a specific Category.
exports.categoryDetail = asyncHandler(async (req, res, next) => {
	// Get details of category and all their items.
	const [category, itemsInCategory] = await Promise.all([
		Category.findById(req.params.id).exec(),
		Item.find({ category: req.params.id }, 'name description').exec(),
	]);

	if (category === null) {
		// No results.
		const err = new Error('Category not found.');
		err.status = 404;
		return next(err);
	}

	res.render('categoryDetail', {
		title: 'Category Detail',
		category: category,
		itemList: itemsInCategory,
	});
});

// Display Category create form on GET.
exports.categoryCreateGet = asyncHandler(async (req, res, next) => {
	res.render('categoryForm', { title: 'Create Category' });
});

// Display Category create form on POST.
exports.categoryCreatePost = [
	// Validate and sanitize fields.
	body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
	body('description', 'Description must noy be empty.')
		.trim()
		.isLength({ min: 1 })
		.escape(),

	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		// Create a Category object with escaped and trimmed data.
		const category = new Category({
			name: req.body.name,
			description: req.body.description,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			res.render('categoryForm', {
				title: 'Create Category',
				category: category,
				errors: errors.array(),
			});
		} else {
			// Data from form is valid. Save category.
			await category.save();
			res.redirect(category.url);
		}
	}),
];

// Display Category delete form on GET.
exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
	// Get details of category and all their items.
	const [category, itemsInCategory] = await Promise.all([
		Category.findById(req.params.id).exec(),
		Item.find({ category: req.params.id }, 'name description').exec(),
	]);

	if (category === null) {
		// No results.
		const err = new Error('Category not found.');
		err.status = 404;
		return next(err);
	}

	res.render('categoryDelete', {
		title: 'Delete Category',
		category: category,
		itemList: itemsInCategory,
	});
});

// Display Category delete form on POST.
exports.categoryDeletePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category delete POST`);
});

// Display Category update form on GET.
exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category update GET`);
});

// Display Category update form on POST.
exports.categoryUpdatePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category update POST`);
});
