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

// Connect to mongoDB to populate database.
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
	console.log('Debug: About to connect');
	await mongoose.connect(mongoDB);
	console.log('Debug: Should be connected?');
	await createCategories();
	await createItems();
	console.log('Debug: Closing mongoose');
	mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Basketball category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
	const category = new Category({ name: name, description: description });
	await category.save();
	categories[index] = category;
	console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, price, quantity) {
	const itemDetail = {
		name: name,
		description: description,
		price: price,
		quantity: quantity,
	};
	if (category) itemDetail.category = category;

	const item = new Item(itemDetail);
	await item.save();
	items[index] = item;
	console.log(`Added item: ${name}`);
}

async function createCategories() {
	console.log('Adding categories');
	await Promise.all([
		categoryCreate(0, 'Basketball', 'Footwear for stepping onto the court.'),
		categoryCreate(1, 'Running', 'Footwear for putting in miles.'),
		categoryCreate(
			2,
			'Cleats',
			'Footwear for tearing up all varieties of turf.'
		),
	]);
}

async function createItems() {
	console.log('Adding items');
	await Promise.all([
		itemCreate(
			0,
			'Air Jordan 1 Mid SE Basketball Shoes',
			'A special edition of a fan favorite. Feel what its like to step into the shoes of His Airness.',
			[categories[0]],
			134.99,
			100
		),
		itemCreate(
			1,
			'Nike LeBron XXI Basketball Shoes',
			"Designed with in the image of the King, these are ideal for Bron-like open-floor attacks and rising toward the rim when the game's pace turns up.",
			[categories[0]],
			199.99,
			23
		),
		itemCreate(
			2,
			"adidas Men's Ultraboost 1.0 DNA Running Shoes",
			"From walks around town to running through the city, there's an Ultraboost for everyone—and we've made it easy to pick the pair that will feel right on your first step.",
			[categories[1]],
			199.99,
			47
		),
		itemCreate(
			3,
			"New Balance Men's Fresh Foam X 3000 V6 Metal Baseball Cleats",
			'When the game is on the line, the last thing you need is a distraction. Fresh Foam X cushioning offers reliable underfoot comfort from the first pitch to the last out, so you can keep your head in the game.',
			[categories[2]],
			109.99,
			79
		),
		itemCreate(
			4,
			"Reef Men's Fanning Flip Flops",
			"With a compression molded footbed, an airbagged heel, and our legendary built-in bottle opener, it's no surprise the Fanning is the ultimate best-seller.",
			false,
			64.99,
			13
		),
	]);
}
