import React, { useState, FormEvent, ChangeEvent } from "react";
import Select, { ValueType } from 'react-select';
import styled from 'styled-components';
import currencyEnum from '../../constants/currencyEnum';
import { IConversionDetails } from '../../ducks/convertor';
import Color from '../../constants/color';
import { isStringFloat } from '../../utils';

/* styling */
const Form = styled.form`
  display: inline-block;
`;

const CurrencySelect = styled(Select)`
  display: inline-block;
  width: 90px;
  margin: 5px;
`;

export const AmountInput = styled.input`
  width: 160px;
  height: 32px;
  font-size: 20px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 5px 8px 5px 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
  text-align: right;
  
`;

const ConvertedContainer = styled.div`
  min-width: 165px;
  max-width: 180px;
  overflow-x: auto;
  color: white;
  margin: 5px 13px 5px 5px;
  font-size: 24px;
`;

const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const FieldWrapper = styled.div`
  border: 0;
  background: ${Color.PRIMARY};
  padding: 15px;
  display: flex;  
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  border-radius: 15px;
  text-align: right;
`;

const Label = styled.label`
  width: 50px;
  font-size: 22px;
  text-align: left;
  margin-right: 15px;
`;

interface IConversionFormProps {
  amount?: string;
  convertedAmount?: string;
  fromCurrency?: currencyEnum;
  toCurrency?: currencyEnum;
  updateConversion: (payload: IConversionDetails) => void;
}

interface ICurrencyOption {
  elementId: string,
  label: string,
  value: currencyEnum
}

const ConversionForm: React.SFC<IConversionFormProps> = (props) => {
  const { convertedAmount, updateConversion } = props;

  // get form values from 'component' state using hooks
  const [formState, setFormState] = useState({
    amount: props.amount || '',
    fromCurrency: props.fromCurrency || currencyEnum.AUD,
    toCurrency: props.toCurrency || currencyEnum.AUD
  });

  let { amount, fromCurrency, toCurrency }: {amount: string, fromCurrency: currencyEnum, toCurrency: currencyEnum} = formState;

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    let value: any = event!.target!.value;

    // discard change if amount length is over 15 chars or is not a valid float
    if(value.length > 15 || (value.length && !isStringFloat(value))){
      value = formState.amount;
    }
    updateState(event!.target!.id, value);
    dispatchUpdate();

  }

  function handleCurrencyChange(selected: ValueType<ICurrencyOption>) {
    const selectedCurrency: ICurrencyOption = selected as ICurrencyOption;

    updateState(selectedCurrency.elementId, selectedCurrency.value);
    dispatchUpdate();
  }

  function updateState(key: string, value: any){
    const newState = {...formState, [key]: value };
    setFormState(newState);
    ({ amount, fromCurrency, toCurrency } = newState);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function dispatchUpdate(){
    updateConversion({ amount: amount || '', fromCurrency, toCurrency });
  }

  // create Select options using values in currency enum
  function getCurrencyOptions(currencyEnum: any, elementId: string){
    return Object.keys(currencyEnum).map(
      (key: any, i: number) => ({
        elementId,
        label: currencyEnum[key],
        value: key
      })
    );
  };

  const fromCurrencyOptions: ICurrencyOption[] = getCurrencyOptions(currencyEnum, 'fromCurrency');
  const toCurrencyOptions = getCurrencyOptions(currencyEnum, 'toCurrency');
  
  return (
    <Form onSubmit={handleSubmit}>
      <RowWrapper>
        <Label htmlFor="amount">From</Label>
        <FieldWrapper>
          <AmountInput
            type="text"
            id="amount"
            value={amount || ''}
            onChange={handleAmountChange}
            maxLength={15}
          />
          <CurrencySelect 
            id="fromCurrency" 
            value={fromCurrencyOptions.find((o: ICurrencyOption)=>o.value === fromCurrency)}
            onChange={handleCurrencyChange}
            options={fromCurrencyOptions}
          />
        </FieldWrapper>
      </RowWrapper>
      <RowWrapper>
        <Label htmlFor="toCurrency">To</Label>
        <FieldWrapper>
          <ConvertedContainer>
            {convertedAmount}
          </ConvertedContainer>
          <CurrencySelect 
            id="toCurrency" 
            value={toCurrencyOptions.find((o: ICurrencyOption)=>o.value === toCurrency)}
            onChange={handleCurrencyChange}
            options={toCurrencyOptions}
          />
        </FieldWrapper>
      </RowWrapper>
    </Form>
  )
}

export default ConversionForm;