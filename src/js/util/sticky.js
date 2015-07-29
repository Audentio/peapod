
$pp.sticky = {
	needsInit: true,
	defaults: {
		scrollStickyEnabled: false,
		scrollStickyDirection: 'down',
		scrollStickyMinPos: 500,
		scrollStickyMinDist: 0,
		heightMinPortrait: 0,
		heightMinLandscape: 0,
		heightMaxPortrait: 0,
		heightMaxLandscape: 0,
		widthMinPortrait: 330,
		widthMinLandscape: 500,
		widthMaxPortrait: 0,
		widthMaxLandscape: 0,
		type: 'top',
		boundEle: null,
		offset: 0,
		alwaysStick: false,
		allowFixed: true,
		normalHeight: 0,
		stickyHeight: 0,
		ignoreClass: $pp.name('stickyIgnore')
	},
	items: [],
	addQueue: [],
	scrollTop: 0,
	scrollBottom: 0,
	windowHeight: 0,
	windowWidth: 0,
	offsetTop: 0,
	offsetBottom: 0,
	isLandscape: true,
	updateNeeded: false,

	toggleFixed: function(val) {
		var ps = $pp.sticky;
		for (var index = 0, len = ps.items.length; index < len; index++) {
			$pp.sticky.items[index].lastPos = -1;
			//$pp.sticky.items[index].state = 0;
			//$pp.sticky.items[index].lastState = 0;
			$pp.sticky.items[index].getWrapper().style.bottom = '';
			$pp.sticky.items[index].getWrapper().style.top = '';
			$pp.sticky.items[index].setDefault('allowFixed', val);
			$pp.sticky.items[index].setFixed(val);
		}
		$pp.sticky.offsetTop = 0;
		$pp.sticky.offsetBottom = 0;
		$pp.sticky.updateNeeded = true;
		ps.scrollGet();
		ps.scrollSet();
	},

	add: function(classNames, defaults, forceInit) {
		var ps = $pp.sticky;

		if (forceInit || !ps.needsInit) {
			defaults = $pp.setDefaults(ps.defaults, defaults);

			classNames = classNames.split(',');
			for (var i = 0, len = classNames.length; i < len; i++) {
				var sel = document.getElementsByClassName(classNames[i]);
				for (var j = 0, len2 = sel.length; j < len2; j++) {
					if (!$pp.hasClass(sel[j], defaults.ignoreClass)) {
						var item = new $ppSticky(sel[j], defaults);
						$pp.sticky.items.push(item);
					}
				}
			}
		} else {
			if (!$pp.isSet(defaults)) {
				defaults = null;
			}
		}

		if (!ps.needsInit) {
			ps.init();
		} else if (!forceInit) {
			$pp.sticky.addQueue.push({sel: classNames, defaults: defaults});
		}
	},

	sortItems: function(unsortedItems) {
		var sortedItems = [];

		for (i = 0, len = unsortedItems.length; i < len; i++) {
			unsortedItems[i].setCoords();
		}

		for (var pos = 0; pos < 2; pos++) {
			var posName = (pos === 0) ? 'top' : 'bottom';

			for (itemIndex = 0, itemLen = unsortedItems.length; itemIndex < itemLen; itemIndex++) {
				var best = (pos === 0) ? Number.MAX_VALUE : -1,
					bestIndex = -1,
					item,
					coords,
					testCoord;

				if (pos === 0 && unsortedItems[itemIndex].getDefault('type') == posName) {
					for (i = 0, len = unsortedItems.length; i < len; i++) {
						item = unsortedItems[i];
						coords = item.coords;
						testCoord = coords.top + (coords.height / 1000000);

						if (testCoord < best && sortedItems.indexOf(item) === -1) {
							best = testCoord;
							bestIndex = i;
						}
					}
					sortedItems.push(unsortedItems[bestIndex]);
				} else if (pos === 1 && unsortedItems[itemIndex].getDefault('type') == posName) {
					for (i = 0, len = unsortedItems.length; i < len; i++) {
						item = unsortedItems[i];
						coords = item.coords;
						testCoord = coords.bottom - (coords.height / 1000000);

						if (testCoord > best && sortedItems.indexOf(item) === -1) {
							best = testCoord;
							bestIndex = i;
						}
					}
					sortedItems.push(unsortedItems[bestIndex]);
				}
			}
		}
		return sortedItems;
	},

	initGet: function(defaults) {
		var ps = $pp.sticky;

		$pp.sticky.defaults = $pp.setDefaults(ps.defaults, defaults);

		for (var i = 0, len = ps.addQueue.length; i < len; i++) {
			ps.add(ps.addQueue[i].sel, ps.addQueue[i].defaults, true);
		}

		$pp.sticky.addQueue = [];

		$pp.sticky.items = ps.sortItems(ps.items); // reorder items

		for (i = 0, len = ps.items.length; i < len; i++) {
			ps.items[i].initGet();
		}

		if (ps.needsInit) {
			peapod.events.bind('resize', function() {
				ps.resizeGet();
				ps.resizeSet();
			});

			peapod.events.bind('scroll', function() {
				ps.scrollGet();
				ps.scrollSet();
			});

			ps.resizeGet();
		}
	},

	resizeGet: function() {
		var ps = $pp.sticky,
			len = ps.items.length;

		$pp.sticky.windowWidth = ps.getWindowWidth();
		$pp.sticky.windowHeight = ps.getWindowHeight();

		if ($pp.sticky.windowWidth >= $pp.sticky.windowHeight) {
			$pp.sticky.isLandscape = true;
		} else {
			$pp.sticky.isLandscape = false;
		}

		for (var index = 0; index < len; index++) {
			ps.items[index].resizeGet();
		}

		for (index = 0; index < len; index++) {
			var attachedOffset = 0;
			for (var eleIndex = index + 1; eleIndex < len; eleIndex++) {
				if (ps.items[index].boundEle == ps.items[eleIndex].boundEle && ps.items[eleIndex].enabled) {
					attachedOffset += ps.items[eleIndex].getDefault('stickyHeight');
				}
			}
			ps.items[index].attachedOffset = attachedOffset;
		}

		ps.scrollGet();
	},

	resizeSet: function() {
		var ps = $pp.sticky;
		for (var index = 0, len = ps.items.length; index < len; index++) {
			ps.items[index].initSet();
		}

		ps.scrollSet();
	},

	resize: function() {
		$pp.sticky.resizeGet();
		$pp.sticky.resizeSet();
	},

	scrollGet: function() {
		var ps = $pp.sticky,
			currentOffsetTop = 0,
			currentOffsetBottom = 0,
			attachedOffset = 0,
			attachedOffsetExtra = 0, // account for offset top / bottom of attached eles
			changeMade = false;

		$pp.sticky.scrollTop = ps.getScrollTop();
		$pp.sticky.scrollBottom = ps.getScrollBottom();

		for (var index = 0, len = ps.items.length; index < len; index++) {
			var item = ps.items[index],
				coords = item.coords;

			if (item.enabled && ((coords.top - ps.scrollTop) <= currentOffsetTop) && item.getDefault('type') == 'top') {
				if (item.enabled && !item.lastEnabled) {
					changeMade = true;
				}

				if ((coords.height + currentOffsetTop + ps.scrollTop + attachedOffsetExtra) > (item.boundCoords.bottom - item.attachedOffset)) {
					item.setState(2, changeMade);
					attachedOffsetExtra += item.getDefault('stickyHeight');
				} else {
					item.setState(1, changeMade);
					currentOffsetTop += item.getDefault('stickyHeight');
				}
			} else if (item.enabled && ((coords.bottom - ps.scrollBottom) > (-1 * currentOffsetBottom)) && item.getDefault('type') == 'bottom') {
				if (item.enabled && !item.lastEnabled) {
					changeMade = true;
				}

				item.setState(1, changeMade);
				currentOffsetBottom += item.getDefault('stickyHeight');
			} else if (!item.enabled && item.lastEnabled) {
				changeMade = true;
				item.setState(0, changeMade);
			} else {
				item.setState(0, changeMade);
			}
		}

		if (changeMade) {
			$pp.sticky.updateNeeded = true;
		}
	},

	scrollSet: function() {
		var ps = $pp.sticky,
			currentOffsetTop = 0,
			currentOffsetBottom = 0;

		for (var index = 0, len = ps.items.length; index < len; index++) {
			var item = ps.items[index];

			if (item.state != item.lastState) {
				if (item.state === 2) {
					item.attach();
				} else if (item.state === 1) {
					item.stick();
				} else {
					item.unstick();
				}
			}

			if ((ps.updateNeeded || !item.getDefault('allowFixed')) && item.state !== 0) {
				if (item.getDefault('type') == 'top') {
					item.update(currentOffsetTop);
					currentOffsetTop += item.getDefault('stickyHeight');
				} else if (item.getDefault('type') == 'bottom') {
					item.update(currentOffsetBottom);
					currentOffsetBottom += item.getDefault('stickyHeight');
				}
			}
		}
		peapod.sticky.updateNeeded = false;
	},

	initSet: function() {
		$pp.sticky.resizeSet();
	},

	init: function(defaults) {
		$pp.sticky.initGet(defaults);
		$pp.sticky.initSet();
	},

	setOffset: function(pos, delta) {
		if (pos == 'top') {
			$pp.sticky.offsetTop += delta;
		} else if (pos == 'bottom') {
			$pp.sticky.offsetBottom += delta;
		}
	},

	getOffset: function(pos) {
		if (pos == 'top') {
			return $pp.sticky.offsetTop;
		} else if (pos == 'bottom') {
			return $pp.sticky.offsetBottom;
		}
	},

	getScrollTop: function() {
		return document.body.scrollTop || window.scrollY;
	},

	getWindowHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	},

	getWindowWidth: function() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	},

	getScrollBottom: function() {
		return $pp.sticky.getScrollTop() + $pp.sticky.getWindowHeight();
	}
};

