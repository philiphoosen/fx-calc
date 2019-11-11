/**
 * Check whether string represents a valid float
 * Does not support 'e' as a number
 * 
 * @param {string} str - string to check
 * @return {boolean}
 */
export function isStringFloat(str: string){
  return /^[+-]?[\d]*(\.[\d]*)?$/.test(str) && !isNaN(parseFloat(str));
}

/**
 * Rounds a number to specified decimal places.
 * Always returns a string with fixed number of defined places
 * 
 * @param {number} value - number to round
 * @param {number} decimalPlaces - number decimal places to round to
 * @return {string} rounded number as a string, with fixed decimal places
 */
export function round(value: number, decimalPlaces: number) {
  return Number(Math.round(Number(value+'e'+decimalPlaces))+'e-'+decimalPlaces).toFixed(decimalPlaces);
}
