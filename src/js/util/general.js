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
$pp.name = function(val, type) {
	var cssUnique = peapod.vars.cssUnique;
	if (type === 'state') {
		return 'is-' + val + cssUnique;
	} else if (type === 'general') {
		return val + cssUnique;
	} else if (type === 'js') {
		return 'js-' + val + cssUnique;
	} else {
		return 'js-' + val + cssUnique;
	}
};

/**
 * Function to see if a variable has been set to a value
 * @param  {string}  val variable
 * @return {Boolean}     if it's set
 */
$pp.isSet = function(val) {
	if (typeof(val) === 'undefined') {
		return false;
	}
	if (val === null) {
		return false;
	}
	return true;
};

/**
 * Function to perform selectors
 * @param  {string} sel  selector string
 * @param  {function} func optional function to run on each element
 * @param  {element} root root of selection, default to document if none set
 * @return {array}      array of elements
 */
$pp.sel = function(sel, func, root) {
	if (!peapod.isSet(root)) {
		root = document;
	}
	if (peapod.isSet(func)) {
		return peapod.select.phrases(root, sel, func);
	}
	return peapod.select.phrases(root, sel);
};

/**
 * Function to execute a function on each member of an array
 * @param  {array} items array of items to iterate over
 * @param  {function} func  function to perform
 * @param  {bool} useParam  set to false to not pass the item as a parameter for the function
 * @return {void}
 */
$pp.forEach = function(items, func, useParam) {
	var i = 0, len = items.length;
	if (!useParam) {
		for (i; i < len; i++) {
			func();
		}
	} else {
		for (i; i < len; i++) {
			func(items[i]);
		}
	}
};
