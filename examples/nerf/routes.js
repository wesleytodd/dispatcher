var reactExpressMiddleware = require('react-express-middleware');
var sharedContext = require('shared-context');

module.exports = function (app) {
	// Isomorphic react render middleware
	app.use(reactExpressMiddleware({
		element: 'app'
	}));

	// Setup the context to share with the browser
	app.use(sharedContext());

	// Page routes
	app.get('/', require('./handlers/index'));
	app.get('/time', require('./handlers/time'));
	app.get('/form', require('./handlers/form'));
};
