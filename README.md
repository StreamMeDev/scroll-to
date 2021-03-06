# Scroll To

[![NPM Version](https://img.shields.io/npm/v/@streammedev/scroll-to.svg)](https://npmjs.org/package/@streammedev/scroll-to)
[![NPM Downloads](https://img.shields.io/npm/dm/@streammedev/scroll-to.svg)](https://npmjs.org/package/@streammedev/scroll-to)
[![Build Status](https://travis-ci.org/StreamMeDev/scroll-to.svg?branch=master)](https://travis-ci.org/StreamMeDev/scroll-to)
[![js-happiness-style](https://img.shields.io/badge/code%20style-happiness-brightgreen.svg)](https://github.com/JedWatson/happiness)

Smoothly transition any element's scroll position along either axis.

## Install

```
$ npm install --save @streammedev/scroll-to
```

## Usage

```javascript
var scrollTo = require('@streammedev/scroll-to');

function someEventHandler () {
	scrollTo({
		element: window, // The element to scroll (default is window)
		y: 1000, // scroll the window to a y-coordinate of 1000px (default is 0)
		x: 1000, // scroll the window to a x-coordinate of 1000px (default is 0)
		duration: 500 // 500ms to complete the scrolling animation (default is 150)
	});
}

// cancel an in progress animation
var stop = scrollTo();
// Will stop wherever it is in the process of the animation
stop();
```

## Development

This package follows semver, when you wish to publish a version run the proper npm command.  For example, if we made a bug fix you can do this:

```
$ npm version patch
$ git push
$ npm publish
```

Here are the other types of version bumps:

- Major (`npm version major`): This is for breaking changes. Anytime a method is changed or the functionality is modified this bump should be made.
- Minor (`npm version minor`): This is for features additions. When a new method is added which doesn't affect the behavior of existing features, this bump should be made.
- Patch (`npm version patch`): This is for bug fixes. Only bump this if it is safe for production code to update wihout being QA'd.  (AKA, almost never)

For each of these you can run a 'pre' version by prepending to the command, ex `npm version preminor`.

All feature development should be done on a branch off `master`.  When a feature is complete and the pull request approved, publish a 'pre' version of the package for testing across environments.  To install that 'pre' version of the package do the following, where the verison number contains the correct 'pre' version:

```
$ npm install --save @streammedev/scroll-to@1.0.0-0
```

Running the tests:

```
$ npm install && npm test
```
