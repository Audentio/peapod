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
	boundEvents: [],
	debugEvents: [],

	/**
	 * Internal use function to add an event to the array of events
	 * @param  {string} name     name of trigger
	 * @param  {function} func     function to run
	 * @param  {int} priority priority of the event.  -1 happens async, then all sync events happen, then - happens
	 * @param  {bool} once     set to true to remove the event after it is triggered once
	 * @param {bool} debug   if true, will output timestamps
	 * @return {void}
	 */
	makeEvent: function(name, func, priority, once, debug) {
		var pe = $pp.events,
			found = false;

		if (name.length > 0) {
			$pp.events.items.push({
				name: name,
				func: func,
				priority: priority,
				once: once,
				id: pe.currentId,
				triggered: false,
				executing: false,
				enabled: true,
				debug: debug
			});

			for (var i = 0, len = pe.boundEvents.length; i < len; i++) {
				if (pe.boundEvents[i] == name) {
					found = true;
					if (debug) {
						$pp.events.debugEvents[i] = true;
					}
				}
			}

			if (!found) {
				$pp.events.boundEvents.push(name);
				$pp.events.debugEvents.push(debug);
				window.addEventListener(name, function() {
					pe.listen(name);
				});
			}
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
	 * @param {bool} debug   if true, will output timestamps
	 * @return {void}
	 */
	bind: function(name, func, priority, once, debug) {
		if (!$pp.isSet(once)) {
			once = false;
		}
		if (!$pp.isSet(debug)) {
			debug = false;
		}
		var pe = $pp.events;
		if (name.indexOf(' ') > -1) {
			var names = name.split(' ');
			for (var i = 0, len = names.length; i < len; i++) {
				pe.makeEvent(names[i], func, priority, once, debug);
			}
		} else {
			pe.makeEvent(name, func, priority, once, debug);
		}
	},

	/**
	 * Unbinds all triggers bound to the specified name
	 * @param  {string} name name of the event to unbind
	 * @return {void}
	 */
	unbind: function(name) {
		var pe = $pp.events;
		for (var i = 0, len = pe.items.length; i < len; i++) {
			var item = pe.items[i];
			if (item.name !== name) {
				newItems.push(item);
			} else {
				$pp.events.items[i].enabled = false;
			}
		}
	},

	/**
	 * Function to unbind an event using a string of ids
	 * @param  {string} ids comma separated list of event ids to remove
	 * @return {void}
	 */
	unbindEvent: function(ids) {
		ids = ids.toString().replace(' ', '').split(',');

		if (ids.length > 0) {
			var pe = $pp.events;

			for (var i = 0, len = pe.items.length; i < len; i++) {
				var item = pe.items[i];

				if (item.executing || ids.indexOf(item.id) > -1) {

				} else {
					$pp.events.items[i].enabled = false;
				}
			}
		}
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
	 * Listens for an event and triggers all bound items in the correct order
	 * @param  {string} name name of the event
	 * @return {void}
	 */
	listen: function(name) {
		var pe = $pp.events,
			best,
			bestIndex,
			debug = $pp.events.debugEvents[$pp.events.boundEvents.indexOf(name)],
			t = $pp.debug.time(debug),
			lastIndexSync = -1,
			lastIndexAsync = -1,
			i,
			len;

		if (debug) {
			$pp.debug.log(name + ' start');

			for (i = 0, len = pe.items.length; i < len; i ++) {
				if (pe.items[i].enabled && !pe.items[i].triggered && pe.items[i].name == name) {
					if ((lastIndexSync == -1 && pe.items[i].priority < 1) || (pe.items[i].priority < 1 && (pe.items[i].priority > pe.items[lastIndexSync].priority))) {
						lastIndexSync = i;
					}

					if ((lastIndexAsync == -1 && pe.items[i].priority >= 1) || (pe.items[i].priority >= 1 && (pe.items[i].priority > pe.items[lastIndexAsync].priority))) {
						lastIndexAsync = i;
					}
				}
			}
		}

		for (i = 0, len = pe.items.length; i < len; i ++) {
			best = Number.MAX_VALUE;
			bestIndex = -1;
			if (name == pe.items[i].name) {
				for (var j = 0, len2 = pe.items.length; j < len2; j++) {
					if (name == pe.items[j].name && !pe.items[j].triggered && pe.items[j].enabled) {
						if (pe.items[j].priority < best) {
							best = pe.items[j].priority;
							bestIndex = j;
						}
					}
				}

				if (bestIndex > -1) {
					$pp.events.items[bestIndex].triggered = true;
					$pp.events.items[bestIndex].executing = true;
					if (best < 1) {
						pe.executeFunc(bestIndex, debug, t, bestIndex == lastIndexSync);
					} else {
						pe.delayExecute(bestIndex, debug, t, bestIndex == lastIndexAsync);
					}
				}
			}
		}

		var unbindIds = '';
		for (i = 0, len = pe.items.length; i < len; i ++) {
			if (name == pe.items[i].name) {
				if (pe.items[i].once) {
					if (unbindIds === '') {
						unbindIds = pe.items[i].id;
					} else {
						unbindIds += ',' + pe.items[i].id;
					}
				} else {
					pe.items[i].triggered = false;
				}
			}
		}

		if (unbindIds !== '') {
			pe.unbindEvent(unbindIds);
		}
	},

	/**
	 * Executes an added event's function and does performance logging
	 * @param  {integer} index         index of the item to execute
	 * @param  {bool} debug         if true, will output timestamp information
	 * @param  {integer} mainTimestamp timestamp of the event.listen start, used to output overall time of the event
	 * @param  {boolean} last          true if the tiestamp for the overall event should be output
	 * @return {void}
	 */
	executeFunc: function(index, debug, mainTimestamp, last) {
		var t = $pp.debug.time(debug),
			item = $pp.events.items[index];

		item.func();
		$pp.events.items[index].executing = false;
		$pp.debug.tStamp(item.priority + '	' + item.name + ' (' + item.id + ')', 1, t, debug);

		if (last) {
			if (item.priority > 1) {
				$pp.debug.tStamp(item.name + ' end async', 0, mainTimestamp, debug);
			} else {
				$pp.debug.tStamp(item.name + ' end sync', 0, mainTimestamp, debug);
			}
		}
	},

	/**
	 * Function to asynchronously execute an item's function
	 * @param  {integer} index         index of the item to execute
	 * @param  {bool} debug         if true, will output timestamp information
	 * @param  {integer} mainTimestamp timestamp of the event.listen start, used to output overall time of the event
	 * @param  {boolean} last          true if the tiestamp for the overall event should be output
	 * @return {void}
	 */
	delayExecute: function(index, debug, mainTimestamp, last) {
		window.setTimeout(function() {
			$pp.events.executeFunc(index, debug, mainTimestamp, last);
		}, 0);
	},

	/**
	 *  Function to add an event to the array of events and remove it after the first time it is triggered
	 * @param  {string} name     name of trigger
	 * @param  {function} func     function to run
	 * @param  {int} priority priority of the event.  -1 happens async, then all sync events happen, then - happens
	 * @param {bool} debug   if true, will output timestamps
	 * @return {void}
	 */
	bindOnce: function(name, func, priority, debug) {
		$pp.events.bind(name, func, priority, true, debug);
	}
};
