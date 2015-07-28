$pp.overflow = {
	needsInit: true,
	defaults: {
		hideFirstClasses: $pp.name('overflowHideFirst'), // children with this class will hide first
		hideLastClasses: $pp.name('overflowHideLast') + ',' + $pp.name('menu'), // children with this class will hide last
		noMenuClass: $pp.name('overflowNoMenu'), // if an elewrapper has this class children will be hidden without going to a menu
		reverseOrder: true, // if true, hide from right to left
		childWrapperSelector: $pp.name('overflowWrapper'), // selector for uls.  Separate with commas if multiple
		//childSelector: $pp.name('overflowItem', 'general'), // selector for lis.  Separate with commas if multiple. Leave blank to select all direct children
		childSelector: '',
		constantChildrenWidth: true, // set to true if the widths of children won't change on resize, allows for optimizations
		createOverflowTrigger: function() {
			//console.log('Must override defaults.createOverflowTrigger');
			var ele = document.createElement('LI');
			ele.className = $pp.name('overflowMenuTrigger');
			ele.innerHTML = '<span class=\"' + $pp.name('displacedTrigger') + '\"><i class=\"fa fa-bars\"></i></span>';
			return ele;
		},
		createOverflowContent: function() {
			//console.log('Must override defaults.createOverflowContent');
			var ele = document.createElement('UL');
			ele.className = $pp.name('overflowMenu') + ' ' + $pp.name('displacedContent') + ' ' + $pp.name('menuContent', 'general');
			return ele;
		},
		initMenu: function(trigger, content) {
			$pp.displaced.addParts(trigger.children, content, 'menu', {
				positionPrimary: 'top',
				positionSecondary: 'right',

			});
		},
		childClick: function() {},
		menuContentParent: '', // where to put the overflow menu's body, leave blank to append to wrapper
		postMenuChildAdded: function(newItem) {},
		preBuildMenus: function() {},
		ignoreDivClass: $pp.name('ignoreOverflowDiv'),
		preResizeFunc: function() {},
		createOverflowContentAppend: function(overflowContent) {
			return overflowContent;
		}
	},
	items: [],
	addQueue: [],
	lastWidth: 0,

	initGet: function(defaults) {
		$pp.overflow.defaults = $pp.setDefaults($pp.overflow.defaults, defaults);
		for (var i = 0, len = $pp.overflow.addQueue.length; i < len; i++) {
			var def = $pp.overflow.addQueue[i].defaults;
			if (!$pp.isSet(def)) {
				def = $pp.overflow.defaults;
			} else {
				def = $pp.setDefaults($pp.overflow.defaults, def);
			}
			$pp.overflow.add($pp.overflow.addQueue[i].sel, def, true);
		}

		$pp.overflow.resizeGet(true);
	},

	initSet: function() {
		$pp.overflow.resizeSet(true);

		if (window.attachEvent) {
			window.attachEvent('onresize', function() {
				$pp.overflow.resize();
			});
		} else if (window.addEventListener) {
			window.addEventListener('resize', function() {
				$pp.overflow.resize();
			}, true);
		}

		$pp.overflow.needsInit = false;
	},

	init: function(defaults) {
		$pp.overflow.initGet(defaults);
		$pp.overflow.initSet();
	},

	add: function(classNames, defaults, forceInit) {
		if ($pp.isSet(defaults)) {
			defaults = $pp.setDefaults($pp.overflow.defaults, defaults);
		} else {
			defaults = $pp.overflow.defaults;
		}

		if (forceInit || !$pp.overflow.needsInit) {
			classNames = classNames.split(',');
			for (var i = 0, len = classNames.length; i < len; i++) {
				var sel = document.getElementsByClassName(classNames[i]);
				for (var j = 0, len2 = sel.length; j < len2; j++) {
					if (!$pp.hasClass(sel[j], defaults.ignoreDivClass)) {

						var wrapperNames = defaults.childWrapperSelector.split(','),
							wrappers = [];
						for (var k = 0, len3 = wrapperNames.length; k < len3; k++) {
							var wrappersSel = sel[j].getElementsByClassName(wrapperNames[k]);
							for (var l = 0, len4 = wrappersSel.length; l < len4; l++) {
								var wrapperChildren = [],
									childHidden = [],
									childPriority = [],
									childContent = [],
									childInMenu = [],
									childEles = null;

								var overflowTrigger = defaults.createOverflowTrigger();
								wrappersSel[l].appendChild(overflowTrigger);

								var overflowContent = defaults.createOverflowContent();
								overflowContent.style.display = 'none';
								if (defaults.menuContentParent === '') {
									wrappersSel[l].appendChild(overflowContent);
								} else {
									defaults.menuContentParent.appendChild(overflowContent);
								}

								var overflowContentAppend = defaults.createOverflowContentAppend(overflowContent);

								if (defaults.childSelector === '') {
									childEles = wrappersSel[l].children;
								} else {
									childEles = wrappersSel[l].getElementsByClassName(defaults.childSelector);
								}
								for (var m = 0, len5 = childEles.length; m < len5; m++) {
									if (!$pp.hasClass(childEles[m], $pp.name('displacedContent'))) {
										wrapperChildren.push(childEles[m]);
										childHidden.push(false);
										var currentPriority = 2;
										if ($pp.hasClass(childEles[m], defaults.hideLastClasses)) {
											currentPriority = 3;
										} else if ($pp.hasClass(childEles[m], defaults.hideFirstClasses)) {
											currentPriority = 1;
										}
										if (childEles[m] == overflowTrigger) { // never hide the trgger
											currentPriority = 4;
										}
										childPriority.push(currentPriority);
										childContent.push(childEles[m].childNodes);
										childInMenu.push(false);
									}
								}

								var menu = defaults.initMenu(overflowTrigger, overflowContent);

								wrappers.push({
									parent: wrappersSel[l],
									children: wrapperChildren,
									childHidden: childHidden,
									childPriority: childPriority,
									childContent: childContent,
									childInMenu: childInMenu,
									overflowTrigger: overflowTrigger,
									overflowContent: overflowContent,
									overflowContentAppend: overflowContentAppend,
									menu: menu
								});
							}
						}

						var item = {
							ele: sel[j],
							defaults: defaults,
							needsCheck: true,
							isOverflowing: false,
							isOverflowingTrigger: false,
							wrappers: wrappers,
							numHiddenChildren: 0
						};
						$pp.overflow.items.push(item);
					}
				}
			}
		}

		if (!$pp.overflow.needsInit) {
			$pp.overflow.init();
		} else if (!forceInit) {
			$pp.overflow.addQueue.push({sel: classNames, defaults: defaults});
		}
	},

	styleChildren: function(wrapper, type) {
		for (var i = 0, len = wrapper.children.length; i < len; i++) {
			var ele = wrapper.children[i];
			if (type == 'invisible') {
				ele.style.visibility = 'hidden';
				ele.style.display = '';
			} else if (type == 'visible') {
				ele.style.visibility = '';
				if (wrapper.childHidden[i]) {
					ele.style.display = 'none';
				} else {
					ele.style.display = '';
				}
			}
		}
	},

	wrapperNextToHide: function(wrapper, reverseOrder) {
		var index = -1;
		for (var i = 0, len = wrapper.childPriority.length; i < len; i++) {
			if (!wrapper.childHidden[i] && wrapper.childPriority[i] < 4) {
				if (index === -1) {
					index = i;
				} else if (wrapper.childPriority[i] < wrapper.childPriority[index]) {
					index = i;
				} else if (wrapper.childPriority[i] == wrapper.childPriority[index] && reverseOrder) {
					index = i;
				}
			}
		}
		return index;
	},

	checkGet: function(index) {
		var overflowing = false;
		var overflowingTrigger = false;

		for (var i = 0, len = $pp.overflow.items[index].wrappers.length; i < len; i++) {
			var wrapperCoords = $pp.coords($pp.overflow.items[index].wrappers[i].parent, 'offset');
			for (var j = 0, len2 = $pp.overflow.items[index].wrappers[i].children.length; j < len2; j++) {
				var childIndex = ($pp.overflow.items[index].defaults.reverseOrder) ? len2 - j - 1 : j;
				if (!$pp.overflow.items[index].wrappers[i].childHidden[childIndex]) {
					var coords = $pp.coords($pp.overflow.items[index].wrappers[i].children[childIndex], 'offset');
					if (coords.top > wrapperCoords.top + coords.height / 2) {
						if ($pp.overflow.items[index].wrappers[i].children[childIndex] === $pp.overflow.items[index].wrappers[i].overflowTrigger) {
							overflowingTrigger = true;
						} else {
							overflowing = true;
						}
					}
				}
			}
		}

		return {overflowing: overflowing, overflowingTrigger: overflowingTrigger};
	},

	checkSet: function(index) {
		var wrappers = $pp.overflow.items[index].wrappers,
			ret = false;
		for (var i = 0, len = wrappers.length; i < len; i++) {
			var item = $pp.overflow.items[index],
				nextChildIndex = $pp.overflow.wrapperNextToHide(item.wrappers[i], item.defaults.reverseOrder);

			if (nextChildIndex > -1) {
				$pp.overflow.items[index].numHiddenChildren++;
				item.wrappers[i].children[nextChildIndex].style.display = 'none';
				$pp.overflow.items[index].wrappers[i].childHidden[nextChildIndex] = true;
				ret = true;
			}
		}

		return ret;
	},

	check: function(index) {
		$pp.overflow.checkGet(index);
		$pp.overflow.checkSet(index);
	},

	buildMenus: function(index) {
		var item = $pp.overflow.items[index];

		item.defaults.preBuildMenus();

		for (var i = 0, len = item.wrappers.length; i < len; i++) {
			$pp.overflow.buildMenu(index, i);
		}
	},

	buildMenu: function(itemIndex, wrapperIndex) {
		var hasContent = false;

		while ($pp.overflow.items[itemIndex].wrappers[wrapperIndex].overflowContentAppend.lastChild) {
			$pp.overflow.items[itemIndex].wrappers[wrapperIndex].overflowContentAppend.removeChild($pp.overflow.items[itemIndex].wrappers[wrapperIndex].overflowContentAppend.lastChild);
		}

		var wrapper = $pp.overflow.items[itemIndex].wrappers[wrapperIndex];
		for (var i = 0, len = wrapper.childHidden.length; i < len; i++) {
			if (wrapper.childHidden[i]) {
				var newItem = document.createElement('LI');
				for (var j = 0, len2 = wrapper.childContent[i].length; j < len2; j++) {
					var newChild = wrapper.childContent[i][j].cloneNode(true);
					newChild.id = $pp.uniqueId();
					newChild.onclick = $pp.overflow.items[itemIndex].defaults.childClick;

					newItem.appendChild(newChild);
				}

				$pp.overflow.items[itemIndex].wrappers[wrapperIndex].overflowContentAppend.appendChild(newItem);

				$pp.overflow.items[itemIndex].defaults.postMenuChildAdded(newItem);

				hasContent = true;
			}
		}

		if (hasContent) {
			$pp.overflow.items[itemIndex].wrappers[wrapperIndex].overflowTrigger.style.display = '';
		} else {
			$pp.overflow.items[itemIndex].wrappers[wrapperIndex].overflowTrigger.style.display = 'none';
		}
	},

	resizeGet: function(first) {
		var resetChildren = false;
		var winWidth = window.innerWidth;
		if (winWidth != $pp.overflow.lastWidth || first) {
			if (first && (winWidth > $pp.overflow.lastWidth)) {
				resetChildren = true;
			}
			$pp.overflow.lastWidth = winWidth;
		}

		for (var i = 0, len = $pp.overflow.items.length; i < len; i++) {
			if (resetChildren || (!$pp.overflow.items[i].defaults.constantChildrenWidth && first)) {
				$pp.overflow.items[i].numHiddenChildren = 0;
			}

			$pp.overflow.items[i].defaults.preResizeFunc();

			$pp.overflow.items[i].needsCheck = true;
			if (resetChildren || (!$pp.overflow.items[i].defaults.constantChildrenWidth && first)) {
				for (var j = 0, len2 = $pp.overflow.items[i].wrappers.length; j < len2; j++) {
					var currentHiddenChildren = 0;
					for (var k = 0, len3 = $pp.overflow.items[i].wrappers[j].childHidden.length; k < len3; k++) {
						if ($pp.overflow.items[i].wrappers[j].children[k] !== $pp.overflow.items[i].wrappers[j].overflowTrigger) {
							if ($pp.overflow.items[i].wrappers[j].childHidden[k]) {
								currentHiddenChildren++;
							}
						}
						$pp.overflow.items[i].wrappers[j].childHidden[k] = false;
					}
					$pp.overflow.styleChildren($pp.overflow.items[i].wrappers[j], 'invisible');
					if (currentHiddenChildren === 0) {
						$pp.overflow.items[i].wrappers[j].overflowTrigger.style.display = 'none';
					}
				}

			}
		}

		for (i = 0, len = $pp.overflow.items.length; i < len; i++) {
			if ($pp.overflow.items[i].needsCheck) {
				var overflows = $pp.overflow.checkGet(i);
				$pp.overflow.items[i].isOverflowing = overflows.overflowing;
				$pp.overflow.items[i].isOverflowingTrigger = overflows.overflowingTrigger;
			}
		}
	},

	resizeSet: function(first) {
		var changeMade = false;

		for (var i = 0, len = $pp.overflow.items.length; i < len; i++) {

			if ($pp.overflow.items[i].isOverflowing || ($pp.overflow.items[i].numHiddenChildren > 0 && $pp.overflow.items[i].isOverflowingTrigger)) {
				if ($pp.overflow.checkSet(i)) {
					changeMade = true;
				}
			}
		}

		if (changeMade) {
			$pp.overflow.resize(false);
		} else {
			for (i = 0, len = $pp.overflow.items.length; i < len; i++) {
				for (var j = 0, len2 = $pp.overflow.items[i].wrappers.length; j < len2; j++) {
					$pp.overflow.styleChildren($pp.overflow.items[i].wrappers[j], 'visible');
				}
			}

			for (i = 0, len = $pp.overflow.items.length; i < len; i++) {
				$pp.overflow.buildMenus(i);
			}
		}
	},

	resize: function(first) {
		if (!$pp.isSet(first)) {
			first = true;
		}
		$pp.overflow.resizeGet(first);
		$pp.overflow.resizeSet(first);
	}
};

