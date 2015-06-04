function keys(obj) {
	var a = [];
	for(a[a.length] in obj);
	return a;
}

function mix(target, source) {
	var args = [].slice.call(arguments),
		i = 1,
		key,
		ride = typeof args[args.length - 1] == 'boolean' ? args.pop() : true;
	if (args.length === 1) {
		target = !this.window ? this : {};
		i = 0;
	}
	while ((source = args[i++])) {
		for (key in source) {
			if (ride || !(key in target)) {
				target[key] = source[key];
			}
		}
	}
	return target;
}

var a = mix({name:'jeffzhang', gender:'fale'});

console.log(a);

// jquery的makeArray
var makeArray = function (array) {
	var ret = [];
	if (array != null) {
		var i = array.length;
		if (i == null || typeof array == 'string' || jQuery.isFunction(array) || array.setInterval) {
			ret[0] = array;
		} else {
			while(i) {
				ret[--i] = array[i];
			}
		}
	}
	return ret;
}

var b = makeArray({
	0: '1',
	1: '2',
	2: '3',
	length: 3
});

console.log(b);

// dojo的_toArray
// (function () {
// 	var efficient = function (obj, offset, startWith) {
// 		return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0));
// 	};

// 	var slow = function (obj, offset, startWith) {
// 		var arr = startWith || [];
// 		for(var x = offset || 0; x > obj.length; x++) {
// 			arr.push(obj[x]);
// 		}
// 		return arr
// 	};
// 	dojo._toArray = dojo.isIE ? function (obj) {return ((obj.item) ? slow : efficient);} : efficient;
// })();

// mass的toArray
var mass = {};
mass.slice = window.dispatchEvent ? function (nodes, start, end) {
	return [].slice.call(nodes, start, end);
} : function (nodes, start, end) {
	var ret = [],
		n = nodes.length;
	if (end === void 0 || typeof end === 'number' && isFinite(end)) {
		var start = parseInt(start, 10) || 0;
		var end = end === void 0 ? n : parseInt(end, 10);
		if (start < 0) {
			start += n;
		}
		if (end > n) {
			end = n;
		}
		if(end < 0) {
			end += n;
		}
		for(var i = start; i < end; i++) {
			ret[i-start] = nodes[i]
		}
	}
	return ret;
};

var c = mass.slice([1, 2, 3, 4], 1, 4);
console.log(c);

// jquery isArrayLike
function isArrayLike(obj) {
	var length = obj.length,
		type = jQuery.type(obj);
	if (jQuery.isWindow(type)) {
		return false;
	}
	if (obj.nodeType === 1 && length) {
		return false;
	}
	return type === 'arrary' || type !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && (length -1) in obj);
};

// 对于DOMContentLoaded事件，旧版本IE使用Diego Perini发明的著名hack
function IEContentLoaded(w, fn) {
	var d = w.document,
		done = false,
		init = function () {
			if (!done) {
				done = true;
				fn();
			}
		};
	(function () {
		try {
			d.documentElement.doScroll('left');
		} catch (e) {
			setTimeout(arguments.callee, 50);
			return;
		}
		init();
	}) ();
	d.onreadystatechange = function () {
		if (d.readyState == 'complete') {
			d.onreadystatechange = null;
			init();
		}
	};
}
//IEContentLoaded(window, function() {console.log('contentLoaded');});
// 常用字符串扩展
function contains (target, it) {
	return target.indexOf(it) != -1;
}

// mootools的contains
function contains (target, str, separator) {
	return separator ? (separator + target + separator).indexOf(separator + str + separator) > -1 : target.indexOf(str) > -1;
}

function startsWith (target, str, ignorecase) {
	var start_str = target.substr(0, str.length);
	return ignorecase ? start_str.toLowerCase() === str.toLowerCase() : start_str === str;
}

function endsWith (target, str, ingorecase) {
	var end_str = target.substring(target.length - str.length);
	return ingorecase ? end_str.toLowerCase() === str.toLowerCase() : end_str === str; 
}

