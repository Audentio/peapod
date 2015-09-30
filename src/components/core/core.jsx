/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
var peapod = {
	basePath: '/',
	suffix: '',
	style: {}
};

peapod.config = {
	'radius'				: '2px',
	'el-padding-v'			: '10px',
	'el-padding-h'			: '15px',
	
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
		padding_v = size || peapod.config['el-padding-v'],
		padding_h = (size) ? size+(size/2) : peapod.config['el-padding-h'];
		
	return padding_v + ' ' + padding_h;
	
}

//create style object from an array of objects
//lodash merge
peapod.createStyle = function(objArray){
	var style = {};
	
	_.forEach(objArray, function(styleObj){
		//ignore falsy
		if(styleObj){
			//override indetical key values
			_.merge(style, styleObj);
		}
	});
	
	return style;
}