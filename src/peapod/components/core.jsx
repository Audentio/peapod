/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var Pod_core = (function(){

	window.Pod = window.Pod || {};

	Pod.helper 		= {}
	Pod.options 	= {}
	Pod.basePath 	= '/'
	Pod.suffix		= ''

})();


//Create Component options
//
//@param {string} name - Component name
//@param {Object} [opts] - Default configuration for plugin
//@returns {Object} - Options object with default options overridden by Pod.options[component_name]
Pod.helper.options = function(name, opts){

	var options = opts || {};

	//Merge with global options object
	//global object overrides default settings defined above
	if(Pod.options[name]) {
		_.merge(options, Pod.options[name]);
	}

	return options;

}

//control page scrolling
//--
//disables touch scrolling on touch enabled devices
//uses css hax to disable scrolling without hiding scrollbar on no-touch devices
Pod.helper.scrolling = function(allowScroll){

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
Pod.helper.keymap = {
	'esc': 27
}

export default Pod_core;