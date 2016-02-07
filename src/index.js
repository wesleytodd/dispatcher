var EventEmitter = require('events').EventEmitter;
var copy = require('universal-copy');
var setPrototypeOf = require('setprototypeof');

export class Store extends EventEmitter {
	constructor (initialState) {
		super();
		this._actionEventPrefix = '$$action_';
		this.setState(initialState || {});
	}

	setState (state) {
		this.state = copy(state);

		// Always add the dispatch method to the state
		this.state.dispatch = this.dispatch.bind(this);

		// This ensures that no matter what the original state was
		// built from we get the basic object methods
		setPrototypeOf(this.state, Object.prototype);
	}

	dispatch (action) {
		// If it is a promise then emit once
		// the promise is resolbed or rejected
		if (action instanceof Promise) {
			var _done = (a) => {
				this.dispatch(a);
			};
			return action.then(_done, _done);
		}

		// Emit the action on this
		this.emit(this._actionEventPrefix + action.type, action);
	}

	subscribe (action, reducer) {
		// Allow for passing an object of subscribes
		if (typeof action === 'object') {
			let unsub = [];
			for (var i in action) {
				unsub.push(this.subscribe(i, action[i]));
			}
			return () => {
				let u;
				while (u = unsubscribes.shift()) {
					u();
				}
			};
		}

		this.on(this._actionEventPrefix + action, (action) => {
			// Run the reducer
			var state = reducer(this.state, action);

			// Emit updated event
			if (state !== this.state) {
				this.setState(state);
				this.emit('changed', this.state);
			}
		});
	}
}
