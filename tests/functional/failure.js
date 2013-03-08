var casper = require('casper').create();

[
    "tests/functional/failure.html"
].forEach(function(url) {
    casper.start('', function() {
        this.echo("Iframe injection test");
    });

    casper.then(function() {
        this.test.assertDoesntExist('.doesNotExists', 'The placeholder does not exist');
    });

    casper.then(function() {
        this.test.assertDoesntExist('.doesNotExists p', 'The placeholder has not receive the content');
    });

    casper.run(function() {
        this.test.done(2);
        this.test.renderResults(true);
    });
});
