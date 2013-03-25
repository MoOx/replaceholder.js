// Uses Node, AMD or browser globals to create a module.
// https://github.com/umdjs/umd/blob/master/returnExportsGlobal.js

;(function (root, factory) {
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], function () {
			return (root.replaceholder = factory());
		});
	} else {
		// Browser globals
		root.replaceholder = factory();
	}
}(this, function () {
	return function replaceholder(name, callback, eventCallbacks) {

		//Returns true if it is a DOM node
		function isNode(o){
			return (
				typeof Node === "object" ? o instanceof Node :
				o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
			);
		}

		//Returns true if it is a DOM element
		function isElement(o) {
			return (
				typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
				o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
			);
		}

		var attribNamePrefix = 'data-' + name + '--';
		[].forEach.call(document.getElementsByClassName(name + ''), function(placeholder) {
			var values = {};
			// retrieve placeholder.getAttribute('data-*');
			for (var i = 0; i < placeholder.attributes.length; i++) {
				var attrib = placeholder.attributes[i];
				if (attrib.specified && attrib.name.indexOf(attribNamePrefix) === 0) {
					console.log(attrib);
					values[attrib.name.replace(attribNamePrefix, '')] = attrib.value;
				}
			}
			console.log('values', values);
			// callback
			var callbackReturn = callback.call(placeholder, values);
			console.log('callbackReturn', callbackReturn);
			if(typeof callbackReturn === 'string') {
				placeholder.innerHTML = callbackReturn;
				console.log('placeholder.innerHTML', placeholder.innerHTML);
			}
			else {
				if (isElement(callbackReturn) || isNode(callbackReturn)) {
					placeholder.innerHTML = ''; // empty
					placeholder.appendChild(callbackReturn);
				}
				else {
					throw 'Replaceholder excpects the callback to return a (html) string, a dom element, or a document fragment.';
				}
			}

			if (typeof eventCallbacks !== undefined) {
				for (var eventName in eventCallbacks) {
					var events = eventName.split(' ');
					for (var e in events) {
						// just ensure that the events[e] is not a fucking polyfilled method
						if (typeof events[e] === 'string') {
							console.log('event registered: ' + events[e]);
							placeholder.addEventListener(events[e], eventCallbacks[eventName], false);
						}
					}
				}
			}
		});
	};
}));
