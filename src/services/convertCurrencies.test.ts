import convert from "./convertCurrencies";
import currency from "../constants/currencyEnum";

// mock data files so that tests will be constant even when rates move
jest.mock('../constants/rates');
jest.mock('../constants/matrix');
jest.mock('../constants/decimalPlaces');


const cases = [
  // 1 to 1
  [1, currency.USD, currency.USD, "1.00"],
  [10, currency.JPY, currency.JPY, "10"],
  [45.123, currency.NOK, currency.NOK, "45.12"],

  // direct
  [1, currency.AUD, currency.USD, "0.83"],
  [10, currency.AUD, currency.USD, "8.27"],
  [45, currency.AUD, currency.USD, "37.22"],
  [45, currency.USD, currency.JPY, "5398"],

  // inverse
  [1, currency.USD, currency.CAD, "1.15"],
  [10, currency.USD, currency.CAD, "11.48"],
  [45, currency.USD, currency.CAD, "51.66"],
  [45, currency.JPY, currency.USD, "0.38"],

  // via euro
  [1, currency.AUD, currency.CZK, "18.54"],
  [10, currency.AUD, currency.CZK, "185.39"],
  [45.2358, currency.AUD, currency.CZK, "838.61"],

  // via euro inverse
  [1, currency.CZK, currency.AUD, "0.05"],
  [10, currency.CZK, currency.AUD, "0.54"],
  [45.2358, currency.CZK, currency.AUD, "2.44"],
  
  // via usd
  [1, currency.AUD, currency.CAD, "0.95"],
  [10, currency.AUD, currency.CAD, "9.49"],
  [45.2358, currency.AUD, currency.CAD, "42.95"],
  [45.2358, currency.AUD, currency.JPY, "4488"],

  // via usd inverse
  [45.2358, currency.JPY, currency.AUD, "0.46"],

];

it.each(cases)('given amount %d is to be converted from %s to %s then should return %s', (amount: any, fromCurrency: any, toCurrency: any, expected: any) => {
  expect(convert(amount, fromCurrency, toCurrency)).toBe(expected);
});
