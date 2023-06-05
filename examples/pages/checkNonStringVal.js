import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import * as tsvparser from 'uw-tsv-parser';

export const CheckNonStringVal = () => {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [messages, setMessages] = useState(null);

  const table = [
    ["A","B","C"],
    ["one",true,"C"],
    ["four",5,"D"],
    ["seven",["a",'b'],"E"],
    ["eight",{prop1:'val1',prop2:'val2'}],
    ["this","is","normal"]
  ]
  useEffect(() => {
    function convertTable()  {
      const { data: tsv, header, errors: errlist } =
        tsvparser.tableToTsvString(table);
      console.log('tsv=', tsv);
      console.log('Errors:', errlist);

      setResults(JSON.stringify(errlist,null,4));
      let _messages = "";
      if (errlist.length > 0) {
        const expectedColumns = tsv[0].length;
        for (let i = 0; i < errlist.length; i++) {
          let msg;
          let rownum = errlist[i][0] - 1; // adjust for data table without header row
          let colsfound = errlist[i][1];
          let errColumn = errlist[i][2];
          if (colsfound !== 0 ) {
            msg = `In row ${
              rownum + 1
            } the number of columns do not match header row: found ${colsfound} expecting ${expectedColumns}`;
          } else {
            msg = `In row ${rownum+1}, column ${errColumn+1} should be a string, found a ${
              typeof table[rownum+1][errColumn]}: ${
                String(table[rownum+1][errColumn])}`;
          }

          _messages += `\n\n${msg}`;
        }
        setMessages(_messages);
      } else {
        setMessages('No errors found!');
      }
    }
    if (!results) {
      convertTable();
    }
  }, [results]);

  return (
    <div>
      <h1>Convert Table to TSV Demo</h1>
      <p>
        In this demo, an in-memory table is converted to TSV. It will
        check for any values that are not strings, such as booleans,
        arrays, numbers, or objects.
      </p>
      <pre>{messages}</pre>
      <pre>{results}</pre>
      <button onClick={() => router.push('/')}>Close</button>
    </div>
  );
};

export default CheckNonStringVal;
