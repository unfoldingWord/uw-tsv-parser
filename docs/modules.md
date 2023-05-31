[uw-tsv-parser](README.md) / Exports

# uw-tsv-parser

## Table of contents

### Functions

- [tableToTsvString](modules.md#tabletotsvstring)
- [tsvStringToTable](modules.md#tsvstringtotable)

## Functions

### tableToTsvString

▸ **tableToTsvString**(`incomingTable`): `Object`

This function takes a 2D string array and constructs a TSV string
according to the conventions found here:
https://en.wikipedia.org/wiki/Tab-separated_values
TL;DR the content must be encoded so that the following characters
are replaced by two character escape sequences.
- line feed (newline) characters are replaced with '\n'
- tabs are replaced with '\t'
- carriage returns are replaced by '\r'
- backslash characters are replaced by '\\'

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `incomingTable` | `string`[][] | 2d array of strings |

#### Returns

`Object`

- in the form {data, errors}
- where data is a string containing the TSV content
- errors is an array of integer triplets:
  - the first integer is the row number
  - the second integer is the actual number of columns 
       when it does not match the number in the header, 
       which is the expected number; 
       if the number of columns do match the value will be zero.
       - the third integer is the column number (zero based) 
       in the row where the value is not a string;
       if this is not the error on the row, then the value will be -1

| Name | Type |
| :------ | :------ |
| `data` | `string` |
| `errors` | `number`[][] |

#### Defined in

core/uw-tsv-parser.ts:54

___

### tsvStringToTable

▸ **tsvStringToTable**(`content`): `Object`

This function takes TSV formatted string and returns a 2D table.
Prior to process, it performs the following normalization steps:
- removes leading whitespace
- removes any trailing newline characters
- removes any carriage return characters

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `string` | in TSV format |

#### Returns

`Object`

- in the form {data, errors, header}
where: 
- header is the header row
- data are the data rows, a 2D array of strings
- errors is a list of errors, which are pairs of integers:
     - the first integer is the row number
     - the second integer is the actual number of columns found

| Name | Type |
| :------ | :------ |
| `data` | `string`[][] |
| `errors` | `number`[][] |
| `header` | `string`[] |

#### Defined in

core/uw-tsv-parser.ts:101
