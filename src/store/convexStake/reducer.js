import actionTypes from '../../constants/actionTypes';

const initialState = {
  convexStakeData: [],
  convexStakeTotal: 0,
  //convexStakingTokenImage: '',
};

export const convexStake = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CVX_TOKEN_DATA:
      return {
        ...state,
        convexStakeData: action?.payload,
      };
    case actionTypes.GET_CVX_TOKEN_TOTAL:
      return {
        ...state,
        convexStakeTotal: action?.payload,
      };
    default:
      return state;
  }
};