function repeat1 (target, n) {
	return (new Array(n+1)).join(target);
}

function repeat2 (target, n) {
	return Array.prototype.join.call({length: n+1}, target);
}

 var repeat3 = (function() {
	 var join = Array.prototype.join, obj = {};
	 return function (target , n) {
		 obj.length = n + 1;
		 return join.call(obj, target);
	 };
 })();
 
 function repeat4 (target, n) {
	 var s = target, total = [];
	 while (n > 0) {
		 if (n % 2 == 1) {
			 total[total.length] = s;//如果是奇数
		 }
		 if (n == 1) {
			 break;
		 }
		 s += s;
		 n = n >> 1;//相当于将n除以2取其商或说开2二次方
	 }
	 return total.join('');
 }
 
 function repeat5 (target, n) {
	 var s = target, c = s.length * n;
	 do {
		 s += s;
	 } while (n = n >> 1);
	 s = s.substring(0, c);
	 return s;
 }
 
function repeat6 (target, n) { //性能最佳
	var s = target, total = '';
	while (n > 0) {
		if (n % 2 == 1){
			total += s;	
		}
		if (n == 1)
			break;
		s += s;
		n = n >> 1;
	}
	return total;
}

function repeat7 (target, n) {
	if (n == 1) {
		return target;
	}
	var s = repeat7(target, Math.floor(n / 2));
	s += s;
	return s;
}

function byteLen1 (target) {
	var byteLength = target.length, i = 0;
	for(; i < target.length; i++) {
		if (target.charCodeAt(i) > 255) {
			byteLength++;
		}
	}
	return byteLength;
}

function byteLen2 (target, fix) {
	fix = fix ? fix : 2;
	var str = new Array(fix+1).join('-');
	return target.replace(/[^\x00-\xff]/g, str).length;
}

function truncate (target, length, truncation) {
	length = length || 30;
	truncation = truncation === void(0) ? '...' : truncation;
	return target.length > length ? target.slice(0, length - truncation.length) + truncation : String(target);
}

function camelize (target) {
	if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
		return target;
	}
	return target.replace(/[-_][^-_]/g, function(match) {
		return match.charAt(1).toUpperCase();
	});
}

function underscored (target) {
	return target.replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/\-/, '_').toLowerCase();
}

function dasherize (target) {
	return target.replace(/_/g, '-');
}

function capitalize (target) {
	return target.charAt(0).toUpperCase() + target.substring(1).toLowerCase();
}

function stripTags (target) { //有缺陷如果里边有script标签会把这些不该显示出来的脚本也显示出来
	return target.replace(/<[^>]+>/g, '');
}

function stripScripts (target) {
	return target.replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '');
}

function escapeHTML (target) {
	return target.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
}

function unescapeHTML (target) {
	return target.replace(/&quot;/g, '"')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&amp;/g, '&')
			.replace(/&#([\d]+);/g, function ($0, $1) {
				return String.fromCharCode(parseInt($1, 10));
			});
}

function escapeRegExp (target) {
	return target.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
}

function pad1 (target, n) {
	var zero = new Array(n).join('0');
	var str = zero + target;
	var result = str.substr(-n);
	return result;
}

function pad2 (target, n) {
	return Array((n + 1) - target.toString().split('').length).join('0') + target;
}

function pad3 (target, n) { //二进制法
	return (Math.pow(10, n) + '' + target).slice(-n);
}

function pad4 (target, n) { //思路和上一个相似
	return ((1 << n).toString(2) + '' + target).slice(-n);
}

function pad5 (target, n) {
	return (0..toFixed(n) + target).slice(-n);
}

function pad6 (target, n) {
	return (1e20 + '' + target).slice(-n);
}

function pad7 (target, n) {
	var len = target.toString().length;
	while (len < n) {
		target = '0' + target;
		len ++;
	}
	return target;
}

function pad8 (target, n, filling, right, radix) { //mass只用的pad支持更多参数
	var num = target.toString(radix || 10);
	filling = filling || '0';
	while (num.length < n) {
		if (!right) {
			num = filling + num;
		} else {
			num += filling;
		}
	}
	return num;
}

