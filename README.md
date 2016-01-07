#in-a-nutshell

`in-a-nutshell` creates a compressed summary of every text or article you give it.

##How it works
The principle behind `in-a-nutshell` is very simple. It first determines the relevant words
based on word frequency (excluding stop words) of a given text and then produces a summary out of the
sentences that include said key phrases.

Due to it's simple nature `in-a-nutshell` can be imprecise at times, especially when it comes to contents of fictional nature.
If you're looking for a more accurate solution, take a look at the TF-IDF algorithm.

##Requirements
in-a-nutshell makes heavy use of the module `natural`

##Basic usage

```javascript
var in_a = require('in-a-nutshell');

var summary = in_a.nutshell(YOUR_TEXT);
```

##Example

###Source

[Four super-heavy elements added to the periodic table on Wired](http://www.wired.co.uk/news/archive/2016-01/04/new-elements-periodic-table)

###Output
> Millions of science textbooks are now out of date as four new elements have been added
> to the periodic table.
>
> The four super-heavy elements, discovered by scientists from Japan, Russia and America,
> complete the seventh row of the table as they become the first additions since 2011.
>
> All of the new elements are man-made and were discovered by slamming lighter nuclei into each
> other and then tracking the decay of the radioactive elements.
>
> Their addition to the periodic table marks a significant scientific breakthrough, though
> the elements do not exist for long before they breakdown and become different elements.
>
> Relevant words: element, table...

##License

Copyright (c) 2016 Kevin Eichhorn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
