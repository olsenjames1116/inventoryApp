const express = require('express');
const router = express.Router();

// Require controller modules.
const categoryController = require('../controllers/categoryController');

// CATEGORY ROUTES //

// GET request for creating a Category.
router.get('/category/create', categoryController.categoryCreateGet);

// POST request for creating a Category.
router.post('/category/create', categoryController.categoryCreatePost);

// GET request to delete Category.
router.get('/category/:id/delete', categoryController.categoryDeleteGet);

// POST request to delete Category.
router.post('/category/:id/delete', categoryController.categoryDeletePost);

// GET request to update Category.
router.get('/category/:id/update', categoryController.categoryUpdateGet);

// POST request to update Category.
router.post('/category/:id.update', categoryController.categoryUpdatePost);

// GET request for one Category.
router.get('/category/:id', categoryController.categoryDetail);

// GET request for list of all Category.
router.get('/categories', categoryController.categoryList);

module.exports = router;
