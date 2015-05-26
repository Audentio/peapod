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

Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};

Function.method('inheritsFrom', function(parent) {
	if (parent.constructor == Function) {
		this.prototype = new parent();
		this.prototype.constructor = this;
		this.prototype.uber = parent.prototype;
	} else {
		this.prototype = parent;
		this.prototype.constructor = this;
		this.prototype.uber = parent;
	}
	return this;
});

/**
 * Function to create a class name for use in the DOM
 * @function creates a class name for use in the DOM
 * @param  {string} val  base class name
 * @param  {string} type option for the type of classname to generate (state, general, js, or blank)
 * @return {string}      resulting class name
 */
$pp.name = function(val, type) {
	var cssUnique = $pp.vars.cssUnique;
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
 * Function to generate a unique ID
 * @return {[type]} [description]
 */
$pp.uniqueId = function() {
	var unique = $pp.name('uniqueID_' + $pp.vars.uniqueId);
	$pp.vars.uniqueId++;
	while ($pp.isSet(document.getElementById(unique))) {
		unique = $pp.name('uniqueID_' + $pp.vars.uniqueId);
		$pp.vars.uniqueId++;
	}
	return unique;
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

/**
 * Gets keys of an object or returns null
 * @param  {object} obj object to get keys of
 * @return {array}     keys of the object or null
 */
$pp.getKeys = function(obj) {
	if (typeof(obj) === 'object') {
		return Object.keys(obj);
	}
	return null;
};

/**
 * Compares keys in global and local object and overrides any global keys with local keys
 * @param {object} global global object, will be overwritten with local if local set
 * @param {object} local  local object
 */
$pp.setDefaults = function(global, local) {
	if ($pp.isSet(global) && $pp.isSet(local)) {
		var keys = $pp.getKeys(local);
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i];
			if ($pp.isSet(global[key])) {
				global[key] = local[key];
			}
		}
	}
	return global;
};

/**
 * Function to see if an element has a given class
 * @param  {element}  ele       element to check
 * @param  {string}  className class to look for
 * @return {Boolean}           if the element has the class
 */
$pp.hasClass = function(ele, className) {
	if ($pp.isSet(ele) && $pp.isSet(className) && className.length > 0) {
		className = className.replace(' ', '').replace('.', '').split(',');
		var classes = ele.className.split(' ');
		for (var i = 0, len = className.length; i < len; i++) {
			for (var j = 0, len2 = classes.length; j < len2; j++) {
				if (classes[j] == className[i]) {
					return true;
				}
			}
		}
	}
	return false;
};
