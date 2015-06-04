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
		triggerClass: $pp.name('displacedTrigger'),
		altTriggers: [],
		triggerClick: function(displacedParent) {
			if (!displacedParent.needsInit) {
				displacedParent.active();
			}
			return true;
		},
		triggerMouseover: function(displacedParent) {
			window.clearTimeout(displacedParent.hoverTimer);
			displacedParent.hoverTimer = window.setTimeout(function() {
				displacedParent.defaults.triggerHover(displacedParent);
			}, displacedParent.getDefault('hoverDelay'));
			return true;
		},
		triggerMouseout: function(displacedParent) {
			window.clearTimeout(displacedParent.hoverTimer);
			return true;
		},
		triggerMousemove: function(displacedParent) {
			window.clearTimeout(displacedParent.hoverTimer);
			displacedParent.hoverTimer = window.setTimeout(function() {
				displacedParent.defaults.triggerHover(displacedParent);
			}, displacedParent.getDefault('hoverDelay'));
			return true;
		},
		triggerHover: function(displacedParent) {
			displacedParent.active();
			return true;
		},
		clickClose: true,
		enableHover: true,
		enableClick: true,
		hoverDelay: 100,
		contentOffsetX: 0,
		contentOffsetY: 0,
		positionPrimary: 'top',
		positionSecondary: 'left',
		closeAllBeforeActive: true,
		contentClass: $pp.name('displacedContent'),
		activeTriggerClass: $pp.name('displacedActive', 'state'),
		usedActiveTriggerClass: $pp.name('displacedActiveUsed', 'state'),
		type: 'menu',
		contentParent: null,
		ignoreClass: '',
		forceAlwaysOpen: false,
		enableArrows: true,
		arrowClass: $pp.name('displacedArrow', 'general'),
		makeArrow: function(primary, secondary) {
			if (primary == 'top') {
				return '<i class=\"fa fa-chevron-down\"></i>';
			} else if (primary == 'bottom') {
				return '<i class=\"fa fa-chevron-up\"></i>';
			} else if (primary == 'right') {
				return '<i class=\"fa fa-chevron-left\"></i>';
			} else if (primary == 'left') {
				return '<i class=\"fa fa-chevron-right\"></i>';
			}
		}
	},
	items: [],
	addQueue: [],

	addParts: function(triggers, content, type, defaults, forceInit) {
		var pd = $pp.displaced;

		if (forceInit || !pd.needsInit) {
			defaults = $pp.setDefaults(pd.defaults, defaults);

			var item = new $ppDisplaced(null, type, defaults);
			item.addContent(content);
			item.addTriggers(triggers);
			$pp.displaced.items.push(item);
		} else {
			if (!$pp.isSet(defaults)) {
				defaults = null;
			}
		}

		if (!pd.needsInit) {
			pd.init();
		} else if (!forceInit) {
			$pp.displaced.addQueue.push({sel: classNames, type: type, defaults: defaults});
		}
	},

	add: function(classNames, type, defaults, forceInit) {
		var pd = $pp.displaced;

		if (forceInit || !pd.needsInit) {
			defaults = $pp.setDefaults(pd.defaults, defaults);

			classNames = classNames.split(',');
			for (var i = 0, len = classNames.length; i < len; i++) {
				var sel = document.getElementsByClassName(classNames[i]);
				for (var j = 0, len2 = sel.length; j < len2; j++) {
					if (!$pp.hasClass(sel[j], defaults.ignoreClass)) {
						var item = new $ppDisplaced(sel[j], type, defaults);
						$pp.displaced.items.push(item);
					}
				}
			}
		} else {
			if (!$pp.isSet(defaults)) {
				defaults = null;
			}
		}

		if (!pd.needsInit) {
			pd.init();
		} else if (!forceInit) {
			$pp.displaced.addQueue.push({sel: classNames, type: type, defaults: defaults});
		}
	},

	initGet: function(defaults) {
		var pd = $pp.displaced;

		$pp.displaced.defaults = $pp.setDefaults(pd.defaults, defaults);

		for (var i = 0, len = pd.addQueue.length; i < len; i++) {
			pd.add(pd.addQueue[i].sel, pd.addQueue[i].type, pd.addQueue[i].defaults, true);
		}

		$pp.displaced.addQueue = [];

		for (i = 0, len = pd.items.length; i < len; i++) {
			pd.items[i].initGet();
		}

		if (pd.needsInit) {
			window.addEventListener('mouseup', function(e) {
				var classes = '',
					target = e.target || e.srcElement,
					body = document.getElementsByTagName('body')[0],
					found = false;

				for (i = 0, len = pd.items.length; i < len; i++) {
					var item = pd.items[i];
					if (classes.indexOf(item.getDefault('contentClass')) === -1) {
						if (classes === '') {
							classes = item.getDefault('contentClass');
						} else {
							classes += ',' + item.getDefault('contentClass');
						}
					}

					if (classes.indexOf(item.getDefault('triggerClass')) === -1) {
						if (classes === '') {
							classes = item.getDefault('triggerClass');
						} else {
							classes += ',' + item.getDefault('triggerClass');
						}
					}
				}

				while ($pp.isSet(target) && target !== body && !found) {
					if ($pp.hasClass(target, classes)) {
						found = true;
					}
					target = target.parentNode;
				}

				if (!found && $pp.hasClass(target, classes)) {
					found = true;
				}

				if (!found) {
					pd.closeAllClick();
				}
			});
		}
	},

	initSet: function() {
		for (var i = 0, len = $pp.displaced.items.length; i < len; i++) {
			$pp.displaced.items[i].initSet();
		}

		$pp.displaced.needsInit = false;
	},

	init: function(defaults) {
		var pd = $pp.displaced;
		pd.initGet(defaults);
		pd.initSet();
	},

	closeAllClick: function() {
		var pd = $pp.displaced;
		for (var i = 0, len = pd.items.length; i < len; i++) {
			if (pd.items[i].getDefault('clickClose')) {
				pd.items[i].inactive();
			}
		}
	},

	findItemFromTrigger: function(trigger) {
		var ele = null;

		for (var i = 0, len = $pp.displaced.items.length; i < len; i++) {
			var j = $pp.displaced.items[i].triggers.indexOf(trigger);
			if (j > -1) {
				ele = $pp.displaced.items[i];
				break;
			}
		}

		return ele;
	},

	findItemFromContent: function(content) {
		var ele = null;

		for (var i = 0, len = $pp.displaced.items.length; i < len; i++) {
			if ($pp.displaced.items[i].content == content) {
				ele = $pp.displaced.items[i];
				break;
			}
		}

		return ele;
	}
};

