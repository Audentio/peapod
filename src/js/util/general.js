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
