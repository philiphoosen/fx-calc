import { isStringFloat } from '../utils';
import currencyEnum from '../constants/currencyEnum';

// Actions
const UPDATE   = 'fx-calc/convertor/UPDATE';

// Reducer
export default function reducer(state = {}, {type, payload}: {type?: string, payload?: IConversionDetails} = {}) {
  switch (type) {
    case UPDATE :
      if(payload){
        return { ...state, 
          fromCurrency: payload.fromCurrency,
          toCurrency: payload.toCurrency,
          amount: isStringFloat(payload.amount)?parseFloat(payload.amount):null
        };  
      }
  }

  return state;
}

// Action Creators
export function updateConversion(payload: IConversionDetails) {
  return { type: UPDATE, payload };
}

// Interface
export interface IConversionDetails {
  amount: string;
  fromCurrency: currencyEnum;
  toCurrency: currencyEnum;
}
