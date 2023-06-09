import actionTypes from '../../constants/actionTypes';

const initialState = {
  snowSwanData: [],
  snowSwapTotal: 0,
  snowSwapIsLoading: true,
};
//takes two arguments: The current state and the action and returns the new state.
export const snowSwap = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SNOW_SWAP_DATA:
      return {
        ...state,
        snowSwanData: action?.payload,
      };
    case actionTypes.GET_SNOW_SWAP_TOTAL:
      return {
        ...state,
        snowSwapTotal: action.payload,
      };
    case actionTypes.SET_SNOW_SWAP_LOADING:
      return {
        ...state,
        snowSwapIsLoading: action?.payload,
      };
    default:
      return state;
  }
};
