This is the "happy path", namely, a normal compliant file/string 
is converted to a 2D array.

```js
import * as tsvparser from './uw-tsv-parser.js';

const text  = "Peace on Earth, good will to men";
const result = wc.wordCount(text);
<>
Total: {result.total}<br/>
Distinct: {result.distinct}
</>
```