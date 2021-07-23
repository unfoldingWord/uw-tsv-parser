This demonstrates how to process errors.

Returns: 
`{data: dvalue, errors: evalue}`
where dvalue is a string and errors is an array of integer triplets, where:
	- the first integer is the row number
	- the second integer is the actual number of columns 
    when it does not match the number in the header, 
    which is the expected number; 
    if the number of columns do match the value will be zero.
	- the third integer is the column number (zero based) 
    in the row where the value is not a string;
    if this is not the error on the row, then the value will be -1;


```js
import * as tsvparser from './uw-tsv-parser.js';

function Component() {
  const table = [
    ["A","B","C"],
    ["a1","b1","c1","d"],
    ["a2","b2",["one","two"],"d","e"],
    ["a2","b2",{x:1, y:2}],
  ]

  const tsvObject = tsvparser.tableToTsvString(table);
  const results = tsvObject.data.replaceAll('\t',',');
  const errors  = JSON.stringify(tsvObject.errors,null,4);
  
  return (
  <>
  <p>Table as CSV</p>
  <pre>{results}</pre>
  <p>Error Listing</p>
  <pre>{errors}</pre>
  </>
  )
}
;

<Component />
```