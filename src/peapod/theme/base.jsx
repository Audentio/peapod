var Pod_styler = require('../styler.jsx');

var init = function(components) {
	var req = require.context('./base', false, /^\.\/.*\.jsx$/)

	Pod_styler.addLibrary('root', 'base', components, req);
}


module.exports = init;
