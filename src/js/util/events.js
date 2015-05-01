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

/**
 * General event handler
 * @type {Object}
 */
$pp.events = {
	items: [],
	currentId: 0,

	/**
	 * Internal use function to add an event to the array of events
	 * @param  {string} name     name of trigger
	 * @param  {function} func     function to run
	 * @param  {int} priority priority of the event.  -1 happens async, then all sync events happen, then - happens
	 * @param  {bool} once     set to true to remove the event after it is triggered once
	 * @return {void}
	 */
	makeEvent: function(name, func, priority, once) {
		var pe = $pp.events;

		if (name.length > 0) {
			items.push({
				name: name,
				func: func,
				priority: priority,
				once: once,
				id: pe.currentId
			});
		}

		$pp.events.currentId++;

		return pe.currentId - 1;
	},

	/**
	 *  Function to add an event to the array of events
	 * @param  {string} name     name of trigger
	 * @param  {function} func     function to run
	 * @param  {int} priority priority of the event.  -1 happens async, then all sync events happen, then - happens
	 * @param  {bool} once     internal use, use bindOnce for external use
	 * @return {void}
	 */
	bind: function(name, func, priority, once) {
		if (!$pp.isSet(once)) {
			once = false;
		}
		var pe = $pp.events;
		if (name.indexOf(' ') > -1) {
			var names = name.split(' ');
			for (var i = 0, len = names.length; i < len; i++) {
				pe.makeEvent(names[i], func, priority, once);
			}
		} else {
			pe.makeEvent(name, func, priority, once);
		}
	},

	/**
	 * Unbinds all triggers bound to the specified name
	 * @param  {string} name name of the event to unbind
	 * @return {void}
	 */
	unbind: function(name) {
		var pe = $pp.events,
			newItems = [];
		for (var i = 0, len = pe.items.length; i < len; i++) {
			var item = pe.items[i];
			if (item.name !== name) {
				newItems.push(item);
			} else {
				window.removeEventListener(name);
			}
		}
		$pp.events.items = newItems;
	},

	unbindEvent: function(ids) {

	},

	/**
	 * Fires a specified event
	 * @param  {string} name name of the event to trigger
	 * @return {void}
	 */
	trigger: function(name) {
		window.dispatchEvent(new Event(name));
	},

	/**
	 *  Function to add an event to the array of events and remove it after the first time it is triggered
	 * @param  {string} name     name of trigger
	 * @param  {function} func     function to run
	 * @param  {int} priority priority of the event.  -1 happens async, then all sync events happen, then - happens
	 * @return {void}
	 */
	bindOnce: function(name, func, priority) {
		$pp.events.bind(name, func, priority, true);
	}
};