//types: popup fixed, popup absolute, sticky, realtive to ele
//todo: add class to active trigger / content?, close button, trigger as a link, positioning, styling classes?, center positioning of dropdown
function $ppDisplaced(ele, type, defaults) {
	this.ele = ele;
	this.triggers = [];
	this.content = null;
	this.type = type;
	this.hoverTimer = null;
	this.state = 0;
	this.triggerUsed = -1;
	this.defaults = defaults;
	this.needsInit = true;
	this.contentPrimaryClass = '';
	this.contentSecondaryClass = '';
	this.positionPrimary = '';
	this.positionSecondary = '';
}

// Get the wrapper element of the dispalced element
$ppDisplaced.method('getEle', function() {
	return this.ele;
});

// Get the type of the displaced element
$ppDisplaced.method('getType', function() {
	return this.type;
});

// Get all defaults
$ppDisplaced.method('getDefaults', function() {
	return this.defaults;
});

// Get a default value
$ppDisplaced.method('getDefault', function(key) {
	return this.defaults[key];
});

// override a default value
$ppDisplaced.method('setDefault', function(key, val) {
	this.defaults[key] = val;
});

// Activates a displaced element (generall opens it)
$ppDisplaced.method('active', function() {
	if (this.getDefault('closeAllBeforeActive')) {
		$pp.displaced.closeAllClick();
	}

	if (this.state === 0) {
		this.state = 1;
		this.content.style.visibility = 'hidden';
		this.content.style.display = 'block';
		this.positionContent(this.getDefault('positionPrimary'), this.getDefault('positionSecondary'));
		this.content.style.visibility = '';
		for (var i = 0, len = this.triggers.length; i < len; i++) {
			this.triggers[i].classList.add(this.getDefault('activeTriggerClass'));
			if (i == this.triggerUsed) {
				this.triggers[i].classList.add(this.getDefault('usedActiveTriggerClass'));
			}
		}
	}
});

