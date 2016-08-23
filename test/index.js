/* global describe, it */
var assert = require('assert');
var scrollTo = require('../');

describe('scroll-to', function () {
	// create a super tall div so the headless browser allows scrolling
	document.body.innerHTML = '<div class="test-div" style="height: 10000px;"></div>';

	it('gradually scrolls 1000px down the page', function (done) {
		scrollTo({
			y: 1000
		});

		// inspect the scroll position part way through the animation
		setTimeout(function () {
			assert(window.scrollY > 0);
			assert(window.scrollY < 1000);
		}, 50);

		// inspect the final scroll position
		setTimeout(function () {
			assert.strictEqual(window.scrollY, 1000);
			done();
		}, 175);
	});

	it('gradually scrolls to the top of the page using default options', function (done) {
		// defaults: {y: 0, duration: 150}
		scrollTo();

		// inspect the scroll position part way through the animation
		setTimeout(function () {
			assert(window.scrollY < 1000);
			assert(window.scrollY > 0);
		}, 50);

		// inspect the final scroll position
		setTimeout(function () {
			assert.strictEqual(window.scrollY, 0);
			done();
		}, 175);
	});
});
