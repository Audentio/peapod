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
	
	makeEvent: function(name, func, priority, once){
		if (name.length > 0) items.push({
			name: name, 
			func: func, 
			priority: priority,
			once: once, 
			id: $pp.events.currentId
		});

		$pp.events.currentId++;
	},

	bind: function(name, func, priority, once){
		if (!$pp.isSet(once)) once = false;
		var pe = $pp.events;
		if (name.indexOf(" ") > -1){
			var names = name.split(" ");
			for (var i = 0, len = names.length; i < len; i++){
				pe.makeEvent(names[i], func, priority, once);
			}
		} else {
			pe.makeEvent(name, func, priority, once);
		}
	},

	unbind: function(name){
		var pe = $pp.events,
			newItems = [];
		for (var i = 0, len = pe.items.length; i < len; i++){
			var item = pe.items[i];
			if (item.name !== name){
				newItems.push(item);
			} else {

			}
		}
		$pp.events.items = newItems;
	},

	trigger: function(name){
		window.dispatchEvent(new Event(name));
	},

	bindOnce: function(name, func, priority){
		$pp.events.bind(name, func, priority, true);
	}
};