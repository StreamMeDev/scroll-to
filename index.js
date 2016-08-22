var Transient = require('transient');

module.exports = function (options) {
	// do nothing if not running in the browser
	if (typeof window === 'undefined' || !window.scroll()) {
		return;
	}

	options = options || {};
	options.yCoord || 0; // default to scrolling to top of page

	var startPosition = window.scrollY;

	var a = new Transient({
		duration: options.duration || 1000, // 1 second
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

				scrollDistance can be negative when scrolling up:
				newScrollPosition = (scrollDistance * progress) + startPosition
				scrollDistance = targetPosition - startPosition;

				newScrollPosition = (targetPosition - startPosition) * progress + startPosition
				newScrollPosition = targetPosition - startPosition + (startPosition / progress)
			*/
			window.scroll(0, options.yCoord - startPosition + (startPosition / progress));
		}
	});

	a.start();
};
