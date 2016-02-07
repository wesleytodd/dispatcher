var React = require('react');
var isBrowser = require('is-browser');
var Nav = require('../components/nav').Nav;
var saveOther = require('../actions/save-other');
var Store = require('../../..');

module.exports = function timerHandler (req, res) {
	// Add the path to the context
	res.locals.context.pathname = req.path;

	// Set value of other
	res.locals.context.other = res.locals.context.other || '';

	// Create the store
	var store = new Store(res.locals.context);

	// Render the component
	res.renderReactComponent(Page, store.state);

	// Only run this in the browser
	if (isBrowser) {
		// Subscribe to the events, by passing an object
		// you can subscribe to multiple events at once
		store.subscribe({
			saveOther: saveOther.reducer
		});

		// Re-render on changes
		store.on('changed', (state) => {
			res.renderReactComponent(Page, state);
		});
	}
};

var Page = React.createClass({
	displayName: 'FormHandler',
	render: function () {
		return (
			<section>
				<h1>Store State Example</h1>
				<Nav active={this.props.pathname} />
				<form onSubmit={this.save}>
					<label>Some Input</label>
					<input value={this.state.other} onChange={this.updateOther} />
					<button type="submit" disabled={this.state.other === this.props.other}>Save</button>
				</form>
			</section>
		);
	},
	getInitialState: function () {
		return {
			other: this.props.other
		}
	},
	componentWillReceiveProps: function (props) {
		this.setState({
			other: props.other
		});
	},
	updateOther: function (e) {
		this.setState({
			other: e.target.value
		});
	},
	save: function (e) {
		e.preventDefault();
		this.props.dispatch(saveOther.action(this.state.other));
	}
});
