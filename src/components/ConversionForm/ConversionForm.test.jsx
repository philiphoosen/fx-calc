import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from "redux-mock-store";
import ConversionFormContainer from './ConversionFormContainer'
import Currency from '../../constants/currencyEnum';
import convertCurrencies from '../../services/convertCurrencies';
import ConversionForm, { AmountInput } from './ConversionForm';

const mockStore = configureMockStore();

describe('Conversion Container', () => {
  it("should render successfully", () => {
    const testState = {};

    const store = mockStore(testState);
    
    const component = shallow(<ConversionFormContainer store={store} />, {context: {store}});
    expect(typeof component).toBe('object');
  });

  it("should compute the converted currency amount and passed as a prop", () => {
    const fromCurrency = Currency.AUD;
    const toCurrency = Currency.NOK;
    const amount = 23.48;

    const testState = {
      convertor:{
        fromCurrency,
        toCurrency,
        amount
      }
    };

    const store = mockStore(testState);
    const expectedConvertedAmount = convertCurrencies(amount, fromCurrency, toCurrency);

    const component = shallow(<ConversionFormContainer store={store} />, {context: {store}});

    expect(component.find(ConversionForm).props().convertedAmount).toBe(expectedConvertedAmount);
  });
});

describe('Conversion Form', () => {
  it("should call callback on form change", () => {
    const fromCurrency = Currency.AUD;
    const toCurrency = Currency.NOK;
    const amount = 23.48;

    const updateConversionMock = jest.fn();

    const component = shallow(<ConversionForm 
      fromCurrency={fromCurrency} 
      toCurrency={toCurrency} 
      amount={0} 
      updateConversion={updateConversionMock}
    />);
    
    const amountInput = component.find(AmountInput);
    amountInput.simulate("change", {
      target:{
        value: amount,
        id: amountInput.props().id
      }
    });

    
    expect(updateConversionMock.mock.calls.length).toBe(1);

    const arg = updateConversionMock.mock.calls[0][0];
    expect(arg.amount).toBe(amount);
    expect(arg.fromCurrency).toBe(fromCurrency);
    expect(arg.toCurrency).toBe(toCurrency);
  });

  it("given non float amount then should prevent update", () => {
    const fromCurrency = Currency.AUD;
    const toCurrency = Currency.NOK;
    const amount = 23.48;

    const updateConversionMock = jest.fn();

    const component = shallow(<ConversionForm 
      fromCurrency={fromCurrency} 
      toCurrency={toCurrency} 
      amount={amount} 
      updateConversion={updateConversionMock}
    />);
    
    const amountInput = component.find(AmountInput);
    amountInput.simulate("change", {
      target:{
        value: "2abc",
        id: amountInput.props().id
      }
    });

    
    expect(updateConversionMock.mock.calls.length).toBe(1);

    const arg = updateConversionMock.mock.calls[0][0];
    expect(arg.amount).toBe(amount);
  });

  it("given amount over 15 chars then should prevent update", () => {
    const fromCurrency = Currency.AUD;
    const toCurrency = Currency.NOK;
    const amount = 23.48;

    const updateConversionMock = jest.fn();

    const component = shallow(<ConversionForm 
      fromCurrency={fromCurrency} 
      toCurrency={toCurrency} 
      amount={amount} 
      updateConversion={updateConversionMock}
    />);
    
    const amountInput = component.find(AmountInput);
    amountInput.simulate("change", {
      target:{
        value: "1234567890123456",
        id: amountInput.props().id
      }
    });

    
    expect(updateConversionMock.mock.calls.length).toBe(1);

    const arg = updateConversionMock.mock.calls[0][0];
    expect(arg.amount).toBe(amount);
  });
});