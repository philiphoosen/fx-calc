import { connect } from "react-redux";
import { updateConversion, IConversionDetails } from '../../ducks/convertor';
import convertCurrencies from '../../services/convertCurrencies';
import ConversionForm from './ConversionForm';

// calculate converted amount when mapping state to props
const mapStateToProps = (state: any) => { 
  const { amount, fromCurrency, toCurrency }  = state.convertor || {};
  
  return {
    amount,
    fromCurrency,
    toCurrency,
    convertedAmount: convertCurrencies(amount, fromCurrency, toCurrency )
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    updateConversion: (payload: IConversionDetails) => dispatch(updateConversion(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversionForm);