$ppDisplaced.method('displayArrow', function() {
	if (this.getDefault('enableArrows')) {
		this.content.style.display = 'block';
		for (var i = 0, len = this.triggers.length; i < len; i++) {
			this.triggerUsed = i;
			this.positionContent(this.getDefault('positionPrimary'), this.getDefault('positionSecondary'), true);
		}
		this.triggerUsed = -1;
		if (!this.getDefault('forceAlwaysOpen')) {
			this.content.style.display = 'none';
		}
	}
});

// Makes a displaced element inactive (generally closes it)
$ppDisplaced.method('inactive', function() {
	if (this.state === 1 && !this.getDefault('forceAlwaysOpen')) {
		this.state = 0;
		this.content.style.display = 'none';
		for (var i = 0, len = this.triggers.length; i < len; i++) {
			this.triggers[i].classList.remove(this.getDefault('activeTriggerClass'));
			this.triggers[i].classList.remove(this.getDefault('usedActiveTriggerClass'));
		}

		if (this.contentPrimaryClass.length) {
			this.content.classList.remove(this.contentPrimaryClass);
		}
		if (this.contentSecondaryClass.length) {
			this.content.classList.remove(this.contentSecondaryClass);
		}
	}
});

// Toggle between active and inactive
$ppDisplaced.method('toggle', function() {
	if (this.state === 1) {
		this.inactive();
	} else {
		this.active();
	}
});

$ppDisplaced.method('findTriggerIndex', function(triggerEle) {
	for (var i = 0, len = this.triggers.length; i < len; i++) {
		if (this.triggers[i] === triggerEle) {
			return i;
		}
	}
	return -1;
});

$ppDisplaced.method('addTriggers', function(triggerEles) {
	for (var i = 0, len = triggerEles.length; i < len; i++) {
		this.addTriggerEle(triggerEles[i]);
	}
});

