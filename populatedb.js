#! /usr/bin/env node

console.log(
	'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require('./models/category');
const Item = require('./models/item');

const categories = [];
const items = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log('Debug: About to connect');
	await mongoose.connect(mongoDB);
	console.log('Debug: Should be connected?');
	await createCategories();
	console.log('Debug: Closing mongoose');
	mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the <category> category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
	const category = new Category({ name: name, description: description });
	await category.save();
	categories[index] = category;
	console.log(`Added category: ${name}`);
}

async function createCategories() {
	console.log('Adding categories');
	await Promise.all([
		categoryCreate(
			0,
			'Clothing',
			'All apparel for all customers and purposes.'
		),
		categoryCreate(1, 'Shoes', 'All footwear for all customers and purposes.'),
		categoryCreate(
			2,
			'Equipment',
			'All equipment for all customers and purposes.'
		),
	]);
}
