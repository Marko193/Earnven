import React, { useState, useEffect } from 'react';
import pickleGaugeAddressList from '../../../contractAddress/PickleTokenAddresses';
import abi from '../../../abi/PickleAbi.json';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../../constants/actionTypes';
import loadWeb3 from '../../../utils/loadWeb3';

const PickleStake = ({ accountAddress }) => {
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
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      let dataSend = [];
      dataSend.push(accountAddress);
      active ? dataSend.push(connector.getProvider()) : dataSend.push(ethers.getDefaultProvider());
      // dataSend.push(connector.getProvider());
      dispatch({
        type: actionTypes.GET_PICKLE_STAKE,
        payload: dataSend,
      });
    } catch (error) {
      console.log('dispatch error in pickle stake', error);
    }
  }, [accountAddress]);

  const pickleStakeArray = useSelector((state) => state.pickeStake?.pickeStake);

  useEffect(() => {
    let total = 0;
    if (pickleStakeArray?.length > 0) {
      pickleStakeArray.map((object) => {
        total += parseFloat(object.value);
      });
    }
  }, [pickleStakeArray]);

  // useEffect(() => {
  //   console.log('saga test', pickleStakeArray);
  //   let total = 0;
  //   let pool = [];
  //   if (pickleStakeArray.length > 0) {
  //     pickleStakeArray.map((object) => {
  //       let obj = {};
  //       total += parseFloat(object.value);
  //       let balance = web3Conection_balance(object.contractAddress);
  //       obj.value = object.price * balance;
  //       obj.balance = object.balance;
  //       let earned = web3Conection_earned(object.contractAddress);
  //       if (balance) {
  //         obj.claimable = object.price * earned;
  //         obj.price = object.price;
  //         obj.protocol = 'Pickle Finance';
  //         obj.chain = 'Ethereum';
  //         pool.push(obj);
  //       }
  //     });
  //     console.log('pool in web3', pool);
  //   }
  // }, [pickleStakeArray]);
  async function web3Conection_balance(address) {
    const web3 = await getWeb3();
    if (web3 != undefined) {
      const contract = new web3.eth.Contract(abi, address);
      const balance = (await contract.methods.balanceOf(accountAddress).call()) / 10 ** 18;
      return balance;
    }
  }

  async function web3Conection_earned(address) {
    const web3 = await getWeb3();
    if (web3 != undefined) {
      const contract = new web3.eth.Contract(abi, address);
      const earned = (await contract.methods.earned(accountAddress).call()) / 10 ** 18;
      return earned;
    }
  }
  return (
    <div>
      <p></p>
    </div>
  );
};

export default PickleStake;
