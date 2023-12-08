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
			return;
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
	// Get details of category and all their items.
	const [category, itemsInCategory] = await Promise.all([
		Category.findById(req.params.id).exec(),
		Item.find({ category: req.params.id }, 'name description').exec(),
	]);

	if (itemsInCategory.length > 0) {
		// Category has items. Render in the same way as for the GET route.
		res.render('categoryDelete', {
			title: 'Delete Category',
			category: category,
			itemList: itemsInCategory,
		});
		return;
	} else {
		// Category has no items. Delete object and redirect to the list of categories.
		await Category.findByIdAndDelete(req.body.categoryid);
		res.redirect('/inventory/categories');
	}
});

// Display Category update form on GET.
exports.categoryUpdateGet = asyncHandler(async (req, res, next) => {
	// Get category for form.
	const category = await Category.findById(req.params.id).exec();

	if (category === null) {
		// No results.
		const err = new Error('Category not found.');
		err.status = 404;
		return next(err);
	}

	res.render('categoryForm', {
		title: 'Update Category',
		category: category,
	});
});

// Display Category update form on POST.
exports.categoryUpdatePost = [
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
			_id: req.params.id,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/error messages.
			res.render('categoryForm', {
				title: 'Update Category',
				category: category,
				errors: errors.array(),
			});
			return;
		} else {
			// Data from form is valid. Update category.
			const updatedCategory = await Category.findByIdAndUpdate(
				req.params.id,
				category,
				{}
			);
			// Redirect to category detail page.
			res.redirect(category.url);
		}
	}),
];
