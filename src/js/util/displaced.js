/**
 * @file Utility functions for displaced elements
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 */

$pp.displaced = {
	needsInit: true,
	defaults: {
		trigger: null,
		altTriggers: [],
		triggerClick: function() {
			return true;
		},
		triggerHover: function() {
			return true;
		},
		type: 'menu',
	},
	items: [],
	addQueue: [],

	add: function(classNames, defaults, forceInit) {
		if ($pp.isSet(defaults)) {
			defaults = $pp.setDefaults($pp.displaced.defaults, defaults);
		} else {
			defaults = $pp.displaced.defaults;
		}

		if (forceInit || !$pp.displaced.needsInit) {
			classNames = classNames.split(',');
			for (var i = 0, len = classNames.length; i < len; i++) {
				var sel = document.getElementsByClassName(classNames[i]);
				for (var j = 0, len2 = sel.length; j < len2; j++) {
					if (!$pp.hasClass(sel[j], defaults.ignoreDivClass)) {
						var item = new $ppDisplaced(sel[j], defaults);
						$pp.displaced.items.push(item);
					}
				}
			}
		}

		if (!$pp.displaced.needsInit) {
			$pp.displaced.init();
		} else if (!forceInit) {
			$pp.displaced.addQueue.push({sel: classNames, defaults: defaults});
		}
	},

	initGet: function(defaults) {
		$pp.displaced.defaults = $pp.setDefaults($pp.displaced.defaults, defaults);

		for (var i = 0, len = $pp.displaced.addQueue.length; i < len; i++) {
			var def = $pp.displaced.addQueue[i].defaults;
			if (!$pp.isSet(def)) {
				def = $pp.displaced.defaults;
			} else {
				def = $pp.setDefaults($pp.displaced.defaults, def);
			}
			$pp.displaced.add($pp.displaced.addQueue[i].sel, def, true);
		}
	},

	initSet: function() {
		$pp.displaced.needsInit = false;
	},

	init: function(defaults) {
		var pd = $pp.displaced;
		pd.initGet(defaults);
		pd.initSet();
	}
};

function $ppDisplaced(ele, defaults) {
	this.ele = ele;
	this.defaults = defaults;
}

$ppDisplaced.method('getEle', function() {
	return this.ele;
});

$ppDisplaced.method('getType', function() {
	return this.type;
});

$ppDisplaced.method('getDefaults', function() {
	return this.defaults;
});
