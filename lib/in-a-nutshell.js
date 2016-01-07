'use strict'

var natural = require('natural');
var stopwords = natural.stopwords,
    stemmer = natural.PorterStemmer,
    tokenizer = new natural.WordTokenizer();

exports.nutshell = nutshell;
exports.sentenceTokenize = sentenceTokenize;

function nutshell(text, tldr_length) {
    // Set defaults
    tldr_length = tldr_length > 0 ? tldr_length : 4;

    var sents,
        word_set,
        relevant_sentences,
        summary;

    text = text.replace(/(\n)/gi, "");
    sents = sentenceTokenize(text);
    word_set = getWordSet(sents);
    relevant_sentences = getRelevantSentences(word_set);

    // If there are enough tier 1 sentences to generate a summary
    // Else => use tier 2 sentences
    // Else => If not enough tier 2 sentences: throw error
    if(relevant_sentences.tier_1.length >= tldr_length) {
        // Get relevant and unqiue sentences from word set based on determined keyphrase
        summary = relevant_sentences.tier_1.slice(0, tldr_length).map(function(sent) {
            return sents[sent];
        });

    } else if(relevant_sentences.tier_2.length >= tldr_length) {
        // TODO:
        // Create summary from tier 1 und tier 2 sentences
        summary = relevant_sentences.tier_2.slice(0, tldr_length).map(function(sent) {
            return sents[sent];
        });

    } else {
        throw "Provided text doesn't contain enough key sentences to generate a long enough summary (try to reduce the tldr length).";
    }

    return summary.join("\n\n");

};

function normalize(text) {
    var normalized_string = text.toLowerCase();
    normalized_string = stemmer.stem(normalized_string);
    return normalized_string;
};

function getWordSet(sents) {
    // Generate a dictonary-like object build from words (keys) and all sentences that include this word (value => array)
    // by itering through every sentence and then every word of the sentence

    // TODO:
    // Add pos tagger, if feasible
    var word_set = {};

    // Loop through sentences in sents
    for(var i=0; i < sents.length; i++) {

        // Split sentence into words
        var words = tokenizer.tokenize(sents[i]);

        // Loop through every word in the sentence
        for(var i2=0; i2 < words.length; i2++) {

            var word = words[i2];
            word = normalize(word);

            // Add word to word set if it is not a stop word and long enough to be relevant
            if(stopwords.indexOf(word) === -1 && word.length > 2) {
                if(word in word_set) {
                    word_set[word].push(i);
                } else {
                    word_set[word] = [i];
                }
            }
        }

    }

    return word_set;
};

function getRelevantSentences(word_set) {
    // Determine key phrases by word frequency
    // and produce result set of relevant sentences for the
    // two most frequent words
    var result_set = {
        "tier_1" : [],
        "tier_2" : []
    };
    var key_phrases = [];

    // Determine key phrases
    key_phrases = Object.keys(word_set).sort(function(a, b) {
        if(word_set[a].length < word_set[b].length)
            return -1
        if(word_set[a].length > word_set[b].length)
            return 1;
        return 0;
    }).reverse();

    // Most frequent words
    var top_word = key_phrases[0],
        second_word = key_phrases[1];

    // Determine relevant sentences by occurence intersection between
    // the most frequend word and the second most frequent word
    var relevant_sentences = word_set[top_word].concat(word_set[second_word]);
    result_set.tier_1 = relevant_sentences.intersections().array_unique();
    result_set.tier_2 = relevant_sentences.array_unique();

    return result_set;
};

function sentenceTokenize(text) {
    // Split text into sentences
    var tokens = text.match(/([\"\'\‘\“\'\"\[\(\{\⟨][^\.\?\!]+[\.\?\!][\"\'\’\”\'\"\]\)\}\⟩]|[^\.\?\!]+[\.\?\!])\s?/g);

    if(!tokens)
        throw "Couldn't find any sentences in text.";

    // Remove unecessary white space
    tokens = tokens.map(Function.prototype.call, String.prototype.trim);

    return tokens;
};

// Helper function:
// Get unique elements of an given array
Array.prototype.array_unique = function() {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if (result.indexOf(this[i]) == -1) {
            result.push(this[i]);
        }
    }
    return result;
};

// Helper function:
// Find duplicates in an array
Array.prototype.intersections = function() {
    var result = []
    for (var i = 0, len = this.length - 1; i < len; i++) {
      if((result.indexOf(this[i]) == -1) && (this.indexOf(this[i], i + 1) != -1)) {
          result.push(this[i]);
       }
    }
    return result;
}
