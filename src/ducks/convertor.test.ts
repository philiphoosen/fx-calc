import reducer from './convertor';

const state = {};
const actionType = 'fx-calc/convertor/UPDATE';

const cases = [
  ["NZD", "NOK", '23', 23],
  ["NZD", "NOK", '23abc', 'null']
];

describe('reducer', () => {
  it.each(cases)('given currency from %s to %s and amount %d is reduced, then amount in state should be %s', (fromCurrency: any, toCurrency: any, amount: any, expectedAmount: any) => {
    const expected = {...state, fromCurrency, toCurrency, amount: expectedAmount};
    const newState: any = reducer(state, {type: actionType, payload: {fromCurrency, toCurrency, amount}});
    const nulledExpectedAmount = expectedAmount==='null'?null:expectedAmount;

    expect(newState.fromCurrency).toEqual(expected.fromCurrency);
    expect(newState.toCurrency).toEqual(expected.toCurrency);
    expect(newState.amount).toEqual(nulledExpectedAmount);
  });
});