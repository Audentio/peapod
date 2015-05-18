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
$pp.coords = function(ele, types) {
	var ret = {};

	if ($pp.isSet(ele) && types.length > 0) {

		types = types.toLowerCase().split(',');

		for (var i = 0, len = types.length; i < len; i++) {
			switch (types[i]) {
				case 'clientrect':
					var coords = ele.getBoundingClientRect();
					ret.clientLeft = coords.left;
					ret.clientRight = coords.right;
					ret.clientTop = coords.top;
					ret.clientBottom = coords.bottom;
					ret.clientWidth = ret.clientRight - ret.clientLeft;
					ret.clientHeight = ret.clientBottom - ret.clientTop;
					break;
				case 'offset':
					ret.offsetLeft = ele.offsetLeft;
					ret.offsetRight = ele.offsetRight;
					ret.offsetTop = ele.offsetTop;
					ret.offsetBottom = ele.offsetBottom;
					ret.offsetWidth = ele.offsetWidth;
					ret.offsetHeight = ele.offsetHeight;
					break;
			}
		}
	}

	return ret;
};
