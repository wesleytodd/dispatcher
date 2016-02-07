module.exports = {
	action: function () {
		return {
			type: 'updateTime'
		};
	},
	reducer: function (state) {
		return Object.assign({}, state, {
			time: new Date()
		});
	}
};
