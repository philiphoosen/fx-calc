import * as utils from "./";

const checkFloatCases = [
  ['', false],
  ['1', true],
  ['+1', true],
  ['-11', true],
  ['25511.115452354', true],
  ['-11.12354', true],
  ['-.12354', true],
  ['-0.12354', true],
  ['0.12354', true],
  ['3e', false],
  ['3.2.3', false],
  ['-3.2.3', false],
  ['-3.2ab', false],
  ['qwerty', false],
  ['-3.2-4', false],
  ['3.2+4', false],
];

it.each(checkFloatCases)('given %s when isStringFloat then should return %s', (str: any, expected: any) => {
  expect(utils.isStringFloat(str)).toEqual(expected);
});


const roundCases = [
  [1.005, 2, '1.01'],
  [1.005, 4, '1.0050'],
  [1.005, 0, '1'],
  [1.1, 2, '1.10'],
  [88, 0, '88'],
  [0, 0, '0'],
  [0, 2, '0.00'],
  [35.789, 2, '35.79'],
  [35.799, 2, '35.80'],
  [null, 2, 'NaN'],
];

it.each(roundCases)('given number %d is to be rounded to %d places then should return %s', (num: any, places: any, expected: any) => {
  expect(utils.round(num, places)).toEqual(expected);
});
