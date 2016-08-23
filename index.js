var Transient = require('transient');

module.exports = function (options) {
	// do nothing if not running in the browser
	if (typeof window === 'undefined' || !window.scroll) {
		return;
	}

	options = options || {};
	options.duration = options.duration || 150; // 150 ms
	options.y = options.y || 0; // default to scrolling to very top of page

	var startPosition = window.scrollY;

	var a = new Transient({
		duration: options.duration,
		draw: function (progress) {
			/*
				scrolling down from 0px (top of page) to 1000px?
				When progress is 0, newScrollPosition is unchagnged: 0px;
				When progress is .50, newScrollPosition is 1500px;
				When progress is .75, newScrollPosition is 1750px;

				scrolling up from 1000px to 0px (top of page)?
				When progress is 0, newScrollPosition is unchanged: 1000px
				When progress is .50 newScrollPosition is 500px
				When progress is .75 newScrollPosition is 250px

				totalScrollChange can be negative when scrolling up:
				newScrollPosition = (totalScrollChange * progress) + startPosition
				totalScrollChange = targetPosition - startPosition;

				startPosition + totalScrollChange * progress
				newScrollPosition = startPosition + ((targetPosition - startPosition) * progress)
			*/
			window.scroll(0, startPosition + (options.y - startPosition) * progress);
		},
		// Since Transient updates progress before calling draw(), then calls onEnd if progress >= 1,
		// it may not call draw() with 100% progress. Here we finish the scrolling onEnd.
		onEnd: function () {
			window.scroll(0, options.y);
		}
	});

	a.start();
};
