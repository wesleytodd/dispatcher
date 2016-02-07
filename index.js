var Store  = require('./lib').Store;
module.exports = function createStore (initialState) {
	return new Store(initialState);
};

// Export constructor
module.exports.Store = Store;
