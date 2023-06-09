import actionTypes from '../../constants/actionTypes';

//The parameter currentState/state needs a default value equals to the initial structure of the store, and for that
//create an object called initialState and assign it as the default value of currentState.
//this current state passed as argument in the below function
const initialState = {
  yearnFinanceData: [],
  yearnFinanceTotal: 0,
  yearnYTokenData: [],
  yearnYTokenTotal: 0,
  yearnFinanceisLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const yearnFinance = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_YFI_TOKEN_DATA:
      return {
        ...state,
        yearnFinanceData: action?.payload,
      };
    case actionTypes.GET_YFI_TOKEN_TOTAL:
      return {
        ...state,
        yearnFinanceTotal: action?.payload,
      };
    case actionTypes.GET_YTOKEN_DATA:
      return {
        ...state,
        yearnYTokenData: action?.payload,
      };
    case actionTypes.GET_YTOKEN_TOTAL:
      return {
        ...state,
        yearnYTokenTotal: action?.payload,
      };
    case actionTypes.SET_YFI_LOADING:
      return {
        ...state,
        yearnFinanceisLoading: action?.payload,
      };
    default:
      return state;
  }
};
