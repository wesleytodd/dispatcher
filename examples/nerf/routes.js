var reactExpressMiddleware = require('react-express-middleware');
var escape = require('recursive-escape');
var unescape = require('recursive-unescape');

module.exports = function (app) {
	// Isomorphic react render middleware
	app.use(reactExpressMiddleware({
		element: 'app'
	}));

	// Setup a context to share with the browser
	app.use(function setupContext (req, res, next) {
		if (typeof window !== 'undefined' && window.__context && window.__context) {
			// On the front-end we unescape it and null it our
			res.locals.context = unescape(window.__context);
			window.__context = null;
		} else {
			// On the backend or after the initial page load, we just initialize it
			res.locals.context = {};
		}

		// Escape when outputing on page
		res.locals.context.toJSON = function () {
			return escape(res.locals.context);
		};
		next();
	});

	// Page routes
	app.get('/', require('./handlers/index'));
	app.get('/time', require('./handlers/time'));
	app.get('/form', require('./handlers/form'));
};
