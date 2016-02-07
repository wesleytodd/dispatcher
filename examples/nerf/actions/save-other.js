module.exports = {
	action: function (val) {
		return {
			type: 'saveOther',
			other: val
		};
	},
	reducer: function (state, action) {
		return Object.assign({}, state, {
			other: action.other
		});
	}
};
