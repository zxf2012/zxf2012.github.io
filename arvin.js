(function($) {
	$.fn.autoScroll = function () {
		var position = 0,
			scrollStep = 100,
			scrollInterval = 50;
		function scrollDom() {
			console.log('in scrollDom');
			var dom = $(this);
			var _dom = dom.get(0);
			if(dom.scrollTop() + dom.height() === _dom.scrollHeight) {
				autoScrollInterval && window.clearInterval(autoScrollInterval);
			} else {
				dom.scrollTop(dom.scrollTop() + scrollStep);
			}
		};
		var autoScrollInterval = window.setInterval($.proxy(scrollDom, this), scrollInterval);
		return this;
	};
	var doms = [$('.recommendations .fake_scroll_inner'), $('.list_outer.fake_scroll_inner')];
	$.each(doms, function (index, dom) {
		dom.scrollTop(0);
		dom.autoScroll();
	});
})($);


(function($) {
	$.fn.extend({
		autoScroll: function () {
			var position = 0,
				scrollStep = 100,
				scrollInterval = 50;
			function scrollDom() {
				console.log('in scrollDom');
				var dom = $(this);
				var _dom = dom.get(0);
				if(dom.scrollTop() + dom.height() === _dom.scrollHeight) {
					autoScrollInterval && window.clearInterval(autoScrollInterval);
				} else {
					dom.scrollTop(dom.scrollTop() + scrollStep);
				}
			};
			var autoScrollInterval = window.setInterval($.proxy(scrollDom, this), scrollInterval);
			return this;
		}
	});
	var doms = [$('.recommendations .fake_scroll_inner'), $('.list_outer.fake_scroll_inner')];
	$.each(doms, function (index, dom) {
		dom.scrollTop(0);
		dom.autoScroll();
	});
})($);

