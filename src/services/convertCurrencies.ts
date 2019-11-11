import rates from '../constants/rates';
import decimalPlaces from '../constants/decimalPlaces';
import { via } from '../constants/matrix';
import { round } from '../utils';
import currencyEnum from '../constants/currencyEnum';

// Rounds a number to the decimal places set for the currency. Decimal places fixed.
// returns string representation
function roundAccordingToCurrency(number: number, currency: currencyEnum){ 
  const places = decimalPlaces[currency] || 0;
  return round(number, places);
}

// calculates the rate from one currency to another
// if no direct rate is available, USD is used by default as the go between
// unless the from or to currency is one of the special ones defined in `via`
// where the rate is calculated via a diffrent currency
function getRate(fromCurrency: currencyEnum, toCurrency: currencyEnum){
  let rate: number;
  const directKey: string = `${fromCurrency}${toCurrency}`;
  const invertKey: string = `${toCurrency}${fromCurrency}`;
  const viaCurrency: currencyEnum = via[fromCurrency] || via[toCurrency] || currencyEnum.USD;

  if(fromCurrency === toCurrency){
    rate = 1;
  }
  // direct
  else if(rates[directKey]){
    rate = rates[directKey];
  }
  // inverted
  else if(rates[invertKey]){
    rate = 1/rates[invertKey];
  }
  // via USD or another currency defined in matrix
  else {
    rate = getRate(fromCurrency, viaCurrency) * getRate(viaCurrency, toCurrency);
  }

  return rate;
}

/**
 * Converts amount from one currency to another
 * 
 * @param {number} amount - amount to convert
 * @param {currencyEnum} fromCurrency - the original currency of the amount
 * @param {currencyEnum} toCurrency - the currency to be converted to
 * @return {string} converted amount, rounded to the number of decimal places for the converted currency. Empty string if amount is not defined or null
 */
export default function (amount: number, fromCurrency: currencyEnum, toCurrency: currencyEnum){
  if(typeof amount === "undefined" || amount === null) return '';

  const rate = getRate(fromCurrency, toCurrency);
  const converted = roundAccordingToCurrency(amount * rate, toCurrency);

  return converted;
}

