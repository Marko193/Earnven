import { all, call } from 'redux-saga/effects';
import { getAccountBalanceSagaWatcher } from './accountBalance';
import { getTwitterPostsSagaWatcher } from './twitterPosts';
import { getETH2StakeSagaWatcher } from './eth2Stake';
import { getSushiStakeSagaWatcher } from './sushiStaking';

export default function* watchRootSaga() {
  yield all([
    call(getAccountBalanceSagaWatcher),
    call(getTwitterPostsSagaWatcher),
    call(getETH2StakeSagaWatcher),
    call(getSushiStakeSagaWatcher),
  ]);
}
