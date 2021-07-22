

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

export function tsvStringToTable(content) {
  // remove trailing newline if present
  // remove any CR characters
  // then split on new line
  const rows = content.trim().replaceAll('\r','').split('\n');
  let errorMessages = [];
  let expectedNumberOfColumns = -1;
  let table = [];
  for (let i=0; i<rows.length; i++) {
    let columns = rows[i].split('\t');
    if ( i === 0 ) {
      // record the number of columns
      expectedNumberOfColumns = columns.length;
    }

    // validate number of columns
    if ( columns.length !== expectedNumberOfColumns ) {
      errorMessages.push(
        `Row ${i} has incorrect number of columns. Expected ${expectedNumberOfColumns}, found ${columns.length}`
      );
      continue;
    }

    // process lossless conversions
    for (let j=0; j<expectedNumberOfColumns; j++) {
      columns[j] = convertTsvToValue(columns[j]);
    }

    // add to output table
    table.push(columns);
  }

  if ( errorMessages.length !== 0 ) {
    throw Error(errorMessages[0])
  }

  console.log("table=",table);
  return table;
}