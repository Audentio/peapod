peapod.name = function(val, type){
	var cssUnique = peapod.vars.cssUnique;
	if (type === "state"){
		return "is-" + val + cssUnique;
	} else if (type === "general") {
		return val + cssUnique;
	} else if (type === "js") {
		return "js-" + val + cssUnique;
	} else {
		return "js-" + val + cssUnique;
	}
}

peapod.isSet = function(val){
	if (typeof(val) === "undefined") return false;
	if (val === null) return false;
	return true;
}