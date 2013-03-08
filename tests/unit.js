//var casper = require('casper').create();

var replaceholder = require('../replaceholder.js');

casper.test.begin('replaceholder can be loaded', 1, function suite(test) {
	test.assert(typeof replaceholder === 'function');
	test.done();
});
