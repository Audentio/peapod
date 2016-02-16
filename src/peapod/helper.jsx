/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */


var Pod_helper = {

    //some things are left to the reader's imagination
    //--
    keymap: {
    	'esc': 27
    },

    //Check if device is touch-enabled
    isTouch: function(){
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
    },

    //Create Component options
    //@param {string} name - Component name
    //@param {Object} [opts] - Default configuration for plugin
    //@returns {Object} - Options object with default options overridden by Pod.options[component_name]
    options: function(name, opts){

    	var options = opts || {};

    	//Merge with global options object
    	//global object overrides default settings defined above
    	if(Pod.options[name]) {
    		_.merge(options, Pod.options[name]);
    	}

    	return options;

    },

    //control page scrolling
    //--
    //disables touch scrolling on touch enabled devices
    //disables scrolling on non-touch devices without hiding scrollbar
    scrolling: function(allowScroll){

    	var  html = document.documentElement;

    	//Touch
    	if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    		var disableScroll = function(e){
    			e.preventDefault()
    		};
    		//TBD
    	}

    	//no-touch
    	else {
    		if(!allowScroll){
    			Pod.pageScrollPos = [window.pageXOffset, window.pageYOffset];
    		}

    		html.style.position 	= (allowScroll) ? '' : 'fixed';
    		html.style.top 			= (allowScroll) ? '' : -(Pod.pageScrollPos[1]) + 'px';
    		html.style.width 		= (allowScroll) ? '' : '100%';
    		html.style.overflowY 	= (allowScroll) ? '' : 'scroll';

    		if(allowScroll && Pod.pageScrollPos){
    			window.scroll(Pod.pageScrollPos[0],Pod.pageScrollPos[1])
    		}
    	}

    }
}

export default Pod_helper
