const Category = require('../models/category');
const asyncHandler = require('express-async-handler');
const Item = require('../models/item');

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
	const [category, itemsInCategory] = Promise.all([
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
	res.send(`NOT IMPLEMENTED: Category create GET`);
});

// Display Category create form on POST.
exports.categoryCreatePost = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category create POST`);
});

// Display Category delete form on GET.
exports.categoryDeleteGet = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category delete GET`);
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
