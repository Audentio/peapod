/**
 * @file File to initialize peapod object
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 */

/**
 * Initialize peapod object
 */

/**
 * @module PeaPod
 */

var peapod = peapod || {};
/**
 * @file General debugging functions
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 */

/**
 * General Function to log performance related information and debug information
 * @type {Object}
 */
peapod.debug = {
	items: [],

	out: function(){
		console.log("Debug info goes here...");
	},

	log: function(msg){
		if (peapod.vars.debug) console.log(msg);
	},

	spaceToLength: function(input, length) {
		var result = input;
		for (var i = input.length; i <= length; i++) {
			result += " ";
		}
		return result;
	},

	tStamp: function (label, level, startTime) {
		if (peapod.vars.performanceLog && startTime !== null) peapod.log(label + ": " + peapod.round(peapod.debug.time() - startTime, 5) + " ms");
	},

	time: function(force){
		if (force || peapod.vars.performanceLog) {
			if (!peapod.isSet(window.performance)) return Date.now();
			return window.performance.now ? (performance.now() + performance.timing.navigationStart) : Date.now();
		}
		return null;
	},

	round: function(num, points){
		return Math.round(num * Math.pow(10, points)) / Math.pow(10, points);
	}
};


/**
 * @file Utility functions for displaced elements
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 */
/**
 * @file General utility functions
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 *
 */


/**
 * Function to create a class name for use in the DOM
 * @function creates a class name for use in the DOM
 * @param  {string} val  base class name
 * @param  {string} type option for the type of classname to generate (state, general, js, or blank)
 * @return {string}      resulting class name
 */
peapod.name = function(val, type){
	var cssUnique = peapod.vars.cssUnique;
	if (type === "state"){
		return "is-" + val + cssUnique;
	} else if (type === "general") {
		return val + cssUnique;
	} else if (type === "js") {
		return "js-" + val + cssUnique;
	} else {
		return "js-" + val + cssUnique;
	}
};

/**
 * Function to see if a variable has been set to a value
 * @param  {string}  val variable
 * @return {Boolean}     if it's set
 */
peapod.isSet = function(val){
	if (typeof(val) === "undefined") return false;
	if (val === null) return false;
	return true;
};

/**
 * @file Main file for all js
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 */

/**
 * Declare variables set inside the file
 * @type {Object}
 */