/*
$pp.overflow.add("ipsFilterbar", {
	//more specific defaults go here
})

document.addEventListener("DOMContentLoaded", function(event) {
    $pp.overflow.init({
		childWrapperSelector: 'ipsList_inline,list_inline', // class of wrappers
		hideLastClasses: 'active',
		reverseOrder: true,
		createOverflowTrigger: function(){ // trigger of overflow menu
			var ele = document.createElement("LI");
				ele.innerHTML = '<a href="#filter_responsiveMenu_menucontent" id="filter_responsiveMenu"><i class="fa fa-bars"></i></a>';
			return ele;
		},
		createOverflowContent: function(){ // content of overflow menu
			var ele = document.createElement("UL");
			ele.id = "filter_responsiveMenu_menucontent";
			ele.className = "ipbmenu_content";
			return ele;
		},
		initMenu: function(trigger, content){ // initialize the overflow menu
			return new ipb.Menu( $(trigger), $(content), { stopClose: false } );
		},
		menuContentParent: document.body, // where to put the content of the overflow dropdown, leave blank to append to wrapper parent
		childClick: function(e){ // adjust the menu triggered
			if (this.id.length > 0){
				e.preventDefault();
				(function(ele) {
					window.setTimeout(function(){
						document.getElementById(ele.hash.replace("#", "")).style.visibility = "";
						document.getElementById(ele.hash.replace("#", "")).style.display = "block";
						document.getElementById(ele.hash.replace("#", "")).style.top = "";
					}, 400)
				})(this)
				document.getElementById(this.hash.replace("#", "")).style.visibility = "hidden";
				window.IPBoard.prototype.menus.docCloseAll();
			}
		},
		postMenuChildAdded: function(newItem) { // instantiante a new menu for the li
			for (var j = 0, len2 = newItem.children.length; j < len2; j++){
				if (newItem.children[j].id.length > 0){
					new ipb.Menu( document.getElementById(newItem.children[j].id), document.getElementById(newItem.children[j].hash.replace('#', '')), { stopClose: true } );
				}
			}
		},
		preBuildMenus: function() {
			if ($pp.isSet(ipb.menus.registered._object)){
				ipb.menus.registered._object.$pp_overflow_filter_answered = {};
				ipb.menus.registered._object.$pp_overflow_forum_filter = {};
			}
		},
		ignoreDivClass: 'gc_noOverflowFunc',
		preResizeFunc: function() {
			ipb.menus.closeAll(true)
		}
	});
});
*/