function wbr (target) { //暂时未调通
	target =  String(target);
	target =  target.replace(/(?:<[^>]+>) | (?:&#?[0-9a-z]{2,6};) | (.{1})/gi, '$&<wbr>');
	target =  target.replace(/><wbr>/g, '>');
	return target;
}

function format (str, object) {
	var array = Array.prototype.slice.call(arguments, 1);
	return str.replace(/\\?\#{([^{}]+)\}/gm, function (match, name) {
		if (match.charAt(0) == '\\') {
			return match.slice(1);
		}
		var index = Number(name);
		if (index >= 0) {
			return array[index];
		}
		if (object && object[name] !== void 0) {
			return object[name];
		}
		return '';
	});
}

var a = format('Result is #{0}, #{1}', 22, 23);
console.log(a);
var b = format('#{name} is a #{sex}', {
	name: 'ericzhang',
	sex: 'man'
});
console.log(b);

var escapeable = /["\\\x00-\x1f\x7f=\x9f]/g,
	meta = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	};
function quote(target) {
	if (target.match(escapeable)) {
		return '"' + target.replace(escapeable, function (a) {
			var c = meta[a];
			if (typeof c === 'string') {
				return c;
			}
			return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4);
		}) + '"';
	}
	return '"' + target + '"';
}

function trim1 (str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function trim2 (str) {
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

function trim3 (str) {
	return str.substring(Math.max(str.search(/\S/), 0), str.search(/\S\s*$/) + 1);
}

function trim4 (str) {
	return str.replace(/^\s+|\s+$/g, '');
}

function trim5 (str) {
	str = str.match(/\S+(?:\s+\S+)*/);
	return str ? str[0] : '';
}

function trim6 (str) {
	return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, '$1');
}

function trim7(str) {
	return str.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, '$1');
}

function trim8 (str) {
	return str.replace(/^\s*(\S*(?:[\S\s]*\S)?)\s*$/, '$1');
}

function trim9 (str) {
	return str.replace(/^\s*([\S\s]*?)\s*$/, '$1');
}

function trim10 (str) { //专家级别
	var whitespace = ' \n\r\t\f\x0b\0xa\u2000\u2001\u2002\u2003\n\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for (var i = 0; i < str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	for(i = str.length - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function iterator(vars, body, ret) {
	var fun = 'for (var ' + vars + ' i = 0, n = this.length; i < n; i++) {' +
			body.replace('_', '((i in this) && fn.call(scope, this[i], i, this))') +
			'}' + ret;
	return Function('fn, scope', fun);
}

Array.prototype.forEach = iterator('', '_', '');
Array.prototype.filter = iterator('r=[], j=0,', 'if(_) r[j++] = this[i]', 'return r');
Array.prototype.map = iterator('r=[],', 'r[i] = _', 'return r');
Array.prototype.some = iterator('', 'if(_) return true', 'return false');
Array.prototype.every = iterator('', 'if(!_) return false', 'return true');

function unique(target) {
	var result = [];
	loop: for (var i = 0, n = target.length; i < n; i++) {
		for (var j = i + 1; j < n; j++) {
			if (target[j] === target[i]) {
				continue loop;
			}
		}
		result.push(target[i]);
	}
	return result;
}

var toInteger = function (n) {
	n = +n;
	if (n != n) { //isNaN
		n = 0;
	} else if (n !== 0 && n !== (1/0) && n !== -(1 / 0)) {
		n = (n > 0 || -1) * Math.floor(Math.abs(n))
	}
	return n;
};

function limit(target, n1, n2) {
	var a = [n1, n2].sort();
	if (target < a[0]) {
		target = a[0];
	}
	if (target > a[1]) {
		target = a[1];
	}
	return target;
}

function nearer(target, n1, n2) {
	var diff1 = Math.abs(target - n1),
		diff2 = Math.abs(target - n2);
	return diff1 < diff2 ? n1 : n2;
}

