import {
  GET_TOKEN_DATA,
  GET_TOKEN_DATA_SUCCESS,
  GET_TOKEN_DATA_FAIL,
} from '../../constants/actionTypes';

const initialState = {
  currentTokenData: null,
  error: '',
  isLoading: false,
};

export const currentTokenDataReducer = (state = initialState, action) => {
  // console.log('action payload from redux', action?.payload);
  switch (action.type) {
    case GET_TOKEN_DATA:
      return { ...state, isLoading: true };
    case GET_TOKEN_DATA_SUCCESS:
      return { ...state, currentTokenData: action.payload.currentTokenData, isLoading: false };

    case GET_TOKEN_DATA_FAIL:
      return {
        ...state,
        error: 'Error',
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