$ppDisplaced.method('positionContent', function(locationPrimary, locationSecondary, ignoreScroll) {
	var triggerIndex = this.triggerUsed;

	if (!$pp.isSet(ignoreScroll)) {
		ignoreScroll = false;
	}

	if (triggerIndex > -1) {
		var triggerPos = $pp.coords(this.triggers[triggerIndex], 'offset'),
			contentPos = $pp.coords(this.content, 'offset'),
			checkedPos,
			passed = false,
			tryCount = 0;

		while (!passed && tryCount < 17) {
			passed = true;
			var offCount = 0,
				oldPrimary = locationPrimary,
				oldSecondary = locationSecondary;
			checkedPos = this.checkContentPosition(locationPrimary, locationSecondary, triggerPos, contentPos, ignoreScroll);

			if (checkedPos.offLeft) {
				offCount++;
			}
			if (checkedPos.offRight) {
				offCount++;
			}
			if (checkedPos.offTop) {
				offCount++;
			}
			if (checkedPos.offBottom) {
				offCount++;
			}

			if (offCount > 0) {
				passed = false;
			}

			if (tryCount === 1) {
				locationSecondary = this.flipLocation(locationPrimary, locationSecondary, false);
			} else if (tryCount === 2) {
				locationSecondary = this.flipLocation(locationPrimary, locationSecondary, false);
			} else if (tryCount === 3) {
				locationPrimary = 'top';
				locationSecondary = 'center';
			} else if (tryCount === 4) {
				locationSecondary = 'left';
			} else if (tryCount === 5) {
				locationSecondary = 'right';
			} else if (tryCount === 6) {
				locationPrimary = 'bottom';
				locationSecondary = 'center';
			} else if (tryCount === 7) {
				locationSecondary = 'left';
			} else if (tryCount === 8) {
				locationSecondary = 'right';
			} else if (tryCount === 9) {
				locationPrimary = 'left';
				locationSecondary = 'center';
			} else if (tryCount === 10) {
				locationSecondary = 'top';
			} else if (tryCount === 11) {
				locationSecondary = 'bottom';
			} else if (tryCount === 12) {
				locationPrimary = 'right';
				locationSecondary = 'center';
			} else if (tryCount === 13) {
				locationSecondary = 'top';
			} else if (tryCount === 14) {
				locationSecondary = 'bottom';
			} else if (tryCount === 15) {
				locationPrimary = 'top';
				locationSecondary = 'left';
			} else if (tryCount > 15) {
				console.log('could not position :(');
				passed = true;
			}

			if (passed) {
				var triggerEle = this.triggers[this.triggerUsed];
				if (this.getDefault('enableArrows') && $pp.isSet(triggerEle)) {
					$pp.removeChildren(triggerEle, this.getDefault('arrowClass'));
					var arrowEle = document.createElement('SPAN');
					arrowEle.className = this.getDefault('arrowClass');
					arrowEle.innerHTML = this.defaults.makeArrow(oldPrimary, oldSecondary);
					triggerEle.appendChild(arrowEle);
				}

				this.content.style.top = checkedPos.topTarget;
				this.content.style.left = checkedPos.leftTarget;
				if (this.contentPrimaryClass.length) {
					this.content.classList.remove(this.contentPrimaryClass);
				}
				if (this.contentSecondaryClass.length) {
					this.content.classList.remove(this.contentSecondaryClass);
				}
				this.contentPrimaryClass = $pp.name(oldPrimary + 'DisplacedContentPrimary', 'state');
				this.contentSecondaryClass = $pp.name(oldSecondary + 'DisplacedContentSecondary', 'state');
				this.content.classList.add(this.contentPrimaryClass);
				this.content.classList.add(this.contentSecondaryClass);
				this.positionPrimary = oldPrimary;
				this.positionSecondary = oldSecondary;
			}

			tryCount++;
		}
	}
});

$ppDisplaced.method('flipLocation', function(primary, secondary, usePrimary) {
	if (!$pp.isSet(usePrimary)) {
		usePrimary = true;
	}
	if (usePrimary) {
		if (primary == 'top') {
			return 'bottom';
		} else if (primary == 'bottom') {
			return 'top';
		} else if (primary == 'left') {
			return 'right';
		} else if (primary == 'right') {
			return 'left';
		}
	} else {
		if (secondary == 'top') {
			if (primary == 'left' || primary == 'right') {
				return 'center';
			}
			return 'bottom';
		} else if (secondary == 'bottom') {
			return 'top';
		} else if (secondary == 'left') {
			if (primary == 'top' || primary == 'bottom') {
				return 'center';
			}
			return 'right';
		} else if (secondary == 'right') {
			return 'left';
		} else if (secondary == 'center') {
			if (primary == 'left' || primary == 'right') {
				return 'top';
			}
			if (primary == 'top' || primary == 'bottom') {
				return 'right';
			}
		}
	}
});

