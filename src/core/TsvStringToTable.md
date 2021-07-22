This is the "happy path", namely, a normal compliant file/string 
is converted to a 2D array.

```js
import * as tsvparser from './uw-tsv-parser.js';

const text  = 
`A\tB\tC
a1\tb1\tc1.a\\n\\n\\t\\tc1.b
a2\tb2\tc2
`

let results;
let table;
try {
  table = tsvparser.tsvStringToTable(text);
  const numrows = table.length;
  const header = table[0].join(",");
  results = `Number of rows is ${numrows}`;
  results += `\n\n... with header ${header}`;
  results += `\n\ncell 1,2 is:\n${table[1][2]}`;
} catch (err) {
  results = err;
}
;
<>
<pre>{results}</pre>
</>
```