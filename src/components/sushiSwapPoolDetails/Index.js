/*
Developed by - Prabhakaran.R
Date : 08-SEP-2021
purpose : this component is used to display pool details for the selected pool of tokens
*/

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Web3 from 'web3';
import PoolDetailsPage from './PoolDetailData';
import FACTORYABI from '../../abi/UniFactoryV2.json';
import Addresses from '../../contractAddresses';
import { PoolDetails } from '../liquidityPoolDetails/poolDetails';

export default function Index(props) {
  const navigate = useNavigate();
  const { address, token0, token1, token0Symbol, token1Symbol } = useParams();

  const [tokenid, setTokenPair] = useState();
  const [tokenA, setTokenA] = useState();
  const [tokenB, setTokenB] = useState();

  // added by Prabha on 15-09-2021
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  // const getPairToken = async (token0, token1) => {
  //   await loadWeb3()
  //   const web3 = window.web3
  //   var FactoryContract = new web3.eth.Contract(
  //     FACTORYABI,
  //     Addresses.uniFactory,
  //   )
  //   const tokenPair = await FactoryContract.methods
  //     .getPair(token0, token1)
  //     .call()
  //   console.log('Prabha 2nd Pair Address', tokenPair)
  //   return tokenPair
  // }

  useEffect(() => {
    async function getPairToken(token0, token1) {
      await loadWeb3();
      const { web3 } = window;
      const FactoryContract = new web3.eth.Contract(FACTORYABI, Addresses.sushiFactory);

      const tokenid = await FactoryContract.methods.getPair(token0, token1).call();

      console.log('Prabha sushiswap Pair from Index page', tokenid.toLowerCase());
      setTokenPair(tokenid.toLowerCase());
      setTokenA(token0);
      setTokenB(token1);
    }

    getPairToken(token0, token1);
    // return () => {}
  }, [tokenid]);

  return (
    <div style={{ margin: 'auto' }}>
      <PoolDetailsPage
        address={address}
        token0={token0}
        token1={token1}
        token0Symbol={token0Symbol}
        token1Symbol={token1Symbol}
        tokenid={tokenid}
      />
    </div>
  );
}
