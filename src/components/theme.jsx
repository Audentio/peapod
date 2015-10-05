/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

window.peapod_style = {};

peapod_style.config = {
	'gutter'				: '15px',
	'radius'				: '2px',
	'el-padding-v'			: '10px',
	'el-padding-h'			: '15px',
	'transition-duration'	: '150ms',
	
	//Color palette
	'brand-primary'			: '#3498db',
	'brand-secondary'		: '#1abc9c',
	'brand-success'			: '#2ecc71',
	'brand-danger'			: '#f44336',
	'brand-warning'			: '#FFC107'
}


// Element sizing
peapod.elSize = function(size){

	var 
		padding_v = size || peapod_style.config['el-padding-v'],
		padding_h = (size) ? size+(size/2) : peapod_style.config['el-padding-h'];
		
	return padding_v + ' ' + padding_h;
	
}

module.exports = peapod_style;