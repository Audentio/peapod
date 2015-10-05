
$pp.animatable = {
	needsInit: true,
	defaults: {
		ignoreClass: $pp.name('animatableIgnore')
	},
	items: [],
	addQueue: [],

	add: function(classNames, defaults, forceInit) {
		if (forceInit || !$pp.animatable.needsInit) {
			defaults = $pp.setDefaults($pp.animatable.defaults, defaults);

			classNames = classNames.split(',');
			for (var i = 0, len = classNames.length; i < len; i++) {
				var sel = document.getElementsByClassName(classNames[i]);
				for (var j = 0, len2 = sel.length; j < len2; j++) {
					if (!$pp.hasClass(sel[j], defaults.ignoreClass)) {
						var item = new $ppAnimatable(sel[j], defaults);
						$pp.animatable.items.push(item);
					}
				}
			}
		} else {
			if (!$pp.isSet(defaults)) {
				defaults = null;
			}
		}

		if (!$pp.animatable.needsInit) {
			$pp.animatable.init();
		} else if (!forceInit) {
			$pp.animatable.addQueue.push({sel: classNames, defaults: defaults});
		}
	},

	initGet: function(defaults) {
		$pp.animatable.defaults = $pp.setDefaults($pp.animatable.defaults, defaults);

		for (var i = 0, len = $pp.animatable.addQueue.length; i < len; i++) {
			$pp.animatable.add($pp.animatable.addQueue[i].sel, $pp.animatable.addQueue[i].defaults, true);
		}

		$pp.animatable.addQueue = [];

		for (i = 0, len = $pp.animatable.items.length; i < len; i++) {
			$pp.animatable.items[i].initGet();
		}

		if ($pp.animatable.needsInit) { // initialization
		}
	},

	initSet: function() {
		for (var index = 0, len = $pp.animatable.items.length; index < len; index++) {
			$pp.animatable.items[index].initSet();
		}

		$pp.animatable.needsInit = false;
	},

	init: function(defaults) {
		$pp.animatable.initGet(defaults);
		$pp.animatable.initSet();
	}
};

function $ppAnimatable(ele, type, defaults) {
	this.ele = ele;
	this.defaults = defaults;
	this.needsInit = true;
}

// Get the wrapper element of the dispalced element
$ppAnimatable.method('getEle', function() {
	return this.ele;
});

// Get all defaults
$ppAnimatable.method('getDefaults', function() {
	return this.defaults;
});

// Get a default value
$ppAnimatable.method('getDefault', function(key) {
	return this.defaults[key];
});

// override a default value
$ppAnimatable.method('setDefault', function(key, val) {
	this.defaults[key] = val;
});

$ppAnimatable.method('resize', function() {
	this.resizeGet();
	this.resizeSet();
});

$ppAnimatable.method('resizeGet', function() {
});

$ppAnimatable.method('resizeSet', function() {
});

$ppAnimatable.method('init', function() {
	this.initGet();
	this.initSet();
});

$ppAnimatable.method('initGet', function() {
});

$ppAnimatable.method('initSet', function() {
	this.needsInit = false;
});
