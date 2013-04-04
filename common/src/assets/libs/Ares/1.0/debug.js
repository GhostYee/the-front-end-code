(function(global, undefined) {
	function NSWP (parent, name, members) {
		var current = parent || this;
		var nameSpace = name.split(".");
		for(var i = 0, len = nameSpace.length; i < len; ++i) {
			name = nameSpace[i];
			if(-~i === len && members) {
				if($.isFunction(members)) {
					current[name] = members;
					continue;
				}
				current[name] = $.extend(true, current[name] || {}, members);
				continue;
			}
			if(!current[name]) {
				current[name] = {};
			}
			current = current[name];
		}
		return current;
	};
	function NS (name, members) {
		return NSWP(global, name, members);
	};
	function CLS (constructor, property, members) {
		if(typeof constructor == "string") {
			constructor = NS(constructor, function () {});
		}
		constructor = constructor || function () {};
		constructor.prototype = $.extend(true, constructor.prototype, property);
		constructor.prototype.constructor = constructor;
		$.extend(true, constructor, members || {});
		return constructor;
	}
	NS("NS", NS);
	NS("CLS", CLS);
})($);