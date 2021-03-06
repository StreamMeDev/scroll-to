var Transient = require('transient');

module.exports = function (options) {
	// do nothing if not running in the browser
	if (typeof window === 'undefined' || !window.scroll) {
		return;
	}

	options = options || {};
	options.element = options.element || window;
	options.duration = options.duration || 150; // 150 ms
	options.x = options.x || 0; // default to scrolling to lefthand side of the page
	options.y = options.y || 0; // default to scrolling to very top of page

	// Set scroll or window and non window elements
	var scrollTo;
	var xStartPosition;
	var yStartPosition;
	if (options.element === window) {
		scrollTo = function (x, y) {
			window.scroll(x, y);
		};
		xStartPosition = window.scrollX;
		yStartPosition = window.scrollY;
	} else {
		scrollTo = function (x, y) {
			options.element.scrollTop = y;
			options.element.scrollLeft = x;
		};
		xStartPosition = options.element.scrollLeft;
		yStartPosition = options.element.scrollTop;
	}

	var a = new Transient({
		duration: options.duration,
		draw: function (progress) {
			/*
				scrolling down from 0px (top of page) to 1000px?
				When progress is 0, newScrollPosition is unchanged: 0px;
				When progress is .50, newScrollPosition is 1500px;
				When progress is .75, newScrollPosition is 1750px;

				scrolling up from 1000px to 0px (top of page)?
				When progress is 0, newScrollPosition is unchanged: 1000px
				When progress is .50 newScrollPosition is 500px
				When progress is .75 newScrollPosition is 250px

				totalScrollChange can be negative when scrolling up:
				newScrollPosition = (totalScrollChange * progress) + yStartPosition
				totalScrollChange = targetPosition - yStartPosition;

				yStartPosition + totalScrollChange * progress
				newScrollPosition = yStartPosition + ((targetPosition - yStartPosition) * progress)
			*/
			scrollTo(xStartPosition + (options.x - xStartPosition) * progress, yStartPosition + (options.y - yStartPosition) * progress);
		},
		onCancel: function () {
			// Do nothing, this just overrides the behavior of transient which is to call onEnd
		},
		// Since Transient updates progress before calling draw(), then calls onEnd if progress >= 1,
		// it may not call draw() with 100% progress. Here we finish the scrolling onEnd.
		onEnd: function () {
			scrollTo(options.x, options.y);
		}
	});

	a.start();

	return function () {
		a.cancel();
	};
};