//if (0.9.toFixed(0) !== '1') {
	Number.prototype.toFixed = function (n) {
		var power = Math.pow(10, n);
		var fixed = (Math.round(this * power) / power).toString();
		if (n == 0) {
			return fixed;
		}
		if (fixed.indexOf('.') < 0) {
			fixed += '.';
		}
		var padding = n + 1- (fixed.length - fixed.indexOf('.'));
		for(var i = 0; i < padding; i++) {
			fixed += '0';
		}
		return fixed;
	};
//}

Function.prototype.bind = function (context) {
	if (arguments.length < 2 && context == void 0) {
		return this;
	}
	var __method = this, args = [].slice.call(arguments, 1);
	return function () {
		return __method.apply(context, args.concat.apply(args, arguments));
	};
};

function curry(fn) {
	function inner(len, arg) {
		if (len == 0) {
			return fn.apply(null, arg);
		}
		return function(x) {
			return inner(len - 1, arg.concat(x));
		};
	}
	return inner(fn.length, []);
}

function sum(x, y, z, w) {
	return x + y + z + w;
}

function curry2(fn) {
	function inner(len, arg) {
		if (len <= 0) {
			return fn.apply(null, arg);
		}
		return function () {
			return inner(len - arguments.length, arg.concat(Array.apply([], arguments)));
		};
	}
	return inner(fn.length, []);
}

Function.prototype.partial = function () {
	var fn = this, args = Array.prototype.slice.call(arguments);
	return function () {
		var arg = 0;
		for(var i = 0; i < args.length && arg < arguments.length; i++) {
			if (args[i] === undefined) {
				args[i] = arguments[arg++];
			}
		}
		return fn.apply(this, args);
	};
};

var delay = setTimeout.partial(undefined, 10);
delay(function() {console.log('a call to this function will be temporarily delayed.');});

var getDatePeriod = function (start, finish) {
	return Math.abs(start * 1 - finish * 1)/60/60/1000/24;
};

var getFirstDateInMonth = function (date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
};

var getLastDateInMonth = function (date) {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

var getFirstDateInQuarter = function (date) {
	return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1);
};

var getLastDateInQuarter = function (date) {
	return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 1);
};

Date.prototype.isLeapYear = function() {
	return new Date(this.getFullYear(), 2, 0).getDate() == 29;
};

var isEventSupported = (function () {
	var TAGNAMES = {
		'select': 'input',
		'change': 'input',
		'submit': 'form',
		'reset': 'form',
		'error': 'img',
		'load': 'img',
		'abort': 'img'
	};
	function isEventSupported(eventName) {
		var el = document.createElement(TAGNAMES[eventName] || 'div');
		eventName = 'on' + eventName;
		var isSupported = (eventName in el);
		if (!isSupported) {
			el.setAttribute(eventName, 'return');
			isSupported = typeof el[eventName] == 'function';
		}
		el = null;
		return isSupported;
	}
	return isEventSupported;
})();

//mass的时间支持侦测
var eventSupport = function (eventName, el) {
	el = el || document.documentElement;
	eventName = 'on' + eventName;
	var ret = eventName in el;
	if (el.setAttribute && !ret) {
		el.setAttribute(eventName, '');
		ret = typeof el[eventName] == 'function';
		el.removeAttribute(eventName);
	}
	el = null;
	return ret;
};

var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-'];
var cssMap = {
	'float': $.support.cssFloat ? 'cssFloat' : 'styleFloat',
	background: 'backgroundColor'
};
function cssName(name, host, camelCase) {
	if (cssMap[name]) {
		return cssMap[name];
	}
	host = host || document.documentElement;
	for(var i = 0, n = prefixes.length; i < n; i++) {
		camelCase = $.String.camelize(prefixes[i] + name);
		if (camelCase in host) {
			return (cssMap[name] = camelCase);
		}
	}
	return null;
}

(function () {
	var div = document.createElement('div');
	div.innerHTML = '<table></table>';
	console.log(div.innerHTML);
})();