peapod.vars = {
	version: '0.0.0.1 Alpha',
	needsInit: true,
	cssUnique: '--P',
	debug: true,
	performanceLog: true
};


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJkZWJ1Zy5qcyIsImRpc3BsYWNlZC5qcyIsImdlbmVyYWwuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEZpbGUgdG8gaW5pdGlhbGl6ZSBwZWFwb2Qgb2JqZWN0XG4gKlxuICogQHZlcnNpb24gJHsgcGtnLnZlcnNpb24gfVxuICogQGF1dGhvciAkeyBwa2cuYXV0aG9yIH1cbiAqXG4gKiBAbGljZW5zZSAkeyBwa2cubGljZW5zZSB9LlxuICogQGNvcHlyaWdodCAkeyBwa2cuYXV0aG9yIH1cbiAqL1xuXG4vKipcbiAqIEluaXRpYWxpemUgcGVhcG9kIG9iamVjdFxuICovXG5cbi8qKlxuICogQG1vZHVsZSBQZWFQb2RcbiAqL1xuXG52YXIgcGVhcG9kID0gcGVhcG9kIHx8IHt9OyIsIi8qKlxuICogQGZpbGUgR2VuZXJhbCBkZWJ1Z2dpbmcgZnVuY3Rpb25zXG4gKlxuICogQHZlcnNpb24gJHsgcGtnLnZlcnNpb24gfVxuICogQGF1dGhvciAkeyBwa2cuYXV0aG9yIH1cbiAqXG4gKiBAbGljZW5zZSAkeyBwa2cubGljZW5zZSB9LlxuICogQGNvcHlyaWdodCAkeyBwa2cuYXV0aG9yIH1cbiAqL1xuXG4vKipcbiAqIEdlbmVyYWwgRnVuY3Rpb24gdG8gbG9nIHBlcmZvcm1hbmNlIHJlbGF0ZWQgaW5mb3JtYXRpb24gYW5kIGRlYnVnIGluZm9ybWF0aW9uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5wZWFwb2QuZGVidWcgPSB7XG5cdGl0ZW1zOiBbXSxcblxuXHRvdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0Y29uc29sZS5sb2coXCJEZWJ1ZyBpbmZvIGdvZXMgaGVyZS4uLlwiKTtcblx0fSxcblxuXHRsb2c6IGZ1bmN0aW9uKG1zZyl7XG5cdFx0aWYgKHBlYXBvZC52YXJzLmRlYnVnKSBjb25zb2xlLmxvZyhtc2cpO1xuXHR9LFxuXG5cdHNwYWNlVG9MZW5ndGg6IGZ1bmN0aW9uKGlucHV0LCBsZW5ndGgpIHtcblx0XHR2YXIgcmVzdWx0ID0gaW5wdXQ7XG5cdFx0Zm9yICh2YXIgaSA9IGlucHV0Lmxlbmd0aDsgaSA8PSBsZW5ndGg7IGkrKykge1xuXHRcdFx0cmVzdWx0ICs9IFwiIFwiO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9LFxuXG5cdHRTdGFtcDogZnVuY3Rpb24gKGxhYmVsLCBsZXZlbCwgc3RhcnRUaW1lKSB7XG5cdFx0aWYgKHBlYXBvZC52YXJzLnBlcmZvcm1hbmNlTG9nICYmIHN0YXJ0VGltZSAhPT0gbnVsbCkgcGVhcG9kLmxvZyhsYWJlbCArIFwiOiBcIiArIHBlYXBvZC5yb3VuZChwZWFwb2QuZGVidWcudGltZSgpIC0gc3RhcnRUaW1lLCA1KSArIFwiIG1zXCIpO1xuXHR9LFxuXG5cdHRpbWU6IGZ1bmN0aW9uKGZvcmNlKXtcblx0XHRpZiAoZm9yY2UgfHwgcGVhcG9kLnZhcnMucGVyZm9ybWFuY2VMb2cpIHtcblx0XHRcdGlmICghcGVhcG9kLmlzU2V0KHdpbmRvdy5wZXJmb3JtYW5jZSkpIHJldHVybiBEYXRlLm5vdygpO1xuXHRcdFx0cmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyAocGVyZm9ybWFuY2Uubm93KCkgKyBwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0KSA6IERhdGUubm93KCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9LFxuXG5cdHJvdW5kOiBmdW5jdGlvbihudW0sIHBvaW50cyl7XG5cdFx0cmV0dXJuIE1hdGgucm91bmQobnVtICogTWF0aC5wb3coMTAsIHBvaW50cykpIC8gTWF0aC5wb3coMTAsIHBvaW50cyk7XG5cdH1cbn07XG5cbiIsIi8qKlxuICogQGZpbGUgVXRpbGl0eSBmdW5jdGlvbnMgZm9yIGRpc3BsYWNlZCBlbGVtZW50c1xuICpcbiAqIEB2ZXJzaW9uICR7IHBrZy52ZXJzaW9uIH1cbiAqIEBhdXRob3IgJHsgcGtnLmF1dGhvciB9XG4gKlxuICogQGxpY2Vuc2UgJHsgcGtnLmxpY2Vuc2UgfS5cbiAqIEBjb3B5cmlnaHQgJHsgcGtnLmF1dGhvciB9XG4gKi8iLCIvKipcbiAqIEBmaWxlIEdlbmVyYWwgdXRpbGl0eSBmdW5jdGlvbnNcbiAqXG4gKiBAdmVyc2lvbiAkeyBwa2cudmVyc2lvbiB9XG4gKiBAYXV0aG9yICR7IHBrZy5hdXRob3IgfVxuICpcbiAqIEBsaWNlbnNlICR7IHBrZy5saWNlbnNlIH0uXG4gKiBAY29weXJpZ2h0ICR7IHBrZy5hdXRob3IgfVxuICpcbiAqL1xuXG5cbi8qKlxuICogRnVuY3Rpb24gdG8gY3JlYXRlIGEgY2xhc3MgbmFtZSBmb3IgdXNlIGluIHRoZSBET01cbiAqIEBmdW5jdGlvbiBjcmVhdGVzIGEgY2xhc3MgbmFtZSBmb3IgdXNlIGluIHRoZSBET01cbiAqIEBwYXJhbSAge3N0cmluZ30gdmFsICBiYXNlIGNsYXNzIG5hbWVcbiAqIEBwYXJhbSAge3N0cmluZ30gdHlwZSBvcHRpb24gZm9yIHRoZSB0eXBlIG9mIGNsYXNzbmFtZSB0byBnZW5lcmF0ZSAoc3RhdGUsIGdlbmVyYWwsIGpzLCBvciBibGFuaylcbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICByZXN1bHRpbmcgY2xhc3MgbmFtZVxuICovXG5wZWFwb2QubmFtZSA9IGZ1bmN0aW9uKHZhbCwgdHlwZSl7XG5cdHZhciBjc3NVbmlxdWUgPSBwZWFwb2QudmFycy5jc3NVbmlxdWU7XG5cdGlmICh0eXBlID09PSBcInN0YXRlXCIpe1xuXHRcdHJldHVybiBcImlzLVwiICsgdmFsICsgY3NzVW5pcXVlO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09IFwiZ2VuZXJhbFwiKSB7XG5cdFx0cmV0dXJuIHZhbCArIGNzc1VuaXF1ZTtcblx0fSBlbHNlIGlmICh0eXBlID09PSBcImpzXCIpIHtcblx0XHRyZXR1cm4gXCJqcy1cIiArIHZhbCArIGNzc1VuaXF1ZTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gXCJqcy1cIiArIHZhbCArIGNzc1VuaXF1ZTtcblx0fVxufTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBzZWUgaWYgYSB2YXJpYWJsZSBoYXMgYmVlbiBzZXQgdG8gYSB2YWx1ZVxuICogQHBhcmFtICB7c3RyaW5nfSAgdmFsIHZhcmlhYmxlXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgaWYgaXQncyBzZXRcbiAqL1xucGVhcG9kLmlzU2V0ID0gZnVuY3Rpb24odmFsKXtcblx0aWYgKHR5cGVvZih2YWwpID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XG5cdGlmICh2YWwgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIHRydWU7XG59O1xuIiwiLyoqXG4gKiBAZmlsZSBNYWluIGZpbGUgZm9yIGFsbCBqc1xuICpcbiAqIEB2ZXJzaW9uICR7IHBrZy52ZXJzaW9uIH1cbiAqIEBhdXRob3IgJHsgcGtnLmF1dGhvciB9XG4gKlxuICogQGxpY2Vuc2UgJHsgcGtnLmxpY2Vuc2UgfS5cbiAqIEBjb3B5cmlnaHQgJHsgcGtnLmF1dGhvciB9XG4gKi9cblxuLyoqXG4gKiBEZWNsYXJlIHZhcmlhYmxlcyBzZXQgaW5zaWRlIHRoZSBmaWxlXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5wZWFwb2QudmFycyA9IHtcblx0dmVyc2lvbjogJzAuMC4wLjEgQWxwaGEnLFxuXHRuZWVkc0luaXQ6IHRydWUsXG5cdGNzc1VuaXF1ZTogJy0tUCcsXG5cdGRlYnVnOiB0cnVlLFxuXHRwZXJmb3JtYW5jZUxvZzogdHJ1ZVxufTtcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9