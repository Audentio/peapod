/**
 * @file General coordinate functions
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 *
 */

/**
 * Function to get specified coordinates of an element
 * @param  {element} ele   element to get coordinates of
 * @param  {string} types comma separated list of what coordinates to get [clientrect]
 * @return {object}       object of requested coordinates
 */
$pp.coords = function(ele, type) {
	var ret = {};

	if ($pp.isSet(ele) && $pp.isSet(type) && type.length > 0) {

		switch (type) {
			case 'clientrect':
				ret.left = ele.clientLeft;
				ret.right = ele.clientLeft + ele.clientWidth;
				ret.top = ele.clientTop;
				ret.bottom = ele.clientTop + ele.clientHeight;
				ret.width = ele.clientWidth;
				ret.height = ele.clientHeight;
				break;
			case 'boundingclientrect':
				var coords = ele.getBoundingClientRect();
				ret.left = coords.left;
				ret.right = coords.right;
				ret.top = coords.top;
				ret.bottom = coords.bottom;
				ret.width = ret.clientRight - ret.clientLeft;
				ret.height = ret.clientBottom - ret.clientTop;
				break;
			case 'offset':
				ret.left = ele.offsetLeft;
				ret.right = ele.offsetLeft + ele.offsetWidth;
				ret.top = ele.offsetTop;
				ret.bottom = ele.offsetTop + ele.offsetHeight;
				ret.width = ele.offsetWidth;
				ret.height = ele.offsetHeight;
				break;
		}
	}

	return ret;
};
