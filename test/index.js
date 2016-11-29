/* global describe, it, beforeEach */
var assert = require('assert');
var scrollTo = require('../');

describe('scroll-to', function () {
	beforeEach(function () {
		// create a super tall/fat div so the headless browser allows scrolling
		document.body.innerHTML = '<div class="wrapper"><div class="element" style="height: 10000px; width: 10000px;"></div></div>';
		// ensure always starting at the top
		window.scroll(0, 0);
	});

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
		// set scroll down the page
		window.scroll(1000, 1000);

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

	it('test scrolling other elements', function (done) {
		// restrict the size of the wrapper
		var wrapper = document.querySelector('.wrapper');
		wrapper.style.width = '100px';
		wrapper.style.height = '100px';
		wrapper.style.overflow = 'scroll';

		// defaults: {x: 0, y: 0, duration: 150}
		scrollTo({
			element: wrapper,
			x: 1000,
			y: 1000
		});

		// inspect the scroll position part way through the animation
		setTimeout(function () {
			assert(wrapper.scrollLeft < 1000);
			assert(wrapper.scrollTop < 1000);
			assert(wrapper.scrollLeft > 0);
			assert(wrapper.scrollTop > 0);
		}, 50);

		// inspect the scroll position near completion
		setTimeout(function () {
			assert(wrapper.scrollLeft > 950);
			assert(wrapper.scrollLeft < 1001);
			assert(wrapper.scrollTop > 950);
			assert(wrapper.scrollTop < 1001);
		}, 150);

		// inspect the final scroll position
		setTimeout(function () {
			assert.strictEqual(wrapper.scrollLeft, 1000);
			assert.strictEqual(wrapper.scrollTop, 1000);
			done();
		}, 175);
	});

	it('should stop an animation correctly', function (done) {
		var stop = scrollTo({
			x: 1000,
			y: 1000,
			duration: 150
		});

		setTimeout(function () {
			stop();
		}, 75);
		// Check that it preemptively ended the animation
		setTimeout(function () {
			assert(window.scrollX < 700);
			assert(window.scrollY < 700);
			assert(window.scrollX > 300);
			assert(window.scrollY > 300);
			done();
		}, 100);
	});
});