$ppDisplaced.method('checkContentPosition', function(locationPrimary, locationSecondary, triggerPos, contentPos, ignoreScroll) {
	var topTarget = 0,
		leftTarget = 0,
		offLeft = false,
		offRight = false,
		offTop = false,
		offBottom = false,
		scrollX = window.scrollX,
		scrollY = window.scrollY;

	if (locationPrimary == 'left') {
		leftTarget = triggerPos.right;
	} else if (locationPrimary == 'right') {
		leftTarget = triggerPos.left - contentPos.width;
	} else if (locationPrimary == 'top') {
		topTarget = triggerPos.bottom;
	} else if (locationPrimary == 'bottom') {
		topTarget = triggerPos.top - contentPos.height;
	}

	if (locationPrimary == 'left' || locationPrimary == 'right') {
		if (locationSecondary == 'top') {
			topTarget = triggerPos.top;
		} else if (locationSecondary == 'bottom') {
			topTarget = triggerPos.bottom - contentPos.height;
		} else if (locationSecondary == 'center') {
			topTarget = triggerPos.top + triggerPos.height / 2 - (contentPos.height / 2);
		}
	} else {
		if (locationSecondary == 'left') {
			leftTarget = triggerPos.left;
		} else if (locationSecondary == 'right') {
			leftTarget = triggerPos.right - contentPos.width;
		} else if (locationSecondary == 'center') {
			leftTarget = triggerPos.left + triggerPos.width / 2 - (contentPos.width / 2);
		}
	}

	leftTarget += this.getDefault('contentOffsetX');
	topTarget += this.getDefault('contentOffsetY');

	if (!ignoreScroll) {
		if (leftTarget < 0 + scrollX) {
			offLeft = true;
		}
		if (topTarget < 0 + scrollY) {
			offTop = true;
		}
		if (leftTarget + contentPos.width > window.innerWidth + scrollX) {
			offRight = true;
		}
		if (topTarget + contentPos.height > window.innerHeight + scrollY) {
			offBottom = true;
		}
	} else {
		if (leftTarget < 0) {
			offLeft = true;
		}
		if (topTarget < 0) {
			offTop = true;
		}
		if (leftTarget + contentPos.width > window.innerWidth) {
			offRight = true;
		}
		if (leftTarget + contentPos.height > window.innerHeight) {
			offBottom = true;
		}
	}

	return {
		leftTarget: leftTarget,
		topTarget: topTarget,
		offLeft: offLeft,
		offRight: offRight,
		offTop: offTop,
		offBottom: offBottom
	};
});

$ppDisplaced.method('addTriggerEle', function(triggerEle) {
	if (this.getDefault('enableClick')) {
		triggerEle.onclick = function() {
			var ele = $pp.displaced.findItemFromTrigger(this),
				triggerIndex = ele.findTriggerIndex(this);

			ele.triggerUsed = triggerIndex;

			if (ele !== null) {
				ele.defaults.triggerClick(ele);
			}
		};
	}
	if (this.getDefault('enableHover')) {
		triggerEle.onmouseover = function() {
			var ele = $pp.displaced.findItemFromTrigger(this),
				triggerIndex = ele.findTriggerIndex(this);

			ele.triggerUsed = triggerIndex;
			if (ele !== null) {
				ele.defaults.triggerMouseover(ele);
			}
		};
		triggerEle.onmouseout = function() {
			var ele = $pp.displaced.findItemFromTrigger(this);

			if (ele !== null) {
				ele.defaults.triggerMouseout(ele);
			}
		};
		triggerEle.onmousemove = function() {
			var ele = $pp.displaced.findItemFromTrigger(this);
			if (ele !== null) {
				ele.defaults.triggerMousemove(ele);
			}
		};
	}
	this.triggers.push(triggerEle);
});

$ppDisplaced.method('addContent', function(contentEle) {
	this.content = contentEle;
});

$ppDisplaced.method('initGet', function() {
	if ($pp.isSet(this.ele)) {
		var triggerEles = this.ele.getElementsByClassName(this.getDefault('triggerClass')),
			contentEle = this.ele.getElementsByClassName(this.getDefault('contentClass'));
		this.addTriggers(triggerEles);
		if (contentEle.length === 1) {
			this.content = contentEle[0];
		}
	} else {

	}
	//todo alt triggers
});

$ppDisplaced.method('initSet', function() {
	if ($pp.isSet(this.content)) {
		if (this.getDefault('contentParent') !== '') {
			if (!$pp.isSet(this.getDefault('contentParent'))) {
				this.setDefault('contentParent', document.body);
			}
			this.getDefault('contentParent').appendChild(this.content);
		}
		this.content.id = $pp.uniqueId();
		this.content.style.position = 'absolute';

		this.displayArrow();

		if (this.getDefault('forceAlwaysOpen')) {
			if (this.triggers.length) {
				this.triggerUsed = 0;
				this.active();
			}
		} else {
			this.content.style.display = 'none';
		}
		this.needsInit = false;
	}
});
