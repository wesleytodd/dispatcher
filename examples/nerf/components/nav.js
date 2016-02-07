var React = require('react');
var classNames = require('classnames');

export function Nav (props) {
	return (
		<nav>
			<a href="/" className={classNames({active: props.active === '/'})}>Home</a>
			<a href="/time" className={classNames({active: props.active === '/time'})}>Timer</a>
			<a href="/form" className={classNames({active: props.active === '/form'})}>Form</a>
		</nav>
	);
}
