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

peapod.displaced = {
	needsInit: true,
	items: [],

	initGet: function(){

	},

	initSet: function(){

	},

	init: function(){
		var pd = peapod.displaced;
		pd.initGet();
		pd.initSet();
	}
};
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluaXQuanMiLCJkZWJ1Zy5qcyIsImRpc3BsYWNlZC5qcyIsImdlbmVyYWwuanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlIEZpbGUgdG8gaW5pdGlhbGl6ZSBwZWFwb2Qgb2JqZWN0XG4gKlxuICogQHZlcnNpb24gJHsgcGtnLnZlcnNpb24gfVxuICogQGF1dGhvciAkeyBwa2cuYXV0aG9yIH1cbiAqXG4gKiBAbGljZW5zZSAkeyBwa2cubGljZW5zZSB9LlxuICogQGNvcHlyaWdodCAkeyBwa2cuYXV0aG9yIH1cbiAqL1xuXG4vKipcbiAqIEluaXRpYWxpemUgcGVhcG9kIG9iamVjdFxuICovXG5cbnZhciBwZWFwb2QgPSBwZWFwb2QgfHwge307IiwiLyoqXG4gKiBAZmlsZSBHZW5lcmFsIGRlYnVnZ2luZyBmdW5jdGlvbnNcbiAqXG4gKiBAdmVyc2lvbiAkeyBwa2cudmVyc2lvbiB9XG4gKiBAYXV0aG9yICR7IHBrZy5hdXRob3IgfVxuICpcbiAqIEBsaWNlbnNlICR7IHBrZy5saWNlbnNlIH0uXG4gKiBAY29weXJpZ2h0ICR7IHBrZy5hdXRob3IgfVxuICovXG5cbi8qKlxuICogR2VuZXJhbCBGdW5jdGlvbiB0byBsb2cgcGVyZm9ybWFuY2UgcmVsYXRlZCBpbmZvcm1hdGlvbiBhbmQgZGVidWcgaW5mb3JtYXRpb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnBlYXBvZC5kZWJ1ZyA9IHtcblx0aXRlbXM6IFtdLFxuXG5cdG91dDogZnVuY3Rpb24oKXtcblx0XHRjb25zb2xlLmxvZyhcIkRlYnVnIGluZm8gZ29lcyBoZXJlLi4uXCIpO1xuXHR9LFxuXG5cdGxvZzogZnVuY3Rpb24obXNnKXtcblx0XHRpZiAocGVhcG9kLnZhcnMuZGVidWcpIGNvbnNvbGUubG9nKG1zZyk7XG5cdH0sXG5cblx0c3BhY2VUb0xlbmd0aDogZnVuY3Rpb24oaW5wdXQsIGxlbmd0aCkge1xuXHRcdHZhciByZXN1bHQgPSBpbnB1dDtcblx0XHRmb3IgKHZhciBpID0gaW5wdXQubGVuZ3RoOyBpIDw9IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRyZXN1bHQgKz0gXCIgXCI7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG5cblx0dFN0YW1wOiBmdW5jdGlvbiAobGFiZWwsIGxldmVsLCBzdGFydFRpbWUpIHtcblx0XHRpZiAocGVhcG9kLnZhcnMucGVyZm9ybWFuY2VMb2cgJiYgc3RhcnRUaW1lICE9PSBudWxsKSBwZWFwb2QubG9nKGxhYmVsICsgXCI6IFwiICsgcGVhcG9kLnJvdW5kKHBlYXBvZC5kZWJ1Zy50aW1lKCkgLSBzdGFydFRpbWUsIDUpICsgXCIgbXNcIik7XG5cdH0sXG5cblx0dGltZTogZnVuY3Rpb24oZm9yY2Upe1xuXHRcdGlmIChmb3JjZSB8fCBwZWFwb2QudmFycy5wZXJmb3JtYW5jZUxvZykge1xuXHRcdFx0aWYgKCFwZWFwb2QuaXNTZXQod2luZG93LnBlcmZvcm1hbmNlKSkgcmV0dXJuIERhdGUubm93KCk7XG5cdFx0XHRyZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdyA/IChwZXJmb3JtYW5jZS5ub3coKSArIHBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpIDogRGF0ZS5ub3coKTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH0sXG5cblx0cm91bmQ6IGZ1bmN0aW9uKG51bSwgcG9pbnRzKXtcblx0XHRyZXR1cm4gTWF0aC5yb3VuZChudW0gKiBNYXRoLnBvdygxMCwgcG9pbnRzKSkgLyBNYXRoLnBvdygxMCwgcG9pbnRzKTtcblx0fVxufTtcblxuIiwiLyoqXG4gKiBAZmlsZSBVdGlsaXR5IGZ1bmN0aW9ucyBmb3IgZGlzcGxhY2VkIGVsZW1lbnRzXG4gKlxuICogQHZlcnNpb24gJHsgcGtnLnZlcnNpb24gfVxuICogQGF1dGhvciAkeyBwa2cuYXV0aG9yIH1cbiAqXG4gKiBAbGljZW5zZSAkeyBwa2cubGljZW5zZSB9LlxuICogQGNvcHlyaWdodCAkeyBwa2cuYXV0aG9yIH1cbiAqL1xuXG5wZWFwb2QuZGlzcGxhY2VkID0ge1xuXHRuZWVkc0luaXQ6IHRydWUsXG5cdGl0ZW1zOiBbXSxcblxuXHRpbml0R2V0OiBmdW5jdGlvbigpe1xuXG5cdH0sXG5cblx0aW5pdFNldDogZnVuY3Rpb24oKXtcblxuXHR9LFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIHBkID0gcGVhcG9kLmRpc3BsYWNlZDtcblx0XHRwZC5pbml0R2V0KCk7XG5cdFx0cGQuaW5pdFNldCgpO1xuXHR9XG59OyIsIi8qKlxuICogQGZpbGUgR2VuZXJhbCB1dGlsaXR5IGZ1bmN0aW9uc1xuICpcbiAqIEB2ZXJzaW9uICR7IHBrZy52ZXJzaW9uIH1cbiAqIEBhdXRob3IgJHsgcGtnLmF1dGhvciB9XG4gKlxuICogQGxpY2Vuc2UgJHsgcGtnLmxpY2Vuc2UgfS5cbiAqIEBjb3B5cmlnaHQgJHsgcGtnLmF1dGhvciB9XG4gKlxuICovXG5cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBjcmVhdGUgYSBjbGFzcyBuYW1lIGZvciB1c2UgaW4gdGhlIERPTVxuICogQGZ1bmN0aW9uIGNyZWF0ZXMgYSBjbGFzcyBuYW1lIGZvciB1c2UgaW4gdGhlIERPTVxuICogQHBhcmFtICB7c3RyaW5nfSB2YWwgIGJhc2UgY2xhc3MgbmFtZVxuICogQHBhcmFtICB7c3RyaW5nfSB0eXBlIG9wdGlvbiBmb3IgdGhlIHR5cGUgb2YgY2xhc3NuYW1lIHRvIGdlbmVyYXRlIChzdGF0ZSwgZ2VuZXJhbCwganMsIG9yIGJsYW5rKVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgIHJlc3VsdGluZyBjbGFzcyBuYW1lXG4gKi9cbnBlYXBvZC5uYW1lID0gZnVuY3Rpb24odmFsLCB0eXBlKXtcblx0dmFyIGNzc1VuaXF1ZSA9IHBlYXBvZC52YXJzLmNzc1VuaXF1ZTtcblx0aWYgKHR5cGUgPT09IFwic3RhdGVcIil7XG5cdFx0cmV0dXJuIFwiaXMtXCIgKyB2YWwgKyBjc3NVbmlxdWU7XG5cdH0gZWxzZSBpZiAodHlwZSA9PT0gXCJnZW5lcmFsXCIpIHtcblx0XHRyZXR1cm4gdmFsICsgY3NzVW5pcXVlO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09IFwianNcIikge1xuXHRcdHJldHVybiBcImpzLVwiICsgdmFsICsgY3NzVW5pcXVlO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBcImpzLVwiICsgdmFsICsgY3NzVW5pcXVlO1xuXHR9XG59O1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIHNlZSBpZiBhIHZhcmlhYmxlIGhhcyBiZWVuIHNldCB0byBhIHZhbHVlXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICB2YWwgdmFyaWFibGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICBpZiBpdCdzIHNldFxuICovXG5wZWFwb2QuaXNTZXQgPSBmdW5jdGlvbih2YWwpe1xuXHRpZiAodHlwZW9mKHZhbCkgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcblx0aWYgKHZhbCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIvKipcbiAqIEBmaWxlIE1haW4gZmlsZSBmb3IgYWxsIGpzXG4gKlxuICogQHZlcnNpb24gJHsgcGtnLnZlcnNpb24gfVxuICogQGF1dGhvciAkeyBwa2cuYXV0aG9yIH1cbiAqXG4gKiBAbGljZW5zZSAkeyBwa2cubGljZW5zZSB9LlxuICogQGNvcHlyaWdodCAkeyBwa2cuYXV0aG9yIH1cbiAqL1xuXG4vKipcbiAqIERlY2xhcmUgdmFyaWFibGVzIHNldCBpbnNpZGUgdGhlIGZpbGVcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnBlYXBvZC52YXJzID0ge1xuXHR2ZXJzaW9uOiAnMC4wLjAuMSBBbHBoYScsXG5cdG5lZWRzSW5pdDogdHJ1ZSxcblx0Y3NzVW5pcXVlOiAnLS1QJyxcblx0ZGVidWc6IHRydWUsXG5cdHBlcmZvcm1hbmNlTG9nOiB0cnVlXG59O1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=