function $ppSticky(ele, defaults) {
	this.ele = ele;
	this.wrapper = null;
	var stickyWrapper = ele.getElementsByClassName($pp.name('stickyWrapper'));
	if (stickyWrapper.length === 1) {
		this.wrapper = stickyWrapper[0];
	}
	this.defaults = defaults;
	this.needsInit = true;
	this.coords = null;
	this.boundCoords = null;
	this.boundEle = null;
	this.state = 0;
	this.lastState = 0;
	this.lastPos = -1;
	this.enabled = true;
	this.lastEnabled = true;
	this.firstSticky = false;
	this.lastSticky = false;
	this.offset = 0;
	this.attachedOffset = 0;
}

// Get the wrapper element of the dispalced element
$ppSticky.method('getEle', function() {
	return this.ele;
});

$ppSticky.method('getWrapper', function() {
	return this.wrapper;
});

$ppSticky.method('getState', function() {
	return this.state;
});

$ppSticky.method('setState', function(newState, changeMade) {
	if ((newState != this.state || this.state != this.lastState) || changeMade === true) {
		this.lastState = this.state;
		this.state = newState;
	}
});

$ppSticky.method('setFixed', function(val) {
	if (val) {
		$pp.addClass(this.getWrapper(), $pp.name('allowFixed', 'state'));
	} else {
		$pp.removeClass(this.getWrapper(), $pp.name('allowFixed', 'state'));
	}
});

