import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import * as tsvparser from 'uw-tsv-parser';

export const ColMismatch = () => {
  const router = useRouter();
  const [text, setText] = useState(null);
  const [results, setResults] = useState('Waiting...');

  useEffect(() => {
    async function getText() {
      const res = await fetch('/colmismatch.tsv').then((data) => {
        return data;
      });
      // note: returns are leftovers from how the file was created
      // in stackblitz. Not sure how to force it to use LF for linebreaks
      // thus removing them...
      let _text = await res.text();
      _text = _text.replace(/[\r]/gm, '');
      console.log('Fetched file:\n', _text);
      setText(_text);
    }
    if (text === null) {
      getText();
    }
  }, []);

  useEffect(() => {
    function parseText() {
      let _results = '';
      const { data, header, errors } = tsvparser.tsvStringToTable(text);
      console.log('header row:', header);
      console.log('Errors:', errors);
      if (errors.length > 0) {
        const expectedColumns = header.length;
        for (let i = 0; i < errors.length; i++) {
          let msg;
          let rownum = errors[i][0] - 1; // adjust for data table without header row
          let colsfound = errors[i][1];
          if (colsfound > expectedColumns) {
            msg = `Row ${
              rownum + 1
            } is too long: found ${colsfound} expecting ${expectedColumns}`;
          } else {
            msg = `Row ${
              rownum + 1
            } is too short: found ${colsfound}  expecting ${expectedColumns}`;
          }
          _results += `\n\n${msg}:`;
          _results += '\n' + data[rownum].join(',');
        }
        setResults(_results);
      } else {
        setResults('No errors found!');
      }
    }
    if (text) {
      parseText();
    }
  }, [text]);

  return (
    <div>
      <h1>Column Mismatch Demo</h1>
      <p>
        In this demo, one of the rows does not have the same number of columns
        as the columer header row.
      </p>
      <pre>{results}</pre>
      <button onClick={() => router.push('/')}>Close</button>
    </div>
  );
};

export default ColMismatch;
