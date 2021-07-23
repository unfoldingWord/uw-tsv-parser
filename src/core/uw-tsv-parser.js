

/* Lossless Conversions are:
   \n for newline,
   \t for tab,
   \r for carriage return,
   \\ for backslash.
*/

export function tsvTableToString() {

}

function convertTsvToValue(incomingString) {
  let newValue = incomingString;
  newValue = newValue.replaceAll("\\n", '\n');
  newValue = newValue.replaceAll("\\t", '\t');
  newValue = newValue.replaceAll("\\r", '\r');
  return newValue;
}

/*
Returns: 
`{header: hvalue, data: dvalue, errors: evalue}`
*/
export function tsvStringToTable(content) {
  // remove trailing newline if present
  // remove any CR characters
  // then split on new line
  const rows = content.trim().replaceAll('\r','').split('\n');
  let expectedNumberOfColumns = -1;
  let errors = [];
  let header = [];
  let table = [];
  for (let i=0; i<rows.length; i++) {
    let columns = rows[i].split('\t');
    if ( i === 0 ) {
      // record the number of columns
      expectedNumberOfColumns = columns.length;
      header = columns;
      continue;
      // the header receives no further processing
    }

    // validate number of columns
    if ( columns.length !== expectedNumberOfColumns ) {
      // first integer is row number; second is number of columns found
      let error = [];
      error.push(i);
      error.push(columns.length);
      errors.push(error);
    }

    // process lossless conversions
    for (let j=0; j<columns.length; j++) {
      columns[j] = convertTsvToValue(columns[j]);
    }

    // add to output table
    table.push(columns);
  }
  const tableObject = {header: header, data: table, errors: errors};
  console.log("tableObject=",tableObject);
  return tableObject;
}
