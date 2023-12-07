const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// Display a list of all Category.
exports.category_list = asyncHandler((req, res, next) => {
	res.send('NOT IMPLEMENTED: Category list');
});

// Display detail page for a specific Category.
exports.category_detail = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
});

// Display Category create form on GET.
exports.category_create_get = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category create GET`);
});

// Display Category create form on POST.
exports.category_create_post = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category create POST`);
});

// Display Category delete form on GET.
exports.category_delete_get = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category delete GET`);
});

// Display Category delete form on POST.
exports.category_delete_post = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category delete POST`);
});

// Display Category update form on GET.
exports.category_update_get = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category update GET`);
});

// Display Category update form on POST.
exports.category_update_post = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category update POST`);
});
