/******************************************************************************************
Purpose : This component is used to get stake token value from Aave Protocol
Developed by : Prabhakaran.R
Version log:
------------------------------------------------------------------------------------------
Version      Date                Description                             Developed/Fixed 
------------------------------------------------------------------------------------------
1.0          8/Sep/2021          Initial Development                     Prabhakaran.R

*******************************************************************************************/
import React, { useEffect, useState } from 'react';
import ConvexCVXStakingABI from '../../abi/ConvexCVXContract.json';
import ConvexCvxCRVContractABI from '../../abi/ConvexCvxCRVContract.json';
import Addresses from '../../contractAddresses';
import Web3 from 'web3';
import axios from 'axios';

export default function ConvexStaking({ accountAddress }) {
  const [ConvexCVXAmount, setConvexCVXAmount] = useState(0);
  const [ConvexCVXUsdPrice, setConvexCVXUsdPrice] = useState();
  const [ConvexCVXStakeAmt, setConvexCVXStakeAmt] = useState();
  const [ConvexCVXImage, setConvexCVXImage] = useState();
  const [ConvexCvxCRVAmount, setConvexCvxCRVAmount] = useState();
  const [ConvexCvxCRVUsdPrice, setConvexCvxCRVUsdPrice] = useState();
  const [ConvexCvxCRVStakeAmt, setConvexCvxCRVStakeAmt] = useState();

  //this function is used to get web3 that is used to connect with ethereum network
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
  //this function is used to get the stake amount for CVX token by calling the respective contract
  //for the give userAddress
  async function checkConvexStake(accountAddress) {
    await loadWeb3();
    const web3 = window.web3;
    const ConvexCVXStakingContract = new web3.eth.Contract(
      ConvexCVXStakingABI,
      Addresses.convexStakingCRV
    );
    //call the CVX contract to get the balance of CVX token staking value
    var ConvexCVXBalaceAmount = await ConvexCVXStakingContract.methods
      .balanceOf(accountAddress)
      .call();
    //console.log('AaveStakingContract-', AaveStakingContract)

    return ConvexCVXBalaceAmount;
  }

  //this function is used to get the stake amount for cvxCRV token by calling the respective contract
  async function checkCvxCRVStake(accountAddress) {
    await loadWeb3();
    const web3 = window.web3;
    const ConvexCvxCRVContract = new web3.eth.Contract(
      ConvexCvxCRVContractABI,
      Addresses.convexStakingcvxCRV
    );
    //call the CVX contract to get the balance of CVX token staking value
    var ConvexCvxCRVBalaceAmount = await ConvexCvxCRVContract.methods
      .balanceOf(accountAddress)
      .call();
    //console.log('AaveStakingContract-', AaveStakingContract)

    return ConvexCvxCRVBalaceAmount;
  }

  //below function is used to get 'CVX' token staking value
  useEffect(() => {
    async function getBlockchainData() {
      //below logic is get the CVX token staking value
      const ConvexCVXBalaceAmount = await checkConvexStake(accountAddress);
      //if (parseInt(ConvexCVXBalaceAmount) != 0) {
      const ConvexCVXBalance = ConvexCVXBalaceAmount / 10 ** 18;
      setConvexCVXAmount(ConvexCVXBalance);

      console.log('Convex CVX ', ConvexCVXBalance);
      try {
        //get the current price of the token 'Convex Token (CVX)' - 0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b
        await axios
          .get(
            `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b`,
            {},
            {}
          )
          .then(async (priceData) => {
            let ConvexImageUrl = priceData.data.image.thumb;
            let ConvexCVXprice = priceData.data.market_data.current_price.usd;

            const ConvexCVXStakeValue = parseFloat(ConvexCVXBalance * ConvexCVXprice).toFixed(2);
            console.log('Convex CVX stake value', ConvexCVXStakeValue);
            // console.log('Convex image url', ConvexImageUrl)
            setConvexCVXUsdPrice(ConvexCVXprice);
            //setConvexCVXStakeAmt(parseFloat(ConvexCVXStakeValue).toLocaleString())
            setConvexCVXStakeAmt(ConvexCVXStakeValue);
            setConvexCVXImage(ConvexImageUrl);
          })
          .catch((error) => console.log('Error message', error));
      } catch (err) {
        console.log(err);
      }
      //} //end of if not null validation
    }

    getBlockchainData();
  }, [accountAddress]);

  //below function is used to get 'cvxCRV' token staking value
  useEffect(() => {
    async function getBlockchainData() {
      //below logic is get the CVX token staking value
      const ConvexCvxCRVBalaceAmount = await checkCvxCRVStake(accountAddress);
      //proceed with to derive value only if the balance is available
      //if (parseInt(ConvexCvxCRVBalaceAmount) != 0) {
      const ConvexCvxCRVBalance = ConvexCvxCRVBalaceAmount / 10 ** 18;
      setConvexCvxCRVAmount(ConvexCvxCRVBalance);

      console.log('Convex cvxCRV', ConvexCvxCRVBalance);
      try {
        //get the current price of the token 'Convex Token (CVX)' - 0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7
        await axios
          .get(
            `https://api.coingecko.com/api/v3/coins/ethereum/contract/0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7`,
            {},
            {}
          )
          .then(async (priceData) => {
            let ConvexCVXprice = priceData.data.market_data.current_price.usd;

            const ConvexCvxCRVStakeValue = parseFloat(ConvexCvxCRVBalance * ConvexCVXprice).toFixed(
              2
            );
            console.log('Convex cvxCRV stake value', ConvexCvxCRVStakeValue);
            // console.log('Convex image url', ConvexImageUrl)
            setConvexCvxCRVUsdPrice(ConvexCVXprice);
            // setConvexCvxCRVStakeAmt(
            //   parseFloat(ConvexCvxCRVStakeValue).toLocaleString(),
            // )
            setConvexCvxCRVStakeAmt(ConvexCvxCRVStakeValue);
          })
          .catch((error) => console.log('Error message', error));
      } catch (err) {
        console.log(err);
      }
      //} //end of if validation
    }

    getBlockchainData();
  }, [accountAddress]);

  return (
    <div>
      {parseInt(ConvexCVXStakeAmt + ConvexCvxCRVStakeAmt) ? (
        <div>
          <div
            style={{
              fontSize: '12px',
              marginLeft: '15px',
            }}>
            Convex Staking ---{' '}
            {(parseFloat(ConvexCVXStakeAmt) + parseFloat(ConvexCvxCRVStakeAmt)).toLocaleString()}
            USD
          </div>
          <div>
            <img
              src={ConvexCVXImage}
              style={{
                height: '30px',
                marginTop: '',
                display: 'inline-block',
                marginLeft: '15px',
              }}
              alt=""
            />
            <div
              style={{
                fontSize: '12px',
                display: 'inline-block',
                marginLeft: '15px',
              }}>
              Convex &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {(parseFloat(ConvexCVXStakeAmt) + parseFloat(ConvexCvxCRVStakeAmt)).toLocaleString()}
              USD
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
