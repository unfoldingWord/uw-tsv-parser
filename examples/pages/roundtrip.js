import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import * as tsvparser from 'uw-tsv-parser';

export const RoundTrip = () => {
  const router = useRouter();
  const [text, setText] = useState(null);
  const [results, setResults] = useState('Waiting...');

  useEffect(() => {
    async function getText() {
      const res = await fetch('/roundtrip.tsv').then((data) => {
        return data;
      });
      // note: returns are leftovers from how the file was created
      // in stackblitz. Not sure how to force it to use LF for linebreaks
      // thus removing them...
      let _text = await res.text();
      _text = _text.replace(/[\r]/gm, '');
      setText(_text);
    }
    if (text === null) {
      getText();
    }
  }, []);

  useEffect(() => {
    function parseText() {
      let _results;
      const { data: table, header } = tsvparser.tsvStringToTable(text);
      const fullTable = [];
      fullTable.push(header);
      for (let i = 0; i < table.length; i++) {
        fullTable.push(table[i]);
      }
      const { data: tsv, errors: errlist } =
        tsvparser.tableToTsvString(fullTable);
      console.log('text=', text);
      console.log('tsv=', tsv);
      console.log('header row:', header);
      console.log('Errors:', errlist);
      if (text === tsv) {
        _results = 'Round Trip Succeeded';
      } else {
        _results = 'Round Trip Failed:';
        _results += `\n${text}\n\n---vs---\n`;
        _results += `\n${tsv}`;
        _results += `\nLength of TSV file:${text.length}`;
        _results += `\nLength of parsed file: ${tsv.length}`;
        for (let i = 0; i < text.length; i++) {
          if (text.charAt(i) === tsv.charAt(i)) {
            continue;
          }
          _results += '\n\nFirst difference is at offset:' + i;
          _results += `\nThe TSV file has "${text.charAt(
            i
          )}", which is character code=${text.charCodeAt(i)}`;
          _results += `\n-Parsed file has "${tsv.charAt(
            i
          )}", which is character code=${tsv.charCodeAt(i)}`;
          break;
        }
      }
      setResults(_results);
    }
    if (text) {
      parseText();
    }
  }, [text]);

  return (
    <div>
      <h1>Round Trip Demo</h1>
      <p>
        In this demo, the file is parsed and then re-assembled. If the parsed
        and re-assembled is same as the original, then the test passes.
        Otherwise it fails and various information is shown where the
        differences are.
      </p>
      <p>
        <em>
          Note: Stackblitz seems to create files with returns so the code is
          removing all returns prior to evaluating.
        </em>
      </p>
      <pre>{results}</pre>
      <button onClick={() => router.push('/')}>Close</button>
    </div>
  );
};

export default RoundTrip;