$ppSticky.method('setPos', function(pos, type) {
	if (pos != this.lastPos) {
		this.getWrapper().style[type] = pos + 'px';
		this.lastPos = pos;
	}
});

$ppSticky.method('setCoords', function() {
	this.coords = $pp.coords(this.getEle(), 'offset');
	this.boundCoords = $pp.coords(this.boundEle, 'offset');
});

$ppSticky.method('update', function(pos) {
	if (this.state !== 0) {
		if (this.getDefault('allowFixed') && this.state === 1) {
			this.setPos(pos, this.getDefault('type'));
		} else {
			this.updateAbsolutePosition();
		}
	}
});

$ppSticky.method('updateAbsolutePosition', function(pos) {
	if (this.state === 1) {
		if (this.getDefault('type') == 'top') {
			this.setPos(this.offset + $pp.sticky.scrollTop, this.getDefault('type'));
			//this.getWrapper().style.backfaceVisibility = 'hidden';
			//this.getWrapper().style.transition = 'transform 0.2s ease-in';
			//this.getWrapper().style.transition = 'transform 0.2s ease-out 0.2s';
			//this.getWrapper().style.transform = 'translate3d(0, ' + (this.offset + $pp.sticky.scrollTop - this.coords.top) + 'px, 0)';
		} else {
			this.setPos($pp.sticky.scrollBottom - this.offset - this.coords.height, 'top');
		}
	} else if (this.state === 2) {
		if (this.getDefault('type') == 'top') {
			this.setPos(this.boundCoords.bottom - this.coords.height - this.attachedOffset, this.getDefault('type'));
		} else {
			console.log('write this Kyler');
			this.setPos($pp.sticky.scrollBottom - this.offset - this.coords.height, 'top');
		}
	}
});