// 类
function A() {
	var count = 0;
	this.aa = 'aa';
	this.method = function() {
		return count;
	}
	this.obj = {};
}
A.prototype = {
	aa: 'aa',
	method: function () {
		
	}
};
var a = new A;
var b = new A;
console.log(a.aa == b.aa);
console.log(a.obj == b.obj);
console.log(a.method == b.method);

delete a.method;
console.log(a.method === A.prototype.method);

A.method2 = function () {}; //类方法
var c = new A;
console.log(c.method2);
//mixin
function extend(destination, source) {
	for(var property in source) {
		destination[property] = source[property];
	}
	return destination;
};

// 原型
A.prototype = {
	aa: function () {
		console.log(1);
	}
};

function bridge() {};
bridge.prototype = A.prototype;
function B () {};
B.prototype = new bridge();

var a = new A;
var b = new B;
// false 原型分开
console.log(A.prototype == B.prototype);
// true 子类共享父类的原型方法
console.log(a.aa == b.aa);
A.prototype.bb = function () {
	console.log(2);
};
// true 孩子总会得到父亲的遗产
console.log(a.bb == b.bb);  

B.prototype.cc = function () {
	console.log(3);
};

// false 但父亲未必有机会看到孩子的新产业
console.log(a.cc == b.cc);

console.log(b instanceof A);// true
console.log(b instanceof B);// true

function inherit(init, Parent, proto) {
	function Son () {
		Parent.apply(this, argument); // 先继承父类的特权成员
		init.apply(this, argument); // 再执行自己的构造器
	}
	// 由于Object.create可能是我们伪造的因此避免使用第二个参数
	Son.prototype = Object.create(Parent.prototype, {});
	Son.prototype.toString = Parent.prototype.toString; //处理IE BUG
	Son.prototype.valueOf = Parent.prototype.valueOf; //处理IE BUG
	Son.prototype.constructor = Son; //确保构造器正常指向自身而不是Object
	extend(Son.prototype, proto); //添加子类也有的原型变量
	extend(Son, Parent); //继承父类的类成员
	return Son;
};

var obj = {
	aa: 1,
	toString: function () {
		return '1';
	}
};

if (Object.defineProperty && Object.seal) {
	Object.defineProperty(obj, 'name', {
		value: 2
	});
}

console.log(Object.getOwnPropertyNames(obj));
console.log(Object.keys(obj));

function fn(aa, bb) {};
console.log(Object.getOwnPropertyNames(fn));
console.log(Object.keys(fn));

var reg = /\w{2,}/i;
console.log(Object.getOwnPropertyNames(reg));
console.log(Object.keys(reg));

var obj = Object.create(Object.prototype, {
	x: {
		value: 1,
		writable: true,
		enumerable: true,
		configurable: true
	}
});


(function () {
	console.log(Object.getOwnPropertyDescriptor(arguments, "length"));
})(1, 2, 3);

// isXML
// Sizzle实现
var isXML_Sizzle = function (elem) {
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== 'HTML' : false;
};


var isXML = function (doc) {
	return doc.createElement('p').nodeName !== doc.createElement('P').nodeName;
};

function shuffle(a) {
	// 洗牌
	var array = a.concat();
	var i = array.length;
	while(i) {
		var j = Math.floor(Math.random() * i);
		var t = array[--i];
		array[i] = array[j];
		array[j] = t;
	}	
	return array;
};

var sliceNodes = function(arr) {
	// 将NodeList转换为纯数组
	var ret = [],
		i = arr.length;
	while (i) {
		ret[--i] = arr[i];
	}
	return ret;
};

