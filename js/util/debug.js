peapod.debug = {
	items: [],

	out: function(){
		console.log("Debug info goes here...")
	},

	log: function(msg){
		if (peapod.vars.debug) console.log(msg)
	},

	spaceToLength: function(input, length) {
		var result = input;
		for (var i = input.length; i <= length; i++) {
			result += " "
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
}

