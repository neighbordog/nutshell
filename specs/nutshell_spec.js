var in_a = require('../lib/nutshell');
var fs = require('fs');

var text = fs.readFileSync("specs/test_data/ants.txt").toString();

describe('nutshell', function() {
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
});
