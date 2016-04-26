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

    	//Touch
    	if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    		if(allowScroll){
                document.removeEventListener('touchmove', this.noTouchScrolling)
            } else {
                document.addEventListener('touchmove', this.noTouchScrolling)
            }
    	}

        document.body.style.overflow = (allowScroll) ? '' : 'scroll'; //overflowY doesn't disable scrolling on safari
        document.documentElement.style.overflow = (allowScroll) ? '' : 'hidden'; //overflowY doesn't disable scrolling on safari

    },

    noTouchScrolling: function(e){
        e.preventDefault()
    },

    fullscreen: {

        isAvailable: function(){
            return (
                document.fullscreenEnabled ||
                document.msFullscreenEnabled ||
                document.mozFullscreenEnabled ||
                document.webkitFullscreenEnabled
            )
        },

        isEnabled: function(){
            return (
                document.fullscreenElement ||
                document.msFullscreenElement ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement
            )
        },

        enter: function(elem){
            elem = (elem instanceof HTMLElement) ? elem : document.documentElement;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        },

        exit: function(){
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        },

        toggle: function(){
            if (Pod_helper.fullscreen.isEnabled()) {
                Pod_helper.fullscreen.exit()
            } else {
                Pod_helper.fullscreen.enter()
            }
        },

        lastScrollPos: null
    },

    downloadFile: function(url, filename){
        var downLink = document.createElement('a');
        downLink.href = url;
        downLink.download = filename || url.substring(url.lastIndexOf('/')+1, url.length);
        downLink.click();
    },

    addStylesheet: function(id, path, callback){
        if(!document.getElementById('Peapod_'+id+'_stylesheet')){
            var stylesheet = document.createElement('link');
            stylesheet.id = 'Peapod_'+id+'_stylesheet'
            stylesheet.rel = 'stylesheet'
            stylesheet.type = 'text/css'
            stylesheet.href = path
            stylesheet.onload = callback
            document.head.appendChild(stylesheet)
            return true
        }
        return false
    },

    addScript: function(params){
        if(document.getElementById('Peapod_'+params.id+'_script'))
            return false;

        var addToPage = function(cb){
            var script = document.createElement('script');
            script.id = 'Peapod_'+params.id+'_script'
            script.type = 'text/javascript'
            script.src = params.url
            if(cb) script.onload = cb
            document.head.appendChild(script)
            return true
        }

        if(params.ajax) {
            var request = new XMLHttpRequest();
            request.open("GET", params.url, true);
            request.onreadystatechange = function () {
                if(request.readyState !== 4) return;
                if(request.status === 200) {
                    addToPage(function(){
                        params.callback(request)
                    })
                } else {
                    params.callback(request);
                }
            };
            request.send();
        }
        else {
            addToPage(params.callback)
        }
    }
}

export default Pod_helper
