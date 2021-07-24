This is the "happy path", namely, a normal compliant file/string 
is converted to a 2D array.

```js
import * as tsvparser from './uw-tsv-parser.js';

function Component() {
  const text  = 
`A\tB\tC
a1\tb1\tc1.a\\n\\n\\t\\tc1.b
a2\tb2\tc2
`
  let results;
  const {data: table, header} = tsvparser.tsvStringToTable(text);
  const fullTable = [];
  fullTable.push(header);
  for (let i=0; i<table.length; i++) {
    fullTable.push(table[i]);
  }
  const {data: tsv}   = tsvparser.tableToTsvString(fullTable);
  console.log("text=",text);
  console.log("tsv=",tsv);
  if (text === tsv) {
    results = "Round Trip Succeeded";
  } else {
    results = "Round Trip Failed:";
    results += `\n${text}\n\n---vs---\n`;
    results += `\n${tsv}`
  }

  return (
  <>
  <pre>{results}</pre>
  </>
  )
}
;

<Component />
```