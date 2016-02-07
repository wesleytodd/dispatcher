# Flux Data Store

This is a datastore intended for use with a Flux/Redux base architecture.  Instead of calling each reducer, you subscribe to an individual event type, reducing the code that is run on each event.

## Usage

```
$ npm install --save store-state
```

```javascript
// Create the store
var store = new Store({} /* Initial state */);

// Subscribe to an action
store.subscribe('updateTime', function (state, action) {
	return Object.assign({}, state, {
		time: new Date()
	});
});

// Re-render on changes
store.on('changed', function (state) {
	// Do stuff based on the updated store-state
	// Like update the views, maybe with react.render...
	// `state` is the updated state after the reducers are run
});
```

### More to come....
