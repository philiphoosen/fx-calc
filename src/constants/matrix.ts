/* Rather than storing the full matrix, just store the exception cases.
* All currency conversions use USD, apart from the few listed currencies below, 
* which uses EURO when converting to or from them
*/

import Currency from './currencyEnum';

export const via: {[key: string]: Currency} = {
  CZK: Currency.EUR,
  DKK: Currency.EUR,
  NOK: Currency.EUR
}