$ppSticky.method('attach', function() {
	this.getEle().style.height = this.getDefault('normalHeight') + 'px';
	this.getWrapper().style.height = this.getDefault('stickyHeight') + 'px';
	this.offset = $pp.sticky.getOffset(this.getDefault('type'));
	this.updateAbsolutePosition();
	$pp.addClass(this.getWrapper(), $pp.name('attachActive', 'state'));
	$pp.removeClass(this.getWrapper(), $pp.name('stickyActive', 'state'));

	if (this.lastState === 1) {
		$pp.sticky.setOffset(this.getDefault('type'), (-1 * this.getDefault('stickyHeight')));
	}
});

$ppSticky.method('stick', function() {
	this.getEle().style.height = this.getDefault('normalHeight') + 'px';
	this.getWrapper().style.height = this.getDefault('stickyHeight') + 'px';
	this.offset = $pp.sticky.getOffset(this.getDefault('type'));
	if (this.getDefault('allowFixed')) {
		this.setPos(this.offset, this.getDefault('type'));
	} else {
		this.updateAbsolutePosition();
	}
	$pp.addClass(this.getWrapper(), $pp.name('stickyActive', 'state'));
	$pp.removeClass(this.getWrapper(), $pp.name('attachActive', 'state'));
	$pp.sticky.setOffset(this.getDefault('type'), this.getDefault('stickyHeight'));
});

$ppSticky.method('unstick', function() {
	this.getEle().style.height = '';
	this.getWrapper().style.height = '';
	this.offset = 0;
	if (this.enabled) {
		$pp.sticky.setOffset(this.getDefault('type'), -1 * this.getDefault('stickyHeight'));
	}
	this.getWrapper().style.bottom = '';
	this.getWrapper().style.top = '';
	this.lastPos = -1;
	$pp.removeClass(this.getWrapper(), $pp.name('stickyActive', 'state'));
	$pp.removeClass(this.getWrapper(), $pp.name('attachActive', 'state'));
});

// Get all defaults
$ppSticky.method('getDefaults', function() {
	return this.defaults;
});

// Get a default value
$ppSticky.method('getDefault', function(key) {
	return this.defaults[key];
});

// override a default value
$ppSticky.method('setDefault', function(key, val) {
	this.defaults[key] = val;
});

$ppSticky.method('resizeGet', function() {
	this.setCoords();
	var ps = $pp.sticky,
		w = ps.windowWidth,
		h = ps.windowHeight;

	this.lastEnabled = this.enabled;

	if (ps.isLandscape && w >= this.getDefault('widthMinLandscape') && (w < this.getDefault('widthMaxLandscape') || this.getDefault('widthMaxLandscape') === 0) && h >= this.getDefault('heightMinLandscape') && (h < this.getDefault('heightMaxLandscape') || this.getDefault('heightMaxLandscape') === 0)) {
		this.enabled = true;
	} else if (!ps.isLandscape && w >= this.getDefault('widthMinPortrait') && (w < this.getDefault('widthMaxPortrait') || this.getDefault('widthMaxPortrait') === 0) && h >= this.getDefault('heightMinPortrait') && (h < this.getDefault('heightMaxPortrait') || this.getDefault('heightMaxPortrait') === 0)) {
		this.enabled = true;
	} else {
		this.enabled = false;
	}
});

$ppSticky.method('resizeSet', function() {
});

$ppSticky.method('initGet', function() {
	if (!$pp.isSet(this.getDefault('boundEle'))) {
		this.boundEle = document.body;
	} else {
		var sel = document.getElementsByClassName(this.getDefault('boundEle'));
		if (sel.length === 1) {
			this.boundEle = sel[0];
		} else {
			this.boundEle = document.body;
		}
	}

	this.resizeGet();
	if (this.getDefault('normalHeight') === 0) {
		this.setDefault('normalHeight', this.coords.height);
	}

	if (this.getDefault('stickyHeight') === 0) {
		this.setDefault('stickyHeight', this.coords.height);
	}
});

$ppSticky.method('initSet', function() {
	this.setFixed(this.getDefault('allowFixed'));
	this.resizeSet();
	this.needsInit = false;
});
