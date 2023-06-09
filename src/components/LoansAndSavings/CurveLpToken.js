/**************************************************************************************************
Purpose : This component is used to get CurveLpToken value for a given user
Developed by : Prabhakaran.R
Version log:
---------------------------------------------------------------------------------------------------
Version      Date                Description                                    Developed/Fixed 
----------------------------------------------------------------------------------------------------
1.0         28/Oct/2021          Initial Development                             Prabhakaran.R
1.1         17/Nov/2021          Features add to bring additonal field           Prabhakaran.R  
1.2         12/Dec/2021          implement web3 and code simplify/performance    Prabhakaran.R  
**************************************************************************************************/
import React, { useEffect, useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import CuveLpTokenList from '../../contractAddress/CurveLpTokenAddressList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Web3 from 'web3';
import axios from 'axios';
import curveLogo from '../../assets/icons/curveLogo.png';
import CurveLpImage from './CurveLpImage';
import Curve3CrvPoolABI from '../../abi/CurveLpContracts/Curve3CrvPool.json';
import CurvePoolRegistryABI from '../../abi/CurveLpContracts/CurveRegistry.json';
import CurvePoolRegAddress from '../../contractAddresses';
import getCoingeckoData from '../../utils/getCoingeckoAPIData.js';
import { useWeb3React } from '@web3-react/core';
import Investment from '../common/investment/investment';
import { useDispatch, useSelector } from 'react-redux';
import actionTypes from '../../constants/actionTypes';
import loadWeb3 from '../../utils/loadWeb3';
// import {
//   setCurveLpTokenDataAction,
//   setCurveLpTokenTotalAction,
// } from '../../store/curveLpToken/actions';

export default function CurveLpToken({ accountAddress }) {
  const [CurveLpTokenData, setCurveLpTokenData] = useState([]);
  const [CurveLpTokenTotal, setCurveLpTokenTotal] = useState([]);
  const [CurveLpTokenContent, setCurveLpTokenContent] = useState([]);

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

  //set the component to dipsatch the action to saga
  useEffect(() => {
    const getCurveLpTokenData = async () => {
      const web3 = await getWeb3();
      if (web3 != undefined) {
        const curveLpTokenAttributes = { accountAddress: accountAddress, web3: web3 };
        try {
          dispatch({
            type: actionTypes.SET_CRVLP_TOKEN_DATA,
            payload: curveLpTokenAttributes,
          });
        } catch (err) {
          console.log('Dispatch action is failed in curve lp token process', err.message);
        }
      }
    };
    getCurveLpTokenData();
  }, [accountAddress]);

  // //to get virtual price of the pool
  // const fetchCurveLpTokenVirtualPrice = async (contractAddress) => {
  //   //get the web3 provider instance
  //   const web3 = await getWeb3();

  //   const CurvePoolRegistryContract = new web3.eth.Contract(
  //     CurvePoolRegistryABI,
  //     CurvePoolRegAddress.CuvePoolRegistry
  //   );
  //   let poolVirtualPrice = await CurvePoolRegistryContract.methods
  //     .get_virtual_price_from_lp_token(contractAddress.toLowerCase())
  //     .call();
  //   return poolVirtualPrice;
  // };

  // const getCurveLpData = async (accountAddress, contractAddress) => {
  //   //get the web3 provider instance
  //   const web3 = await getWeb3();

  //   const Curve3CrvPoolContract = new web3.eth.Contract(Curve3CrvPoolABI, contractAddress);
  //   let Curve3CrvBalance = await Curve3CrvPoolContract.methods.balanceOf(accountAddress).call();
  //   let Curve3CrvName = await Curve3CrvPoolContract.methods.name().call();
  //   let CurveLpTokenVirtualPrice = await fetchCurveLpTokenVirtualPrice(contractAddress);
  //   let curveLpTokenTotal = await Curve3CrvPoolContract.methods.totalSupply().call();
  //   let curveTokenSymbol = await Curve3CrvPoolContract.methods.symbol().call();

  //   return {
  //     curveLpTokenPrice: CurveLpTokenVirtualPrice, // pool virtual price
  //     curveLpTokenBalance: Curve3CrvBalance, //token balance of Lp for the given user
  //     curveLpTokenName: Curve3CrvName, // token name
  //     curveLpTokenSymbol: curveTokenSymbol, //token symbol
  //     curveLpTokenLiquidity: curveLpTokenTotal, //pool Liquidity
  //   };
  // };

  // //this function is used to get Curve lp token value for the give user address
  // useEffect(() => {
  //   let curveLpDataPoint = [];
  //   let cuveLpTokenName;
  //   let tokenPrice = 0;
  //   let staking = [];
  //   let curveLpTokenTotalValue = 0;

  //   async function fetchCurvePoolData() {
  //     try {
  //       const response = await fetch(
  //         `https://api.ethplorer.io/getAddressInfo/${accountAddress}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
  //       );

  //       const data = await response.json();

  //       for (let i = 0; i < data.tokens.length; i++) {
  //         const curveLpData = data.tokens[i];
  //         const tokenAddress = curveLpData.tokenInfo.address.toUpperCase();
  //         if (CuveLpTokenList.indexOf(tokenAddress) != -1) {
  //           let object = {};
  //           curveLpDataPoint = await getCurveLpData(accountAddress, tokenAddress);
  //           cuveLpTokenName = curveLpDataPoint.curveLpTokenName.replace('Curve.fi ', '');
  //           //get the token market usd price from coingecko API
  //           const tokenData = await getCoingeckoData(tokenAddress, cuveLpTokenName);
  //           if (tokenData) {
  //             //assign the receiving token price into local variable
  //             tokenPrice = await tokenData.data.market_data.current_price.usd;
  //           }
  //           //if tokenPrice is not get from coingecko then use the lptoken virtual price
  //           if (tokenPrice == 0) {
  //             tokenPrice = curveLpDataPoint.curveLpTokenPrice;
  //           }
  //           object.tokenName = cuveLpTokenName;
  //           object.balance = curveLpDataPoint.curveLpTokenBalance / 10 ** 18;
  //           object.value = (curveLpDataPoint.curveLpTokenBalance / 10 ** 18) * tokenPrice;
  //           object.price = tokenPrice;
  //           object.chain = 'Ethereum';
  //           object.liquidity = parseFloat(
  //             (curveLpDataPoint.curveLpTokenLiquidity / 10 ** 18) * tokenPrice
  //           ).toFixed(2);
  //           //object.liquidity = (curveLpDataPoint.curveLpTokenLiquidity / 10 ** 18) * tokenPrice;
  //           object.symbol = curveLpDataPoint.curveLpTokenSymbol;
  //           object.protocol = curveLpDataPoint.curveLpTokenSymbol;
  //           curveLpTokenTotalValue += object.value;
  //           staking.push(object);
  //         }
  //         //rest the value
  //         tokenPrice = 0;
  //       } //end of for loop
  //       setCurveLpTokenTotal(parseFloat(curveLpTokenTotalValue).toFixed(2));
  //       setCurveLpTokenData(staking);
  //       // dispatch(setCurveLpTokenDataAction(staking));
  //       // dispatch(setCurveLpTokenTotalAction(curveLpTokenTotalValue));
  //       //keep this console logs to check the data point validation
  //       console.log('Curve lp token from dataset', staking);
  //       staking = [];
  //     } catch (err) {
  //       console.log('No curve lp token holding for this user', accountAddress);
  //     }
  //   } //end of function

  //   fetchCurvePoolData();
  // }, [accountAddress]);

  // useEffect(() => {
  //   if (CurveLpTokenData.length > 0) {
  //     try {
  //       var content = CurveLpTokenData.map((object) => {
  //         console.log('CurveLpTokenData', object);
  //         return (
  //           <>
  //             {/*<Investment protocol={object} />*/}
  //             {/*<Accordion*/}
  //             {/*  style={{*/}
  //             {/*    background: 'transparent',*/}
  //             {/*    marginRight: '1px',*/}
  //             {/*    color: 'black',*/}
  //             {/*    width: '100%',*/}
  //             {/*    border: '1px',*/}
  //             {/*    borderColor: 'black',*/}
  //             {/*    borderStyle: 'hidden',*/}
  //             {/*  }}>*/}
  //             {/*  <AccordionSummary*/}
  //             {/*    expandIcon={<ExpandMoreIcon />}*/}
  //             {/*    aria-controls="panel1a-content"*/}
  //             {/*    id="panel1a-header">*/}
  //             {/*    <React.Fragment*/}
  //             {/*      style={{*/}
  //             {/*        display: 'inline-block',*/}
  //             {/*        width: '100%',*/}
  //             {/*        wordBreak: 'break-all',*/}
  //             {/*      }}>*/}
  //             {/*      /!*Get the Curve lp token Name *!/*/}
  //             {/*      <CurveLpImage lpToken={object.tokenName} /> {object.tokenName}*/}
  //             {/*      &nbsp; &nbsp;{parseFloat(object.totalValue.toFixed(2)).toLocaleString()} USD*/}
  //             {/*    </React.Fragment>*/}
  //             {/*  </AccordionSummary>*/}
  //             {/*  <AccordionDetails>*/}
  //             {/*    <div style={{ display: 'inline-block', width: '70%', fontSize: '13px' }}>*/}
  //             {/*      Value &nbsp;&nbsp;&nbsp;&nbsp;$*/}
  //             {/*      {parseFloat(object.totalValue.toFixed(2)).toLocaleString()}*/}
  //             {/*      <br />*/}
  //             {/*      Price &nbsp;&nbsp;&nbsp;&nbsp;${parseFloat(object.price.toFixed(4))}*/}
  //             {/*      <br />*/}
  //             {/*      Balance &nbsp; {parseFloat(object.balance.toFixed(2)).toLocaleString()}*/}
  //             {/*      <br />*/}
  //             {/*      Liquidity &nbsp; $*/}
  //             {/*      {parseFloat(object.curveLpTokenLiquidity.toFixed(2)).toLocaleString()}*/}
  //             {/*      <br />*/}
  //             {/*      Chain &nbsp;&nbsp;Ethereum*/}
  //             {/*      <br />*/}
  //             {/*      Protocol &nbsp; {object.protocol}*/}
  //             {/*    </div>*/}
  //             {/*  </AccordionDetails>*/}
  //             {/*</Accordion>*/}
  //           </>
  //         );
  //       });
  //     } catch (err) {
  //       console.log('No Curve LP token data found');
  //     }
  //   }

  //   setCurveLpTokenContent(content);
  // }, [CurveLpTokenData, accountAddress]);

  return (
    <React.Fragment>
      {/*<div*/}
      {/*  style={{*/}
      {/*    fontSize: '13px',*/}
      {/*    marginRight: '15px',*/}

      {/*    display: CurveLpTokenData.length > 0 ? '' : 'none',*/}
      {/*  }}>*/}
      {/*  <img*/}
      {/*    src={curveLogo}*/}
      {/*    style={{*/}
      {/*      height: '30px',*/}
      {/*      marginTop: '',*/}
      {/*      marginLeft: '15px',*/}
      {/*    }}*/}
      {/*    alt=""*/}
      {/*  />*/}
      {/*  &nbsp;&nbsp;Curve Lp token --- {parseFloat(CurveLpTokenTotal).toLocaleString()} USD*/}
      {/*  {CurveLpTokenContent}*/}
      {/*</div>*/}
      {/*<br />*/}
    </React.Fragment>
  );
}