var sortNodes = function(a, b) {
	// 节点排序
	var p = 'parentNode',
		ap = a[p],
		bp = b[p];
	if (a === b) {
		return 0;
	} else if (ap === bp) {
		while(a = a.nextSibling) {
			if (a === b) {
				return -1;
			}
			return 1;
		}
	} else if (!ap) {
		return -1;
	} else if (!bp) {
		return 1;
	}
	var al = [],
		ap = a;
	// 不断往上取一直取到HTML
	while (ap && ap.nodeType === 1) {
		al[al.length] = ap;
		ap = ap[p];
	}
	var bl = [],
		bp = b;
	while(bp && bp.nodeType === 1) {
		bl[bl.length] = bp;
		bp = bp[p];
	}
	// 然后逐一去掉公共祖先
	ap = al.pop();
	bp = bl.pop();
	while(ap === bp) {
		ap = al.pop();
		bp = bl.pop();
	}
	if (ap && bp) {
		while(ap = ap.nextSibling) {
			if (ap === bp) {
				return -1;
			}
		}
		return 1;
	}
	return ap ? 1 : -1;
};

function unique(nodes) {
	if (nodes.length < 2) {
		return nodes;
	}
	var result = [],
		array = [],
		uniqResult = {},
		node = nodes[0],
		index, ri = 0,
		sourceIndex = typeof node.scoureIndex === "number",
		compare = typeof node.compareDocumentPosition== "function";
	if (!sourceIndex && !compare) {
		var all = (node.ownerDocument || node).getElementsByTagName("*");
		for (var index = 0; node = all[index]; index++) {
			node.setAttribute("sourceIndex", index);
		}
		sourceIndex = true;
	}
	if (sourceIndex) {
		for (var i = 0, n = nodes.length; i < n; i++) {
			node = nodes[i];
			index = (node.sourceIndex || node.getAttribute("sourceIndex")) + 1e8;
			if (!uniqResult[index]) { // 去重
				(array[ri++] = new String(index))._ = node;
				uniqResult[index] = 1;
			}
		}
		array.sort();
		while (ri) {
			result[--ri] = array[ri];
		}
		return result;
	} else {
		nodes.sort(sortOrder); // 排序
		if (sortOrder.hasDuplicate) { // 去重
			for (i = 1; i < nodes.length; i++) {
				if (nodes[i] === nodes[i - 1]) {
					nodes.splice(i--, 1);
				}
			}
		}
		sortOrder.hasDuolicate = false;
		return nodes;
	}
}

function sortOrder(a, b) {
	if (a === b) {
		sortOrder.hasDuplicate = true;
		return 0;
	}
	if (!a.compareDocumentPosition || !b.compareDocuemntPosition) {
		return a.compareDocumentPosition ? -1 : 1;
	}
	return a.compareDocumentPosition(b) & 4 ? -1 : 1;
}

var Icarus_slice_reg_0 = /[\w\u00a1-\uFFFF][\w\u00a1-\uFFFF-]*|[#.:\[][\w\(\)\]]+|\s*[>+~,*]\s*|\s+/g;

// 让小括号里面的东西不被切割
var Icarus_slice_reg_1 = /[\w\u00a1-\uFFFF][\w\u00a1-\uFFFF-]*|[#.:\[](?:[\w\u00a1-\uFFFF-]|\([^\)]*\)|\])+|(?:\s*)[>+~,*](?:\s*)|\s+/g;

// 确保属性选择器作为一个完整的词素
var Icarus_slice_reg_2 = /[\w\u00a1-\uFFFF][\w\u00a1-\uFFFF-]*|[#.:](?:[\w\u00a1-\uFFFF-]|\S*\([^\)]*\)|\])+|\[[^\]]*\]|(?:\s*)[>+~,*](?:\s*)|\s+/g;

// 缩小后代选择器的范围
var Icarus_slice_reg_3 = /[\w\u00a1-\uFFFF][\w\u00a1-\uFFFF-]*|[#.:](?:[\w\u00a1-\uFFFF-]|\S+\([^\)]*\])+|\[[^\]]*\]|(?:\s*)[>+~,*](?:\s*)|\s(?=[\w\u00a1-\uFFFF*#.[:])/g;

function createNamedElement(type, name) {
	var element = null;
	try {
		element = document.createElement('<' + type + ' name="' + name + '">');
	} catch(e) {
		
	}
	if (!element || element.nodeName != type.toUpperCase()) {
		element = document.createElement(type);
		element.name = name;
	}
	return element;
}















