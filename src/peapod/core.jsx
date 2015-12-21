/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import ReactDOM from 'react-dom';

var Pod_core = (function(){

	window.peapod = {
		basePath: '/',
		suffix: '',
		style: {},
		options: {},
		helper: {}
	};

})();


//Create Component options
//
//@param {string} name - Component name
//@param {Object} [opts] - Default configuration for plugin
//@returns {Object} - Options object with default options overridden by peapod.options[component_name]
peapod.helper.options = function(name, opts){

	var options = opts || {};

	//Merge with global options object
	//global object overrides default settings defined above
	if(peapod.options[name]) {
		_.merge(options, peapod.options[name]);
	}

	return options;

}

//control page scrolling
//--
//disables touch scrolling on touch enabled devices
//uses css hax to disable scrolling without hiding scrollbar on no-touch devices
peapod.helper.scrolling = function(allowScroll){

	var  html = document.documentElement;

	//Touch device
	if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
		var disableScroll = function(e){
			e.preventDefault()
		};
		//TBD
	}
	//no-touch device
	else {
		if(!allowScroll){
			peapod.pageScrollPos = [window.pageXOffset, window.pageYOffset];
		}

		html.style.position 	= (allowScroll) ? '' : 'fixed';
		html.style.top 			= (allowScroll) ? '' : -(peapod.pageScrollPos[1]) + 'px';
		html.style.width 		= (allowScroll) ? '' : '100%';
		html.style.overflowY 	= (allowScroll) ? '' : 'scroll';

		if(allowScroll && peapod.pageScrollPos){
			window.scroll(peapod.pageScrollPos[0],peapod.pageScrollPos[1])
		}
	}

};

//Key code map
peapod.helper.keymap = {
	'esc': 27
}

module.exports = Pod_core;
