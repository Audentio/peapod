
$pp.template = {
	needsInit: true,
	defaults: {

	},
	items: [],
	addQueue: [],

	add: function(classNames, type, defaults, forceInit) {

	},

	initGet: function(defaults) {

	},

	initSet: function() {

	},

	init: function(defaults) {
		$pp.template.initGet(defaults);
		$pp.template.initSet();
	}
};

function $ppTemplate(ele, type, defaults) {
	this.ele = ele;
	this.defaults = defaults;
	this.needsInit = true;
}

// Get the wrapper element of the dispalced element
$ppTemplate.method('getEle', function() {
	return this.ele;
});

// Get all defaults
$ppTemplate.method('getDefaults', function() {
	return this.defaults;
});

// Get a default value
$ppTemplate.method('getDefault', function(key) {
	return this.defaults[key];
});

// override a default value
$ppTemplate.method('setDefault', function(key, val) {
	this.defaults[key] = val;
});

$ppTemplate.method('initGet', function() {
});

$ppTemplate.method('initSet', function() {
});
