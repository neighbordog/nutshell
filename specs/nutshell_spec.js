var in_a = require('../lib/in-a-nutshell');
var fs = require('fs');

var text = fs.readFileSync("specs/test_data/ants.txt").toString();

describe('in-a-nutshell', function() {
    it('should summarize a given text', function() {
        expect(
            in_a.nutshell(text, 1)
        ).toEqual(
            "This common black ant eats other insects, and also aphid honeydew."
        );
    });

    it('should return as much sentences as declared', function() {
        expect(
            in_a.sentenceTokenize(in_a.nutshell(text, 2)).length
        ).toEqual(
            2
        );
    });

    it('should return the summary in the declared output type', function() {
        expect(
            in_a.nutshell(text, 1, "html")
        ).toEqual(
            "<p>This common black ant eats other insects, and also aphid honeydew.</p>"
        );
    });
});
