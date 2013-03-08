var casper = require('casper').create();

[
    "string",
    "document-element",
    "document-fragment"
].forEach(function(url) {
    casper.start('tests/functional/iframed--' + url  + '.html', function() {
        this.echo("Iframe injection test for " + url);
    });

    casper.then(function() {
        this.test.assertExists('.iframed', 'The placeholder exists');
    });

    casper.then(function() {
        this.test.assertDoesntExist('.iframed .shouldBeReplaced', 'The placeholder content has been correctly removed');
        this.test.assertExist('.iframed iframe', 'The placeholder contains the injected iframe');
    });

    casper.then(function() {
        // \" phantomjs issue on getElementAttribute - phantomjs-1.8.1
        var phantomjsFix = '\"';
        this.test.assertEquals(this.getElementAttribute('.iframed iframe', 'src'), 'http://www.youtube.com/embed/HacxWKjun24?autoplay=0#t=4s' + phantomjsFix);
    });

    casper.run(function() {
        this.test.done(4);
        this.test.renderResults(true);
    });
});
