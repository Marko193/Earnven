import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import { useWeb3React } from '@web3-react/core';
import loadWeb3 from '../../utils/loadWeb3';
import BatchCall from 'web3-batch-call';
import mStableContractABI from '../../abi/mStableContract.json';
import mStableUnderlyingContractABI from '../../abi/mStableUnderlyingTokenContract.json';
import axios from 'axios';

export default function MStableStaking({ accountAddress }) {
  const dispatch = useDispatch();

  //get useWeb3React hook
  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //logic implementing for web3 provider connection using web3 React hook
  async function getWeb3() {
    let web3;
    try {
      const provider = active ? await connector.getProvider() : await loadWeb3();
      web3 = new Web3(provider);
    } catch (err) {
      console.log('Web3 is not connected, check the Metamask connectivity!!');
    }
    return web3;
  }

  useEffect(() => {
    const getMStableStakeData = async () => {
      const web3 = await getWeb3();
      if (web3 != undefined) {
        const mStableAttributes = { accountAddress: accountAddress, web3: web3 };
        try {
          dispatch({
            type: actionTypes.SET_MSTABLE_STAKE_DATA,
            payload: mStableAttributes,
          });
        } catch (err) {
          console.log('Dispatch error in mStable staking process', err.message);
        }
      }
    };
    getMStableStakeData();
  }, [accountAddress]);

  return <></>;
}
