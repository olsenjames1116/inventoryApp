const Category = require('../models/category');
const asyncHandler = require('express-async-handler');

// Display a list of all Category.
exports.categoryList = asyncHandler((req, res, next) => {
	res.send('NOT IMPLEMENTED: Category list');
});

// Display detail page for a specific Category.
exports.categoryDetail = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
});

// Display Category create form on GET.
exports.categoryCreateGet = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category create GET`);
});

// Display Category create form on POST.
exports.categoryCreatePost = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category create POST`);
});

// Display Category delete form on GET.
exports.categoryDeleteGet = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category delete GET`);
});

// Display Category delete form on POST.
exports.categoryDeletePost = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category delete POST`);
});

// Display Category update form on GET.
exports.categoryUpdateGet = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category update GET`);
});

// Display Category update form on POST.
exports.categoryUpdatePost = asyncHandler((req, res, next) => {
	res.send(`NOT IMPLEMENTED: Category update POST`);
});
