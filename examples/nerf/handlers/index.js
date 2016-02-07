var React = require('react');
var Nav = require('../components/nav').Nav;

module.exports = function indexHandler (req, res) {
	// Add the path to the context
	res.locals.context.pathname = req.path;

	// Render the component
	res.renderReactComponent(Page, res.locals.context);
};

var Page = React.createClass({
	displayName: 'IndexHandler',
	render: function () {
		return (
			<section>
				<h1>Store State Example</h1>
				<Nav active={this.props.pathname} />
			</section>
		);
	}
});
