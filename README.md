# Replaceholder.js [![Build Status](https://travis-ci.org/MoOx/replaceholder.js.png)](https://travis-ci.org/MoOx/replaceholder.js)

It's a simple script that allow you to replace some placeholder by the content you want, when you want.

# Usage

*Replaceholder can be used in CommonJS-like environnement (like Node.js) or using an AMD loader. It can also just be loaded as a global var (old school usage in the browser).**

- Choose a name (eg. `mystuff`).
- Write a replacement string, using predefined flags or create a callback function using them.
- Place your placeholder where you want in your DOM like that:
    `<div class="mystuff" (data-mystuff-{{ parameter }}="{{ value }}")*><!-- content that will be replaced (eg. loading img, or nothing, it should be fast enough) --></div>`
- Call the replacement method when you want (you can attach it the to DOM ready or window.load:
    `replaceholder(name, callback);``

# Example

```html
<div class="worldcompany_video" data-worldcompany_video-id="87qsd54" data-worldcompany_video-width="584" data-worldcompany_video-width="322"></div>
```

```javascript
replaceholder('worldcompany_video', function(params) {
    return '<iframe ' +
        width="' + params.width +
        height="' + params.height +
        src="http://worldcompany_video.com/watch?id=' + params.id + '"' +
        '">';
    }
}, {
	'mouseover': function(event) {

	},
	'touchstart': function(event) {

	}
});
```

# Tests

The tests require [PhantomJS](http://phantomjs.org/download.html) & [CasperJS](http://casperjs.org/installation.html).

Once PhantomJS and CasperJS are installed on your machine, you should obtain something like this:

```
$ phantomjs --version
1.8.1
$ casperjs --version
1.0.1
```
Then, to run functionals tests

	casperjs test tests/functional/iframe.js
	casperjs test tests/functional/failure.js

To run unit tests (CapserJS 1.1 is required)

	casperjs test tests/unit.js

Or you can just run the Grunt task (require Node, NPM & grunt-cli)

	npm install
	grunt test
