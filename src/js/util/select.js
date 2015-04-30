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