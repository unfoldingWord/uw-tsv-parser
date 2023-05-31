# uw-tsv-parser

This demo shows the following:

- How to use the functions to round-trip a TSV file
- How to process any errors (too many or too few columns)

There are two functions in the package that is being demoed.

- One will take a TSV string and return a 2D array of strings
- The other will take a 2D array of strings and return a TSV string

**Note!**

These functions enforce the conventsions spelled out in this article:
https://en.wikipedia.org/wiki/Tab-separated_values

Which basically means such TSV files will never have newline characters or tabs in the content. Instead, newlines will be converted to a two character sequence: '\n'. And tabs similarly become '\t'.
