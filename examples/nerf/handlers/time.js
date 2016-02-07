var React = require('react');
var pad = require('left-pad');
var isBrowser = require('is-browser');
var Nav = require('../components/nav').Nav;
var Store = require('../../..');
var updateTime = require('../actions/update-time');

module.exports = function timerHandler (req, res) {
	// Set the time either from the context or initalize with new date
	res.locals.context.time = new Date(res.locals.context.time || Date.now());

	// Add the path to the context
	res.locals.context.pathname = req.path;

	// Create the store
	var store = new Store(res.locals.context);

	// Render the component
	res.renderReactComponent(Page, store.state);

	// Only run this in the browser
	if (isBrowser) {
		// Subscribe to the update time event
		store.subscribe('updateTime', updateTime.reducer);

		// Re-render on changes
		store.on('changed', (state) => {
			res.renderReactComponent(Page, state);
		});
	}
};

var Page = React.createClass({
	displayName: 'IndexHandler',
	render: function () {
		return (
			<section>
				<h1>Store State Example</h1>
				<Nav active={this.props.pathname} />
				<time>
					<span>{this.props.time.getHours() + 1}</span>:
					<span>{pad(this.props.time.getMinutes(), 2, 0)}</span>:
					<span>{pad(this.props.time.getSeconds(), 2, 0)}</span>
				</time>
			</section>
		);
	},
	componentDidMount: function () {
		this._int = setInterval(() => {
			this.props.dispatch(updateTime.action());
		}, 1000);
	},
	componentWillUnmount: function () {
		clearInterval(this._int);
	}
});
