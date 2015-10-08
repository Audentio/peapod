/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import ReactDOM from 'react-dom';

var Pea_core = (function(){
 
	window.peapod = {
		basePath: '/',
		suffix: '',
		style: {},
		options: {},
		helper: {}
	};

})();

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

module.exports = Pea_core;