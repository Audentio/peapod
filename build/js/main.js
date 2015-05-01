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
 * @file Controls synchronous and asynchronous events
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 *
 */

peapod.events = {
	items: [],
	currentId: 0,
	
	makeEvent: function(name, func, priority){
		if (name.length > 0) items.push({
			name: name, 
			func: func, 
			priority: priority, 
			id: peapod.events.currentId
		});

		peapod.events.currentId++;
	},

	bind: function(name, func, priority){
		var pe = peapod.events;
		if (name.indexOf(" ") > -1){
			var names = name.split(" ");
			for (var i = 0, len = names.length; i < len; i++){
				pe.makeEvent(names[i], func, priority);
			}
		} else {
			pe.makeEvent(name, func, priority);
		}
	},

	unbind: function(){

	},

	trigger: function(){

	},

	bindOnce: function(){

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
 * Function to perform selectors
 * @param  {string} sel  selector string
 * @param  {function} func optional function to run on each element
 * @param  {element} root root of selection, default to document if none set
 * @return {array}      array of elements
 */
peapod.sel = function(sel, func, root){
	if (!peapod.isSet(root)) root = document;
	if (peapod.isSet(func)) return peapod.select.phrases(root, sel, func);
	return peapod.select.phrases(root, sel);
};

/**
 * Function to execute a function on each member of an array
 * @param  {array} items array of items to iterate over
 * @param  {function} func  function to perform
 * @param  {bool} useParam  set to false to not pass the item as a parameter for the function
 * @return {void}       
 */
peapod.forEach = function(items, func, useParam){
	var i = 0, len = items.length;
	if (!useParam){
		for (i; i < len; i++){
			func();
		}
	} else {
		for (i; i < len; i++){
			func(items[i]);
		}
	}
};

/**
 * @file File to extend selectors to be a bit more efficient in most cases
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 *
 */


peapod.select = {
	/**
	 * Selector for a classname
	 * @param  {element} root element to select from
	 * @param  {string} sel  selector
	 * @param  {function} func optional function to call on results
	 * @return {array}      elements returned
	 */
	className: function(root, sel, func){
		var eles = root.getElementsByClassName(sel);
		if (peapod.isSet(eles)){
			if (peapod.isSet(func)){
				for (var i = 0, len = eles.length; i < len; i++){
					func(eles[i]);
				}
			}
			return eles;
		}
		return null;
	},

	/**
	 * Selector for a classname
	 * @param  {element} root element to select from
	 * @param  {string} sel  selector
	 * @param  {function} func optional function to call on results
	 * @return {array}      elements returned
	 */
	classNames: function(root, sel, func){
		var classes = "",
			selSplit = sel.split(".");
		for (var i = 1, len = selSplit.length; i < len; i++){
			if (classes === ""){
				classes = selSplit[i];
			} else {
				classes += " " + selSplit[i];
			}
		}
		return peapod.select.className(root, classes, func);
	},

	/**
	 * Selector for a tagname
	 * @param  {element} root element to select from
	 * @param  {string} sel  selector
	 * @param  {function} func optional function to call on results
	 * @return {array}      elements returned
	 */
	tagName: function(root, sel, func){
		var eles = root.getElementsByTagName(sel);
		if (peapod.isSet(eles)){
			if (peapod.isSet(func)){
				for (var i = 0, len = eles.length; i < len; i++){
					func(eles[i]);
				}
			}
			return eles;
		}
		return null;
	},

	/**
	 * Selector for anything
	 * @param  {element} root element to select from
	 * @param  {string} sel  selector
	 * @param  {function} func optional function to call on results
	 * @return {array}      elements returned
	 */
	query: function(root, sel, func){
		var eles = root.querySelectorAll(sel);
		if (eles.length){
			if (peapod.isSet(func)) {
				for (var i = 0, len = eles.length; i < len; i++){
					func(eles[i]);
				}
			}
			return eles;
		}
		return null;
	},

	/**
	 * Selector for a single word (no spaces or commas)
	 * @param  {element} root element to select from
	 * @param  {string} sel  selector
	 * @param  {function} func optional function to call on results
	 * @return {array}      elements returned
	 */
	word: function(root, sel, func){
		if (sel.indexOf(".") !== -1){
			var selSplit = sel.split(".");
			if (selSplit[0].length === 0){
				return peapod.select.classNames(root, sel, func);
			} else {
				peapod.select.query(root, sel, func);
			}
		} else {
			return peapod.select.tagName(root, sel, func);
		}
		return null;
	},

	/**
	 * Selector for a general phrase
	 * @param  {element} root element to select from
	 * @param  {string} sel  selector
	 * @param  {function} func optional function to call on results
	 * @return {array}      elements returned
	 */
	phrases: function(root, sel, func){
		if (sel.indexOf(",") > -1 || sel.indexOf(" ") > -1 || sel.indexOf("!") > -1 || sel.indexOf("#") > -1 || sel.indexOf(">") > -1){
			peapod.select.query(root, sel, func);
		} else {
			return peapod.select.word(root, sel, func);
		}
	}
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

