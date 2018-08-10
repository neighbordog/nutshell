var in_a = require('../lib/in-a-nutshell');
var fs = require('fs');

var ants = fs.readFileSync("specs/test_data/ants.txt").toString();
var tesla = fs.readFileSync('specs/test_data/tesla.txt').toString();

describe('in-a-nutshell', function() {
    it('should summarize a given ants', function() {
        expect(
            in_a.nutshell(ants, 1)
        ).toEqual(
            'This common black ant eats other insects, and also aphid honeydew.'
        );
    });

    it('should return as much sentences as declared', function() {
        expect(
            in_a.sentenceTokenize(in_a.nutshell(ants, 2)).length
        ).toEqual(
            2
        );
    });

    it('should return the summary in the declared output type', function() {
        expect(
            in_a.nutshell(ants, 1, 'html')
        ).toEqual(
            '<p>This common black ant eats other insects, and also aphid honeydew.</p>'
        );
    });
  
    it('should handle reserved keywords', function() {
       const text = 'An example keyword is constructor.'
       expect(
           in_a.nutshell(text, 1)
       ).toEqual(
           text
       );
    });

    it('should handle complex sentences', function() {
       expect(
           in_a.nutshell(tesla, 1)
       ).toEqual(
           '“That’s a clear factual statement,” said John C. Coffee Jr., a professor at Columbia Law School who specializes in corporate law and securities fraud.'
       )
    });
});
