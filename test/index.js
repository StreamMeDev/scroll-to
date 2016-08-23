/* global describe, it */
var assert = require('assert');
var scrollTo = require('../');

describe('scroll-to', function () {
	// create a super tall/fat div so the headless browser allows scrolling
	document.body.innerHTML = '<div class="test-div" style="height: 10000px; width: 10000px;"></div>';

	it('gradually scrolls 1000px down the page and 1000px over', function (done) {
		// default duration: 150
		scrollTo({
			x: 1000,
			y: 1000
		});

		// inspect the scroll position part way through the animation
		setTimeout(function () {
			assert(window.scrollX > 0);
			assert(window.scrollY > 0);
			assert(window.scrollX < 1000);
			assert(window.scrollY < 1000);
		}, 50);

		// inspect the final scroll position
		setTimeout(function () {
			assert.strictEqual(window.scrollX, 1000);
			assert.strictEqual(window.scrollY, 1000);
			done();
		}, 175);
	});

	it('gradually scrolls to the top left of the page using default options', function (done) {
		// defaults: {x: 0, y: 0, duration: 150}
		scrollTo();

		// inspect the scroll position part way through the animation
		setTimeout(function () {
			assert(window.scrollX < 1000);
			assert(window.scrollY < 1000);
			assert(window.scrollX > 0);
			assert(window.scrollY > 0);
		}, 50);

		// inspect the final scroll position
		setTimeout(function () {
			assert.strictEqual(window.scrollX, 0);
			assert.strictEqual(window.scrollY, 0);
			done();
		}, 175);
	});
});
