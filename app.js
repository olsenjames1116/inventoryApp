const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const inventoryRouter = require('./routes/inventory');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const app = express();

// Set up rate limiter: maximum of twenty requests per minute.
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, //1 minute
	max: 20,
});
// Apply rate limiter to all requests.
//app.use(limiter);

// Set up mongoose connection.
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dev_db_url =
	'mongodb+srv://admin:7lGSZ3gLkIwW4lns@cluster0.280ehzs.mongodb.net/?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
main().catch((err) => {
	console.log(err);
});
async function main() {
	await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(helmet());

app.use('/', indexRouter);
app.use('/inventory', inventoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
