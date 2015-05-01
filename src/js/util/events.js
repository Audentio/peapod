/**
 * @file Controls synchronous and asynchronous events
 *
 * @version ${ pkg.version }
 * @author ${ pkg.author }
 *
 * @license ${ pkg.license }.
 * @copyright ${ pkg.author }
 *
 */

$pp.events = {
	items: [],
	currentId: 0,
	
	makeEvent: function(name, func, priority){
		if (name.length > 0) items.push({
			name: name, 
			func: func, 
			priority: priority, 
			id: $pp.events.currentId
		});

		$pp.events.currentId++;
	},

	bind: function(name, func, priority){
		var pe = $pp.events;
		if (name.indexOf(" ") > -1){
			var names = name.split(" ");
			for (var i = 0, len = names.length; i < len; i++){
				pe.makeEvent(names[i], func, priority);
			}
		} else {
			pe.makeEvent(name, func, priority);
		}
	},

	unbind: function(){

	},

	trigger: function(){

	},

	bindOnce: function(){

	}
};