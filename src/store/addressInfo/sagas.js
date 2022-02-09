import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import * as API from '../../api/api';
import actionTypes from '../../constants/actionTypes';
import * as actions from './actions';
import ethImage from '../../assets/icons/eth.png';
import { getZeroAPITokensList } from '../../api/api';

// SET_ADDRESS_INFO_DATA: 'SET_ADDRESS_INFO_DATA',
//   GET_ADDRESS_INFO_DATA: 'GET_ADDRESS_INFO_DATA',

export function* getAddressInfoDataSagaWatcher() {
  yield takeEvery(actionTypes.SET_ADDRESS_INFO_DATA, getAddressInfoDataSagaWorker);
  // SET_ADDRESS_INFO_DATA
}

function* getAddressInfoDataSagaWorker(accountAddress) {
  const addressInfoData = yield call(API.getAddressInfo, accountAddress.payload);
  console.log('only addressInfoData', addressInfoData.data);

  const zeroAPISwapTokensList = yield call(API.getZeroAPITokensList);
  console.log('sagas zeroAPITokensList', zeroAPISwapTokensList);

  const walletTokensList = [];
  if (addressInfoData.data.ETH.balance !== 0) {
    const tempObj = {};
    tempObj.address = '';
    tempObj.name = 'Ethereum';
    tempObj.symbol = 'ETH';
    tempObj.balance = addressInfoData.data.ETH.balance.toFixed(3).toString();
    tempObj.logoURI = ethImage;
    walletTokensList.push(tempObj);
  }
  let tokens = addressInfoData.data.tokens;
  // console.log('raw tokens arr of objects', tokens);
  for (let i = 0; i < tokens.length; i++) {
    const tempObj = {};
    tempObj.address = tokens[i].tokenInfo.address;
    tempObj.name = tokens[i].tokenInfo.name;
    tempObj.symbol = tokens[i].tokenInfo.symbol;
    tempObj.balance = (tokens[i].balance * Math.pow(10, -parseInt(tokens[i].tokenInfo.decimals)))
      .toFixed(3)
      .toString();
    if (tokens[i].tokenInfo.image !== undefined) {
      tempObj.logoURI = `https://ethplorer.io${tokens[i].tokenInfo.image}`;
    } else {
      tempObj.logoURI = null;
    }

    walletTokensList.push(tempObj);
  }

  // console.log('0x API tokens list', zeroAPISwapTokensList);
  // console.log('not filtered wallet`s tokens list arr from sagas', walletTokensList);

  const sendTokensList = walletTokensList.filter((walletToken) =>
    zeroAPISwapTokensList.find((zeroToken) => walletToken.symbol === zeroToken.symbol)
  );

  // console.log('sagas sendTokensList', sendTokensList);

  yield put(actions.getAddressInfoData(sendTokensList));
}
