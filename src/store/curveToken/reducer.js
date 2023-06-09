import actionTypes from '../../constants/actionTypes';

const initialState = {
  curveTokenData: [],
  curveTokenTotal: 0,
  curveTokenIsLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const curveToken = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CRV_TOKEN_DATA:
      return {
        ...state,
        curveTokenData: action?.payload,
      };
    case actionTypes.GET_CRV_TOKEN_TOTAL:
      return {
        ...state,
        curveTokenTotal: action?.payload,
      };
    case actionTypes.SET_CRV_TOKEN_LOADING:
      return {
        ...state,
        curveTokenIsLoading: action?.payload,
      };
    default:
      return state;
  }
};
