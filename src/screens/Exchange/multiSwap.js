import React, { useEffect, useRef, useState } from 'react';
import {
  AbsentFoundTokensBlock,
  AdditionalOptionsSwapTokensSubBlock,
  AddReceiveTokenMultiSwapBtn,
  ChosenMultiSwapSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExceededAmountTokensLimitWarning,
  ExchangerBestRateSpan,
  ExchangerElementListItem,
  ExchangerElementSpan,
  ExchangerIcon,
  ExchangerMainList,
  ExchangersLayout,
  ExchangersLayoutTitlesBlock,
  ExchangersMainListLayout,
  ExchangersMainSubLayout,
  FirstSubLayoutMultiSwapReceiveTokensBlock,
  GreenDotIcon,
  LabelsBlockImportantSpan,
  LabelsBlockSubBlock,
  LabelsBlockSubBlockSpan,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapLayout,
  MultiSwapReceiveTokensBlock,
  MultiSwapSendTokensChooseBlock,
  MultiSwapSendTokensChooseBlockLayout,
  MultiSwapSendValueLabel,
  MultiSwapSendValueLabelsLayout,
  NewMultiSwapButton,
  OfferedByLayoutLabelBlock,
  ReceiveTokenModalListItem,
  SaveSelectedExchangerButton,
  SearchTokensModalTextField,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SecondSubLayoutMultiSwapReceiveTokensBlock,
  SendBlockLabels,
  SendReceiveSubBlock,
  SendTokenBalance,
  SendTokenConvertedMeasures,
  SendTokenImg,
  SendTokenLabelsBlock,
  SendTokenModalListItem,
  SendTokenName,
  SendTokensModalList,
  SubLayoutReceiveTokensBlock,
  SwapBlockDelimiter,
  SwapBlockExchangeLayout,
  SwapTokensMainSubBlock,
  SwapTokensOfferedBySubBlock,
  SwitchTokensBtn,
  TokensModalSubLayout,
  USDCurrencyInputBlock,
  USDCurrencySendInputBlock,
} from './styled';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';

import plusIconDark from '../../assets/icons/plusIconDark.svg';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import { Button, useMediaQuery } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import actionTypes from '../../constants/actionTypes';
import Popover from '@mui/material/Popover';
import greenDot from '../../assets/icons/greenDot.svg';
import paraSwapIcon from '../../assets/icons/exchangers/paraSwapExchangerIcon.svg';

// import exchangersOfferedList from './exchangersOfferedListPolygon.js';
// import sendTokensMockList from './sendTokensMockList.json';
import SelectTokensModalContainer from './selectTokensModal';
import OutsideClickHandler from './outsideClickHandler';
import { CloseButton, Header, ModalTitle } from './selectTokensModal/styles';
import closeModalIcon from '../../assets/icons/close_nft.svg';
import closeModalIconDark from '../../assets/icons/closenftdark.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import Avatar from 'react-avatar';
import {
  checkIfExchangedMultiSwapTokenLimitIsExceeded,
  filteredTokensByName,
  getTokenUSDAmount,
  initFilteringModalTokensListMultiSwap,
  isTokensCanBeToggledMultiSwap,
} from './helpers';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import multiCallAbi from '../../abi/MultiCall.json';
import TOKENDECIMALSABI from '../../abi/TokenDecomals.json';
import ROUTERABI from '../../abi/UniRouterV2.json';
import { send } from 'eth-permit/dist/rpc';
import uniswapV2ExchangerIcon from '../../assets/icons/exchangers/uniswapV2ExchangerIcon.svg';
import sushiSwapExchangerIcon from '../../assets/icons/exchangers/sushiSwapExchangerIcon.svg';
import swerveExchangerIcon from '../../assets/icons/exchangers/swerveExchangerIcon.png';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function MultiSwapComponent() {
  const mobilePopover = useMediaQuery('(max-width: 600px)');
  const matches = useMediaQuery('(max-width: 550px)');
  const dispatch = useDispatch();
  const classes = useStyles();
  let [tokensListModal, setTokensListModal] = useState([]);
  let [oldTokenSwappedAddress, setOldTokenSwappedAddress] = useState();
  let [isSendTokenSelectedSwapped, setIsSendTokenSelectedSwapped] = useState(false);
  const [openTokensModal, setOpenTokensModal] = useState(false);
  const [isTokensLimitNotExceeded, setIsTokensLimitNotExceeded] = useState(false);
  let [isAddedReceiveTokensLimitExceeded, setIsAddedReceiveTokensLimitExceeded] = useState(false);
  const [isAbleToReplaceTokens, setIsAbleToReplaceTokens] = useState(false);
  const exchangersOfferedList = [
    {
      name: 'Uniswap_V2',
      routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
      gasFee: '$10.03',
      logoIcon: uniswapV2ExchangerIcon,
      isBestRate: true,
    },
    {
      name: 'SushiSwap',
      routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
      gasFee: '$10.03',
      logoIcon: sushiSwapExchangerIcon,
      isBestRate: false,
    },
    // {
    //   name: 'Swerve',
    //   routerAddress: 'THIS_IS_FAKE_ROUTER_ADDRESS',
    //   receiveTokenUSDCurrencyCourse: '3510 DAI ($3510.03)',
    //   gasFee: '$10.03',
    //   logoIcon: swerveExchangerIcon,
    //   isBestRate: false,
    // },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenNewExchangerToken, setChosenNewExchangerToken] = useState({});

  let textInput = useRef(null);

  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  const isLoadingSendTokensList = useSelector(
    (state) => state.tokensListReducer.isSendMultiSwapTokensListLoading
  );
  const isLoadingReceiveTokensList = useSelector(
    (state) => state.tokensListReducer.isReceiveMultiSwapTokensListLoading
  );

  const initSendMultiSwapTokenList = useSelector(
    (state) => state.tokensListReducer.initSendTokenMultiSwap
  );
  const initReceiveMultiSwapTokensList = useSelector(
    (state) => state.tokensListReducer.initReceiveMultiSwapTokensList
  );

  console.log(' init state SendTokenSwap 12345', initSendMultiSwapTokenList);
  console.log('init state ReceiveMultiSwapTokensList 12345', initReceiveMultiSwapTokensList);

  //popover open/close

  let [chosenExchangerTokensList, setChosenExchangerTokensList] = useState([]);

  const openExchangersModal = (event, tokensList, chosenToken) => {
    setChosenExchangerTokensList(tokensList);
    setChosenNewExchangerToken(chosenToken);
    setAnchorEl(event.currentTarget);
  };

  const closeExchangersModal = () => {
    setAnchorEl(null);
    setChosenExchangerTokensList([]);
    setChosenNewExchangerToken({});
  };
  const open = Boolean(anchorEl);
  //-------------

  const { account, activate, active, chainId, connector, deactivate, error, provider, setError } =
    useWeb3React();

  //working saga
  const finalSendTokensList = useSelector((state) => state.tokensListReducer.sendTokensList);
  console.log('multiswap finalSendTokensList 12345', finalSendTokensList);

  // const finalReceiveTokensList = sendTokensMockList;
  let finalReceiveTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);

  async function getWeb3() {
    return new Web3(window.ethereum);
  }

  let convertSendTokenToUSDCurrency = async (amount, tokenData) => {
    let formattedAmount = amount.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');

    console.log('send token convert tokenData.isLimitNotExceeded ', tokenData.isLimitNotExceeded);

    console.log('res amount tokenData send amount', amount);
    // console.log('res amount send formattedAmount', formattedAmount);
    // console.log('res amount send formattedAmount typeof', typeof formattedAmount);

    await getTokenUSDAmount({ amount: formattedAmount, tokenData }).then((res) => {
      // console.log('res amount send middle', res);
      let sendTokensListCopy = [...initSendMultiSwapTokenList];

      //check if in every element we have .isExchangeIsAllowed = true
      //then - set to true
      let isLimitNotExceeded = sendTokensListCopy.every(
        (item) => item.isExchangeIsAllowed === true
      );

      const needIndex = sendTokensListCopy.findIndex(
        (token) => token.address === tokenData.address
      );
      if (needIndex !== -1) {
        sendTokensListCopy[needIndex].USDCurrency = res.USDCurrency;
        sendTokensListCopy[needIndex].amount = formattedAmount;
        sendTokensListCopy[needIndex].isExchangeIsAllowed = tokenData.isLimitNotExceeded;
      }

      // console.log('res amount send list total', sendTokensListCopy);
      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
        payload: sendTokensListCopy,
      });

      setIsTokensLimitNotExceeded(isLimitNotExceeded);
    });
  };

  let convertReceiveTokenToUSDCurrency = async (amount, tokenData) => {
    let formattedAmount = amount.replace(/[^\d.-]/g, '').replace(/[^\w.]|_/g, '');

    console.log('res amount tokenData receive', tokenData);
    console.log('res amount formattedAmount', formattedAmount);
    console.log('res amount formattedAmount typeof', typeof formattedAmount);

    await getTokenUSDAmount({ amount: formattedAmount, tokenData }).then((res) => {
      console.log('res amount middle', res);

      // console.log('res amount formatted', formattedAmount);

      let receiveTokensListCopy = [...initReceiveMultiSwapTokensList];
      const needIndex = receiveTokensListCopy.findIndex(
        (token) => token.address === tokenData.address
      );
      if (needIndex !== -1) {
        receiveTokensListCopy[needIndex].USDCurrency = res.USDCurrency;
        receiveTokensListCopy[needIndex].amount = formattedAmount;
      }

      console.log('res amount total', receiveTokensListCopy[needIndex]);
      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
        payload: receiveTokensListCopy,
      });
    });
    // await getAmountMulti();
  };

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

  const convertExchangeTokensCourse = async (convertTokensData) => {
    console.log('convertTokensData multiswap', convertTokensData);

    let needIndex = initReceiveMultiSwapTokensList.findIndex(
      (token) => token.address === convertTokensData.receiveTokenForExchangeAddress
    );

    if (needIndex !== -1) {
      initReceiveMultiSwapTokensList[needIndex] = {
        ...initReceiveMultiSwapTokensList[needIndex],
        singleAmountSendTokenConvert: 0,
      };
    }

    await loadWeb3();
    const web3 = window.web3;

    const tokenDecimal1 = await new web3.eth.Contract(
      TOKENDECIMALSABI,
      convertTokensData.sendTokenForExchangeAddress
    ).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });
    const tokenDecimal2 = await new web3.eth.Contract(
      TOKENDECIMALSABI,
      convertTokensData.receiveTokenForExchangeAddress
    ).methods
      .decimals()
      .call()
      .then((res) => {
        return res;
      });

    const NewContract = new web3.eth.Contract(
      ROUTERABI,
      //Sushiswap contract address - should be changed dynamically
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
    );

    if (convertTokensData.tokenAmount !== 0 && !isNaN(convertTokensData.tokenAmount)) {
      // console.log('is not null!');

      const convertedValue = await NewContract.methods
        .getAmountsOut((convertTokensData.tokenAmount * 10 ** tokenDecimal1).toString(), [
          convertTokensData.sendTokenForExchangeAddress,
          convertTokensData.receiveTokenForExchangeAddress,
        ])
        .call();

      if (needIndex !== -1) {
        initReceiveMultiSwapTokensList[needIndex] = {
          ...initReceiveMultiSwapTokensList[needIndex],
          singleAmountSendTokenConvert: (+convertedValue[1] / 10 ** tokenDecimal2)
            .toString()
            .substring(0, 7),
        };
      }
    } else {
      console.log('convertTokensData null amount orNAN error!');

      if (needIndex !== -1) {
        initReceiveMultiSwapTokensList[needIndex] = {
          ...initReceiveMultiSwapTokensList[needIndex],
          singleAmountSendTokenConvert: 0,
        };
      }
    }
  };

  //----- convert token course (need to implement necessary network)

  let exchange = async () => {
    console.log('exchange data initSendMultiSwapTokenList', initSendMultiSwapTokenList);
    console.log('exchange data initReceiveMultiSwapTokensList', initReceiveMultiSwapTokensList);
  };

  const openModalHelper = (payload) => {
    setTokensListModal([]);
    setOpenTokensModal(true);
    let removedInitTokensList = initFilteringModalTokensListMultiSwap(payload.tokensList, [
      ...initSendMultiSwapTokenList,
      ...initReceiveMultiSwapTokensList,
    ]);
    setTokensListModal(removedInitTokensList);
    setIsSendTokenSelectedSwapped(payload.isSendModalOpen);
  };

  const searchTokensHandler = (event, isSendTokenSelectedSwapped, searchTokensData) => {
    let removedInitTokenValuesList = initFilteringModalTokensListMultiSwap(searchTokensData, [
      ...initSendMultiSwapTokenList,
      ...initReceiveMultiSwapTokensList,
    ]);
    let filteredTokensList = filteredTokensByName(event, removedInitTokenValuesList);
    setTokensListModal(filteredTokensList);
  };

  const selectTokenForSwap = async (selectedSwapToken, isSendTokenSelectedSwapped) => {
    //choose best exchanger
    let bestRateExchanger = exchangersOfferedList.find((el) => {
      return el.isBestRate === true;
    });

    if (isSendTokenSelectedSwapped === true) {
      console.log('send selectedSwapToken', selectedSwapToken);

      let sendTokensListCopy = [...initSendMultiSwapTokenList];

      const needIndex = sendTokensListCopy.findIndex(
        (token) => token.address === oldTokenSwappedAddress
      );

      // console.log('send selectedSwapToken needIndex', needIndex);

      if (needIndex !== -1) {
        sendTokensListCopy[needIndex] = {
          ...selectedSwapToken,
          receiveTokensListItem: false,
          USDCurrency: 0,
          amount: 0,
          chosenExchanger: bestRateExchanger,
        };
      }

      let isLimitNotExceeded = sendTokensListCopy.every(
        (item) => item.isExchangeIsAllowed === true
      );

      setIsTokensLimitNotExceeded(isLimitNotExceeded);

      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
        payload: sendTokensListCopy,
      });
    } else if (selectedSwapToken.receiveTokensListItem === true) {
      dispatch({ type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING, payload: true });

      let receiveTokensListCopy = [...initReceiveMultiSwapTokensList];

      // found necessary index of element, which currency is updated
      const needIndex = receiveTokensListCopy.findIndex(
        (token) => token.address === oldTokenSwappedAddress
      );

      if (needIndex !== -1) {
        receiveTokensListCopy[needIndex] = {
          ...selectedSwapToken,
          receiveTokensListItem: true,
          USDCurrency: 0,
          amount: 0,
          chosenExchanger: bestRateExchanger,
        };
      }

      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
        payload: receiveTokensListCopy,
      });

      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
        payload: false,
      });
    }
  };

  console.log('finalSendTokensList multiswap init saga list', finalSendTokensList);
  console.log('finalReceiveTokensList multiswap init saga list', finalReceiveTokensList);
  console.log(
    'finalReceiveTokensList initReceiveMultiSwapTokensList multiswap',
    initReceiveMultiSwapTokensList
  );

  const addNewTokenHandler = (fullTokensList) => {
    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
      payload: true,
    });

    let removedInitTokenValuesList = initFilteringModalTokensListMultiSwap(fullTokensList, [
      ...initSendMultiSwapTokenList,
      ...initReceiveMultiSwapTokensList,
    ]);

    //choose best exchanger
    let bestRateExchanger = exchangersOfferedList.find((el) => {
      return el.isBestRate === true;
    });

    if (!isTokensToggled) {
      if (removedInitTokenValuesList.length !== 0) {
        initReceiveMultiSwapTokensList.push(removedInitTokenValuesList[0]);
      } else {
        setIsAddedReceiveTokensLimitExceeded(true);
      }
    } else {
      if (removedInitTokenValuesList.length !== 0) {
        //if we can exchange
        let isLimitNotExceeded = initSendMultiSwapTokenList.every(
          (item) => item.isExchangeIsAllowed === true
        );

        setIsTokensLimitNotExceeded(isLimitNotExceeded);
        //if we can exchange---

        initSendMultiSwapTokenList.push({
          ...removedInitTokenValuesList[0],
          chosenExchanger: bestRateExchanger,
          isExchangeIsAllowed: isLimitNotExceeded,
        });
      } else {
        setIsAddedReceiveTokensLimitExceeded(true);
      }
    }

    let isAbleToBeToggled = isTokensCanBeToggledMultiSwap(
      initSendMultiSwapTokenList,
      initReceiveMultiSwapTokensList,
      finalSendTokensList,
      finalReceiveTokensList
    );

    console.log('addToken isAbleToBeToggled', isAbleToBeToggled);

    setIsAbleToReplaceTokens(isAbleToBeToggled);

    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING,
      payload: false,
    });
  };

  console.log('isSendTokenSelectedSwapped', isSendTokenSelectedSwapped);

  let [isTokensToggled, setIsTokensToggled] = useState(false);

  const toggleSwappedTokens = () => {
    let sendTokensListCopy = initSendMultiSwapTokenList.map((obj) => {
      return { ...obj, amount: 0, USDCurrency: 0 };
      // return obj;
    });
    let receiveTokensListCopy = initReceiveMultiSwapTokensList.map((obj) => {
      if (Number(obj.amount) > 0) {
        return { ...obj, amount: 0, USDCurrency: 0 };
      }
      return obj;
    });

    console.log('sendTokensListCopy toggle', sendTokensListCopy);
    console.log('result toggle test receiveTokensListCopy toggle', receiveTokensListCopy);

    let totalReceiveTokensArr = [];
    finalSendTokensList
      .filter((sendToken) =>
        receiveTokensListCopy.some((receiveToken) => {
          return sendToken.address === receiveToken.address;
        })
      )
      .map((el1) =>
        receiveTokensListCopy.map((el2) => {
          if (el1.address === el2.address) {
            // console.log('total toggle test', { ...el2, balance: el1.balance });
            totalReceiveTokensArr.push({ ...el2, balance: el1.balance });
          }
        })
      );

    console.log('result toggle total', totalReceiveTokensArr);

    setIsTokensToggled(!isTokensToggled);

    dispatch({
      type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
      payload: totalReceiveTokensArr,
    });
    dispatch({
      type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
      payload: sendTokensListCopy,
    });
  };

  useEffect(() => {
    if (initSendMultiSwapTokenList[0] !== undefined && initSendMultiSwapTokenList.length !== 0) {
      let isAbleToBeToggled = isTokensCanBeToggledMultiSwap(
        initSendMultiSwapTokenList,
        initReceiveMultiSwapTokensList,
        finalSendTokensList,
        finalReceiveTokensList
      );

      setIsAbleToReplaceTokens(isAbleToBeToggled);

      let isLimitNotExceeded = initSendMultiSwapTokenList.every(
        (item) => item.isExchangeIsAllowed === true
      );

      setIsTokensLimitNotExceeded(isLimitNotExceeded);
    }
  }, [initSendMultiSwapTokenList, initReceiveMultiSwapTokensList]);

  const selectNewExchanger = (
    selectedNewExchanger,
    chosenExchangerTokensList,
    chosenNewExchangerToken
  ) => {
    // console.log('tokenWithChosenExchanger multiswap selectedNewExchanger', selectedNewExchanger);
    const tokenWithChosenExchanger = {
      ...chosenNewExchangerToken,
      chosenExchanger: { ...selectedNewExchanger, isExchangerSelected: true },
    };
    // console.log('tokenWithChosenExchanger multiswap', tokenWithChosenExchanger);

    let formattedReceiveTokensList = chosenExchangerTokensList.map((token) => {
      if (token.address === tokenWithChosenExchanger.address) {
        return {
          ...token,
          chosenExchanger: { ...selectedNewExchanger, isExchangerSelected: true },
        };
      }
      return {
        ...token,
        chosenExchanger: { ...token.chosenExchanger, isExchangerSelected: false },
      };
    });

    console.log('tokenWithChosenExchanger multiswap test1', formattedReceiveTokensList);

    if (!isTokensToggled) {
      dispatch({
        type: actionTypes.SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST,
        payload: formattedReceiveTokensList,
      });
    } else {
      dispatch({
        type: actionTypes.SET_INIT_SEND_MULTISWAP_TOKENS_LIST,
        payload: formattedReceiveTokensList,
      });
    }

    setChosenExchangerTokensList([]);
    setChosenNewExchangerToken({});
    setAnchorEl(false);
  };

  console.log('chosenNewExchangerToken openExchangersModal', chosenNewExchangerToken);

  const ConsoleLog = ({ children }) => {
    console.log('console.log debugger', children);
    return false;
  };

  return (
    <SecondColumnSwapSubBlock>
      <SecondColumnTitleBlock>
        <SecondColumnTitleHeaderBlock>
          <ColumnMainTitles isLightTheme={isLightTheme}>Multiswap</ColumnMainTitles>
          <NewMultiSwapButton>New!</NewMultiSwapButton>
        </SecondColumnTitleHeaderBlock>
        <ColumnMainSubTitles style={{ marginTop: '15px' }} isLightTheme={isLightTheme}>
          Trade any token for many tokens or many tokens for a token in a single transaction
        </ColumnMainSubTitles>
      </SecondColumnTitleBlock>
      {isLoadingSendTokensList === false && isLoadingReceiveTokensList === false ? (
        <MultiSwapLayout>
          <SwapTokensMainSubBlock
            isLightTheme={isLightTheme}
            isMultiSwap={true}
            style={{ marginTop: '0', height: 'auto' }}>
            {/*{isTokensToggled}*/}

            {/*Choose send tokens block*/}
            <SendReceiveSubBlock
            // style={{ backgroundColor: 'red' }}
            >
              <SendBlockLabels isLightTheme={isLightTheme} style={{ margin: '32px 20px 7px 20px' }}>
                <span>Send</span>
              </SendBlockLabels>

              {/* SEND block */}

              <MultiSwapSendTokensChooseBlockLayout>
                {initSendMultiSwapTokenList.map((sendToken, key) => (
                  <>
                    <MultiSwapSendTokensChooseBlock
                      isLightTheme={isLightTheme}
                      style={{
                        // backgroundColor: 'lightyellow',
                        height: isTokensToggled && '115px',
                        marginBottom: isTokensToggled && '20px',
                        marginTop: isTokensToggled && '10px',
                        width: matches && '92%',
                      }}>
                      <MultiSwapChooseBtnTokenBlock
                      // style={{ backgroundColor: 'pink' }}
                      >
                        <div
                          onClick={() => {
                            setOldTokenSwappedAddress(sendToken.address);
                            openModalHelper({
                              tokensList: finalSendTokensList,
                              isSendModalOpen: true,
                            });
                          }}>
                          {sendToken.logoURI !== null ? (
                            <SendTokenImg
                              alt="token_img"
                              src={sendToken.logoURI}
                              style={{ marginLeft: '0px' }}
                            />
                          ) : (
                            <Avatar
                              name={sendToken.symbol}
                              round={true}
                              size="21"
                              textSizeRatio={1}
                              style={{ marginRight: '10px', width: '21px', height: '21px' }}
                            />
                          )}
                          <ChosenTokenLabel isLightTheme={isLightTheme}>
                            {sendToken.symbol === 'ethereum' ? 'ETH' : sendToken.symbol}
                          </ChosenTokenLabel>
                          <img
                            src={isLightTheme ? chevronDownBlack : chevronDownLight}
                            alt="chevron_icon"
                          />
                        </div>
                        <USDCurrencySendInputBlock>
                          <ChosenMultiSwapSendReceiveTokenValueInput
                            // disabled={true}
                            style={{ marginRight: '0px' }}
                            InputProps={{
                              inputProps: {
                                style: {
                                  marginTop: '4px',
                                  textAlign: 'right',
                                  padding: 0,
                                  width: '200px',
                                  fontWeight: 600,
                                  color:
                                    sendToken.isExchangeIsAllowed === false
                                      ? 'red'
                                      : isLightTheme
                                      ? 'black'
                                      : 'white',
                                },
                              },
                              classes: { notchedOutline: classes.noBorder },
                            }}
                            isLightTheme={isLightTheme}
                            placeholder="0.0"
                            value={sendToken.amount}
                            onChange={(e) => {
                              const isLimitNotExceeded =
                                checkIfExchangedMultiSwapTokenLimitIsExceeded(
                                  { address: sendToken.address, amount: e.target.value },
                                  initSendMultiSwapTokenList
                                );

                              console.log(
                                'checkIfExchangedMultiSwapTokenLimitIsExceeded main',
                                isLimitNotExceeded
                              );

                              convertSendTokenToUSDCurrency(e.target.value, {
                                ...sendToken,
                                isLimitNotExceeded,
                              });
                            }}
                          />
                        </USDCurrencySendInputBlock>
                      </MultiSwapChooseBtnTokenBlock>
                      <MultiSwapSendValueLabelsLayout
                      // style={{ backgroundColor: 'lightblue' }}
                      >
                        <MultiSwapSendValueLabel
                          isLightTheme={isLightTheme}
                          style={{ marginLeft: '30px' }}>
                          {sendToken.balance} {sendToken.symbol}
                        </MultiSwapSendValueLabel>

                        <MultiSwapSendValueLabel
                          isLightTheme={isLightTheme}
                          style={{ marginLeft: 'auto', marginBottom: isTokensToggled && '5px' }}>
                          {sendToken.USDCurrency < 0 ? (
                            <>Price not available</>
                          ) : (
                            <>${sendToken.USDCurrency}</>
                          )}
                        </MultiSwapSendValueLabel>
                      </MultiSwapSendValueLabelsLayout>

                      {/* exchange course rate*/}
                      {isTokensToggled && (
                        <>
                          <LabelsBlockSubBlock
                            isLightTheme={isLightTheme}
                            style={{ marginBottom: '3px' }}>
                            <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                              Exchange rate
                            </LabelsBlockSubBlockSpan>

                            {/*{sendToken.singleAmountSendTokenConvert !== 0 &&*/}
                            {/*initSendMultiSwapTokenList[0].symbol !== undefined ? (*/}
                            {/*  <LabelsBlockSubBlockSpan*/}
                            {/*    isLightTheme={isLightTheme}*/}
                            {/*    style={{ visibility: 'hidden' }}>*/}
                            {/*    1 {initSendMultiSwapTokenList[0].symbol} ={' '}*/}
                            {/*    {sendToken.singleAmountSendTokenConvert} {sendToken.symbol}*/}
                            {/*  </LabelsBlockSubBlockSpan>*/}
                            {/*) : (*/}
                            <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                              Unavailable
                            </LabelsBlockSubBlockSpan>
                            {/*)}*/}
                          </LabelsBlockSubBlock>
                          <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                            <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                              Offered by
                            </LabelsBlockSubBlockSpan>
                            <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                              {/*<ConsoleLog>{sendToken.chosenExchanger.logoIcon}</ConsoleLog>*/}
                              {sendToken.chosenExchanger.logoIcon &&
                                Object.keys(sendToken).length !== 0 && (
                                  // {sendToken.chosenExchanger.logoIcon !== undefined && (
                                  <img
                                    src={sendToken.chosenExchanger.logoIcon}
                                    alt="paraSwapIcon"
                                  />
                                )}

                              {!isTokensToggled ? (
                                <span
                                  onClick={(event) =>
                                    openExchangersModal(
                                      event,
                                      initReceiveMultiSwapTokensList,
                                      sendToken
                                    )
                                  }>
                                  {sendToken.chosenExchanger.name}
                                </span>
                              ) : (
                                <span
                                  onClick={(event) =>
                                    openExchangersModal(
                                      event,
                                      initSendMultiSwapTokenList,
                                      sendToken
                                    )
                                  }>
                                  {sendToken.chosenExchanger.name}
                                </span>
                              )}

                              {/* Offered by popover*/}
                              <Popover
                                open={open}
                                anchorEl={anchorEl}
                                chosenNewExchangerToken={chosenNewExchangerToken}
                                chosenExchangerTokensList={chosenExchangerTokensList}
                                onClose={closeExchangersModal}
                                anchorOrigin={{
                                  vertical: 'center',
                                  horizontal: 'right',
                                }}
                                transformOrigin={{
                                  vertical: 'center',
                                  horizontal: 'right',
                                }}
                                PaperProps={{
                                  sx: {
                                    marginLeft: '49px',
                                    width: '525px',
                                    height: '480px',
                                    backgroundColor: isLightTheme ? '#FFFFFF29' : '#4453AD1A',
                                    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                                    backdropFilter: 'blur(35px)',
                                    mixBlendMode: 'normal',
                                    borderRadius: '10px',
                                  },
                                }}>
                                <SwapTokensOfferedBySubBlock isLightTheme={isLightTheme}>
                                  <ExchangersMainSubLayout>
                                    <OfferedByLayoutLabelBlock
                                      isLightTheme={isLightTheme}
                                      onClick={closeExchangersModal}>
                                      <img
                                        src={isLightTheme ? chevronDownBlack : chevronDownLight}
                                        alt="chevron_icon"
                                      />
                                      <span>Offered by</span>
                                    </OfferedByLayoutLabelBlock>
                                    <ExchangersLayout isLightTheme={isLightTheme}>
                                      <ExchangersLayoutTitlesBlock isLightTheme={isLightTheme}>
                                        <span>Receive</span>
                                        <span>Gas fee</span>
                                      </ExchangersLayoutTitlesBlock>
                                      <ExchangersMainListLayout isLightTheme={isLightTheme}>
                                        <ExchangerMainList>
                                          {exchangersOfferedList.map((exchanger) => (
                                            <ExchangerElementListItem
                                              isLightTheme={isLightTheme}
                                              onClick={() =>
                                                selectNewExchanger(
                                                  exchanger,
                                                  chosenExchangerTokensList,
                                                  chosenNewExchangerToken
                                                )
                                              }>
                                              <ExchangerElementSpan
                                                isLightTheme={isLightTheme}
                                                style={{ marginRight: '36px' }}>
                                                {exchanger.receiveTokenUSDCurrencyCourse}
                                              </ExchangerElementSpan>
                                              <ExchangerElementSpan isLightTheme={isLightTheme}>
                                                {exchanger.gasFee}
                                              </ExchangerElementSpan>

                                              {chosenNewExchangerToken &&
                                                Object.keys(chosenNewExchangerToken).length !==
                                                  0 && (
                                                  <>
                                                    {exchanger.isBestRate ? (
                                                      <ExchangerBestRateSpan
                                                        isLightTheme={isLightTheme}
                                                        style={{}}>
                                                        Best rate
                                                      </ExchangerBestRateSpan>
                                                    ) : (
                                                      <ExchangerBestRateSpan
                                                        isLightTheme={isLightTheme}
                                                        style={{ visibility: 'hidden' }}>
                                                        Best rate
                                                      </ExchangerBestRateSpan>
                                                    )}

                                                    {exchanger.routerAddress ===
                                                    chosenNewExchangerToken.chosenExchanger
                                                      .routerAddress ? (
                                                      <>
                                                        <ExchangerIcon
                                                          src={exchanger.logoIcon}
                                                          alt="icon"
                                                        />
                                                        <GreenDotIcon
                                                          src={greenDot}
                                                          alt="green_dot"
                                                        />
                                                      </>
                                                    ) : (
                                                      <>
                                                        <ExchangerIcon
                                                          src={exchanger.logoIcon}
                                                          alt="icon"
                                                        />
                                                        <GreenDotIcon
                                                          src={greenDot}
                                                          alt="green_dot"
                                                          style={{
                                                            visibility: 'hidden',
                                                          }}
                                                        />
                                                      </>
                                                    )}
                                                  </>
                                                )}
                                            </ExchangerElementListItem>
                                          ))}
                                        </ExchangerMainList>
                                      </ExchangersMainListLayout>
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <SaveSelectedExchangerButton isLightTheme={isLightTheme}>
                                          Save
                                        </SaveSelectedExchangerButton>
                                      </div>
                                    </ExchangersLayout>
                                  </ExchangersMainSubLayout>
                                </SwapTokensOfferedBySubBlock>
                              </Popover>
                            </AdditionalOptionsSwapTokensSubBlock>
                          </LabelsBlockSubBlock>
                        </>
                      )}
                    </MultiSwapSendTokensChooseBlock>

                    {sendToken.isExchangeIsAllowed === false && !isTokensToggled && (
                      <ExceededAmountTokensLimitWarning
                        style={{
                          marginTop: !matches && '-5px',
                          marginRight: !matches ? '30px' : '20px',
                        }}>
                        Insufficient funds
                      </ExceededAmountTokensLimitWarning>
                    )}

                    {sendToken.isExchangeIsAllowed === false && isTokensToggled && (
                      <ExceededAmountTokensLimitWarning
                        style={{
                          marginTop: '-10px',
                          marginRight: matches ? '20px' : '30px',
                        }}>
                        Insufficient funds
                      </ExceededAmountTokensLimitWarning>
                    )}
                  </>
                ))}
              </MultiSwapSendTokensChooseBlockLayout>

              {/* Better will be done for every individual token*/}

              {isAbleToReplaceTokens ? (
                <SwitchTokensBtn
                  onClick={toggleSwappedTokens}
                  src={isLightTheme ? switchTokensLight : switchTokensDark}
                  alt="switch_tokens_btn"
                />
              ) : (
                <SwitchTokensBtn
                  style={{ opacity: 0.5 }}
                  src={isLightTheme ? switchTokensLight : switchTokensDark}
                  alt="switch_tokens_btn"
                />
              )}
            </SendReceiveSubBlock>
            {/* mapped received block */}
            <SendReceiveSubBlock
            // style={{ backgroundColor: 'green' }}
            >
              <SendBlockLabels isLightTheme={isLightTheme} style={{ margin: '0px 20px 5px 20px' }}>
                <span>Receive</span>
              </SendBlockLabels>
              <MultiSwapSendTokensChooseBlockLayout>
                <SubLayoutReceiveTokensBlock>
                  {initReceiveMultiSwapTokensList.map((receiveToken, key) => (
                    <MultiSwapReceiveTokensBlock
                      isLightTheme={isLightTheme}
                      style={{ height: isTokensToggled && '60px' }}>
                      <FirstSubLayoutMultiSwapReceiveTokensBlock
                        style={{
                          flexDirection: isTokensToggled && 'column',
                        }}>
                        <MultiSwapChooseBtnTokenBlock
                          style={{
                            // marginTop:
                            marginLeft: '8px',
                            marginTop: !isTokensToggled ? '-15px' : '-2px',
                          }}
                          onClick={() => {
                            setOldTokenSwappedAddress(receiveToken.address);
                            openModalHelper(
                              {
                                tokensList: finalReceiveTokensList,
                                isSendModalOpen: false,
                              },
                              key
                            );
                          }}>
                          <div>
                            {receiveToken.logoURI !== null ? (
                              <SendTokenImg
                                alt="token_img"
                                src={receiveToken.logoURI}
                                style={{ marginLeft: '4px' }}
                              />
                            ) : (
                              <Avatar
                                style={{
                                  marginRight: '12px',
                                  height: '21px',
                                  width: '21px',
                                  marginLeft: '5px',
                                }}
                                name={receiveToken.name}
                                round={true}
                                size="21"
                                textSizeRatio={1}
                              />
                            )}
                            <ChosenTokenLabel isLightTheme={isLightTheme}>
                              {receiveToken.symbol === 'ethereum' ? 'ETH' : receiveToken.symbol}
                            </ChosenTokenLabel>
                            <img
                              src={isLightTheme ? chevronDownBlack : chevronDownLight}
                              alt="chevron_icon"
                            />
                          </div>
                        </MultiSwapChooseBtnTokenBlock>
                        <USDCurrencyInputBlock style={{ height: isTokensToggled && 'auto' }}>
                          {/*balance insert*/}
                          <ChosenMultiSwapSendReceiveTokenValueInput
                            InputProps={{
                              inputProps: {
                                style: {
                                  marginTop: isTokensToggled ? '-30px' : '4px',
                                  textAlign: 'right',
                                  padding: 0,
                                  width: '200px',
                                  fontWeight: 600,
                                  color: isLightTheme ? 'black' : 'white',
                                },
                              },
                              classes: { notchedOutline: classes.noBorder },
                            }}
                            isLightTheme={isLightTheme}
                            placeholder="0.0"
                            inputRef={textInput}
                            value={receiveToken.amount}
                            onChange={(e) => {
                              convertReceiveTokenToUSDCurrency(e.target.value, {
                                ...receiveToken,
                              });
                            }}
                          />

                          {!isTokensToggled && (
                            <MultiSwapSendValueLabelsLayout
                              style={{
                                display: 'flex',
                                marginRight: '20px',
                                // backgroundColor: 'lightblue',
                              }}>
                              <MultiSwapSendValueLabel
                                isLightTheme={isLightTheme}
                                style={{ marginLeft: 'auto' }}>
                                {receiveToken.USDCurrency < 0 ? (
                                  <>Price not available</>
                                ) : (
                                  <>${receiveToken.USDCurrency}</>
                                )}
                              </MultiSwapSendValueLabel>
                            </MultiSwapSendValueLabelsLayout>
                          )}
                        </USDCurrencyInputBlock>
                        {isTokensToggled && (
                          <MultiSwapSendValueLabelsLayout
                            style={{
                              padding: '0px 20px 0px 43px',
                              marginTop: '-2px',
                            }}>
                            <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                              {receiveToken.balance} {receiveToken.symbol}
                            </MultiSwapSendValueLabel>

                            <MultiSwapSendValueLabel
                              isLightTheme={isLightTheme}
                              style={{ marginLeft: 'auto' }}>
                              {receiveToken.USDCurrency < 0 ? (
                                <>Price not available</>
                              ) : (
                                <>${receiveToken.USDCurrency}</>
                              )}
                            </MultiSwapSendValueLabel>
                          </MultiSwapSendValueLabelsLayout>
                        )}
                      </FirstSubLayoutMultiSwapReceiveTokensBlock>

                      {/* correct tokens toggle usdCurrency*/}

                      {!isTokensToggled && (
                        <>
                          <SecondSubLayoutMultiSwapReceiveTokensBlock>
                            <LabelsBlockSubBlock
                              isLightTheme={isLightTheme}
                              style={{ marginBottom: '3px' }}>
                              <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                                Exchange rate
                              </LabelsBlockSubBlockSpan>

                              {/*{receiveToken.singleAmountSendTokenConvert !== 0 &&*/}
                              {/*initSendMultiSwapTokenList[0].symbol !== undefined ? (*/}
                              {/*  <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>*/}
                              {/*    1 {initSendMultiSwapTokenList[0].symbol} ={' '}*/}
                              {/*    {receiveToken.singleAmountSendTokenConvert} {receiveToken.symbol}*/}
                              {/*  </LabelsBlockSubBlockSpan>*/}
                              {/*) : (*/}
                              <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                                Unavailable
                              </LabelsBlockSubBlockSpan>
                              {/*)}*/}
                            </LabelsBlockSubBlock>

                            {/* add checking*/}

                            <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                              <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                                Offered by
                              </LabelsBlockSubBlockSpan>
                              <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                                <img
                                  src={receiveToken.chosenExchanger.logoIcon}
                                  alt="paraSwapIcon"
                                />
                                <span
                                  onClick={(event) =>
                                    openExchangersModal(
                                      event,
                                      initReceiveMultiSwapTokensList,
                                      receiveToken
                                    )
                                  }>
                                  {receiveToken.chosenExchanger.name}
                                </span>
                                {/* Offered by popover*/}
                                <Popover
                                  open={open}
                                  anchorEl={anchorEl}
                                  chosenNewExchangerToken={chosenNewExchangerToken}
                                  chosenExchangerTokensList={chosenExchangerTokensList}
                                  onClose={closeExchangersModal}
                                  anchorOrigin={{
                                    vertical: mobilePopover ? 'top' : 'center',
                                    horizontal: mobilePopover ? 'left' : 'right',
                                  }}
                                  transformOrigin={{
                                    vertical: mobilePopover ? 'bottom' : 'center',
                                    horizontal: mobilePopover ? 'right' : 'right',
                                  }}
                                  PaperProps={{
                                    sx: {
                                      marginTop: !mobilePopover && '-90px',
                                      marginLeft: !mobilePopover && '15px',
                                      width: mobilePopover ? '100%' : '525px',
                                      height: '515px',
                                      backgroundColor: isLightTheme ? '#FFFFFF29' : '#4453AD1A',
                                      boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
                                      backdropFilter: 'blur(35px)',
                                      mixBlendMode: 'normal',
                                      borderRadius: '10px',
                                      left: '0px',
                                    },
                                  }}>
                                  <SwapTokensOfferedBySubBlock
                                    isLightTheme={isLightTheme}
                                    mobilePopover={mobilePopover}>
                                    <ExchangersMainSubLayout>
                                      <OfferedByLayoutLabelBlock
                                        isLightTheme={isLightTheme}
                                        onClick={closeExchangersModal}>
                                        <img
                                          src={isLightTheme ? chevronDownBlack : chevronDownLight}
                                          alt="chevron_icon"
                                        />
                                        <span>Offered by</span>
                                      </OfferedByLayoutLabelBlock>
                                      <ExchangersLayout isLightTheme={isLightTheme}>
                                        <ExchangersLayoutTitlesBlock
                                          isLightTheme={isLightTheme}
                                          mobilePopover={mobilePopover}>
                                          <span>Receive</span>
                                          {!mobilePopover && <span>Gas fee</span>}
                                        </ExchangersLayoutTitlesBlock>
                                        <ExchangersMainListLayout isLightTheme={isLightTheme}>
                                          <ExchangerMainList mobilePopover={mobilePopover}>
                                            {exchangersOfferedList.map((exchanger) => (
                                              <ExchangerElementListItem
                                                isLightTheme={isLightTheme}
                                                mobilePopover={mobilePopover}
                                                onClick={() =>
                                                  selectNewExchanger(
                                                    exchanger,
                                                    chosenExchangerTokensList,
                                                    chosenNewExchangerToken
                                                  )
                                                }>
                                                <ExchangerElementSpan
                                                  mobilePopover={mobilePopover}
                                                  isLightTheme={isLightTheme}>
                                                  {exchanger.receiveTokenUSDCurrencyCourse}
                                                </ExchangerElementSpan>
                                                {!mobilePopover && (
                                                  <ExchangerElementSpan
                                                    isLightTheme={isLightTheme}
                                                    mobilePopover={mobilePopover}>
                                                    {exchanger.gasFee}
                                                  </ExchangerElementSpan>
                                                )}

                                                {chosenNewExchangerToken &&
                                                  Object.keys(chosenNewExchangerToken).length !==
                                                    0 && (
                                                    <>
                                                      {exchanger.isBestRate ? (
                                                        <ExchangerBestRateSpan
                                                          mobilePopover={mobilePopover}
                                                          isLightTheme={isLightTheme}
                                                          style={{}}>
                                                          Best rate
                                                        </ExchangerBestRateSpan>
                                                      ) : (
                                                        <ExchangerBestRateSpan
                                                          isLightTheme={isLightTheme}
                                                          mobilePopover={mobilePopover}
                                                          style={
                                                            {
                                                              // visibility: 'hidden',
                                                            }
                                                          }>
                                                          Best rate
                                                        </ExchangerBestRateSpan>
                                                      )}

                                                      {exchanger.routerAddress ===
                                                      chosenNewExchangerToken.chosenExchanger
                                                        .routerAddress ? (
                                                        <>
                                                          <ExchangerIcon
                                                            mobilePopover={mobilePopover}
                                                            src={exchanger.logoIcon}
                                                            alt="icon"
                                                          />
                                                          <GreenDotIcon
                                                            mobilePopover={mobilePopover}
                                                            src={greenDot}
                                                            alt="green_dot"
                                                          />
                                                        </>
                                                      ) : (
                                                        <>
                                                          <ExchangerIcon
                                                            src={exchanger.logoIcon}
                                                            alt="icon"
                                                          />
                                                          <GreenDotIcon
                                                            src={greenDot}
                                                            alt="green_dot"
                                                            style={{
                                                              visibility: 'hidden',
                                                            }}
                                                          />
                                                        </>
                                                      )}
                                                    </>
                                                  )}
                                              </ExchangerElementListItem>
                                            ))}
                                          </ExchangerMainList>
                                        </ExchangersMainListLayout>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                          <SaveSelectedExchangerButton isLightTheme={isLightTheme}>
                                            Save
                                          </SaveSelectedExchangerButton>
                                        </div>
                                      </ExchangersLayout>
                                    </ExchangersMainSubLayout>
                                  </SwapTokensOfferedBySubBlock>
                                </Popover>
                              </AdditionalOptionsSwapTokensSubBlock>
                            </LabelsBlockSubBlock>
                          </SecondSubLayoutMultiSwapReceiveTokensBlock>
                        </>
                      )}
                    </MultiSwapReceiveTokensBlock>
                  ))}
                </SubLayoutReceiveTokensBlock>
                {/* choose send/receive tokens modal*/}
                {openTokensModal && (
                  <SelectTokensModalContainer
                    theme={isLightTheme}
                    isOpen={openTokensModal}
                    onClose={() => {
                      setOpenTokensModal(false);
                    }}>
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setOpenTokensModal(false);
                      }}>
                      <TokensModalSubLayout isLightTheme={isLightTheme}>
                        <Header>
                          <ModalTitle isLightTheme={isLightTheme}>Select token</ModalTitle>
                          <CloseButton
                            onClick={() => {
                              setOpenTokensModal(false);
                            }}
                            isLightTheme={isLightTheme}>
                            <img
                              src={isLightTheme ? closeModalIcon : closeModalIconDark}
                              alt="close_modal_btn"
                            />
                          </CloseButton>
                        </Header>

                        <SearchTokensModalTextField
                          isLightTheme={isLightTheme}
                          onChange={(event) => {
                            isSendTokenSelectedSwapped
                              ? searchTokensHandler(
                                  event,
                                  isSendTokenSelectedSwapped,
                                  finalSendTokensList
                                )
                              : searchTokensHandler(
                                  event,
                                  isSendTokenSelectedSwapped,
                                  finalReceiveTokensList
                                );
                          }}
                          InputProps={{
                            endAdornment: (
                              <img
                                src={
                                  isLightTheme
                                    ? searchTokensImportModalDark
                                    : searchTokensImportModalLight
                                }
                                alt="search_icon"
                              />
                            ),
                            classes: { notchedOutline: classes.noBorder },
                            sx: {
                              color: isLightTheme ? '#1E1E20' : '#FFFFFF',
                              paddingRight: '20px',
                              fontSize: 14,
                            },
                          }}
                          id="filled-search"
                          variant="outlined"
                          label="Search tokens..."
                          InputLabelProps={{
                            style: {
                              color: isLightTheme ? 'black' : 'white',
                              fontSize: 14,
                              fontWeight: 400,
                              opacity: 0.5,
                              lineHeight: '22px',
                            },
                          }}
                          size="small"
                        />

                        {tokensListModal.length !== 0 ? (
                          // isSendTokenSelectedSwapped
                          //ReceiveTokenModalListItem

                          <SendTokensModalList isLightTheme={isLightTheme}>
                            {tokensListModal.map((object) => (
                              <>
                                {isSendTokenSelectedSwapped ? (
                                  <SendTokenModalListItem
                                    onClick={() => {
                                      setOpenTokensModal(false);
                                      selectTokenForSwap(object, isSendTokenSelectedSwapped);
                                    }}
                                    isLightTheme={isLightTheme}
                                    // style={{
                                    //   height: matches && '40px',
                                    //   marginBottom: isSendTokenSelectedSwapped && matches && '20px',
                                    // }}
                                  >
                                    <SendTokenLabelsBlock
                                    // style={{ height: matches && '25px' }}
                                    >
                                      {object.logoURI !== null ? (
                                        <SendTokenImg alt="token_img" src={object.logoURI} />
                                      ) : (
                                        <Avatar
                                          style={{
                                            marginLeft: '12px',
                                            marginRight: '12px',
                                            marginTop: '2px',
                                          }}
                                          name={object.name}
                                          round={true}
                                          size="21"
                                          textSizeRatio={1}
                                        />
                                      )}
                                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <SendTokenName isLightTheme={isLightTheme}>
                                          {object.name}
                                        </SendTokenName>
                                        {isSendTokenSelectedSwapped ? (
                                          <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                                            {`${object.balance} ${object.symbol} · 
                                    $ ${
                                      Math.round(object.singleTokenUSDCurrencyAmount * 100000) /
                                      100000
                                    } 
                                    `}
                                          </SendTokenConvertedMeasures>
                                        ) : (
                                          <SendTokenConvertedMeasures
                                            isLightTheme={isLightTheme}
                                            style={{ visibility: 'hidden' }}>
                                            409,333 UNI · $19,18
                                          </SendTokenConvertedMeasures>
                                        )}
                                      </div>
                                    </SendTokenLabelsBlock>
                                    <SendTokenBalance isLightTheme={isLightTheme}>
                                      {object.balance !== undefined &&
                                        isSendTokenSelectedSwapped === true && (
                                          // <Loader type="Rings" color="#BB86FC" height={30} width={30} />
                                          <span>
                                            {`$${
                                              Math.round(
                                                object.balance *
                                                  object.singleTokenUSDCurrencyAmount *
                                                  100000
                                              ) / 100000
                                            }`}
                                          </span>
                                        )}
                                    </SendTokenBalance>
                                  </SendTokenModalListItem>
                                ) : (
                                  <ReceiveTokenModalListItem
                                    onClick={() => {
                                      setOpenTokensModal(false);
                                      selectTokenForSwap(object, isSendTokenSelectedSwapped);
                                    }}
                                    isLightTheme={isLightTheme}
                                    style={{ height: '40px' }}>
                                    <SendTokenLabelsBlock style={{ marginTop: '20px' }}>
                                      {object.logoURI !== null ? (
                                        <SendTokenImg alt="token_img" src={object.logoURI} />
                                      ) : (
                                        <Avatar
                                          style={{
                                            marginLeft: '12px',
                                            marginRight: '12px',
                                            marginTop: '2px',
                                          }}
                                          name={object.name}
                                          round={true}
                                          size="21"
                                          textSizeRatio={1}
                                        />
                                      )}
                                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <SendTokenName isLightTheme={isLightTheme}>
                                          {object.name}
                                        </SendTokenName>
                                        {isSendTokenSelectedSwapped ? (
                                          <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                                            {`${object.balance} ${object.symbol} · 
                                    $ ${
                                      Math.round(object.singleTokenUSDCurrencyAmount * 100000) /
                                      100000
                                    } 
                                    `}
                                          </SendTokenConvertedMeasures>
                                        ) : (
                                          <SendTokenConvertedMeasures
                                            isLightTheme={isLightTheme}
                                            style={{ visibility: 'hidden' }}>
                                            409,333 UNI · $19,18
                                          </SendTokenConvertedMeasures>
                                        )}
                                      </div>
                                    </SendTokenLabelsBlock>
                                  </ReceiveTokenModalListItem>
                                )}
                              </>
                            ))}
                          </SendTokensModalList>
                        ) : (
                          <AbsentFoundTokensBlock isLightTheme={isLightTheme}>
                            <p>No tokens were found</p>
                          </AbsentFoundTokensBlock>
                        )}
                      </TokensModalSubLayout>
                    </OutsideClickHandler>
                  </SelectTokensModalContainer>
                )}
              </MultiSwapSendTokensChooseBlockLayout>
              {isAddedReceiveTokensLimitExceeded === false && (
                <>
                  {!isTokensToggled ? (
                    <AddReceiveTokenMultiSwapBtn
                      isLightTheme={isLightTheme}
                      onClick={() => {
                        addNewTokenHandler(finalReceiveTokensList);
                      }}>
                      <img
                        src={isLightTheme ? plusIconDark : plusIconLight}
                        alt="add_receive_multiswap_token"
                      />
                    </AddReceiveTokenMultiSwapBtn>
                  ) : (
                    <AddReceiveTokenMultiSwapBtn
                      style={{ marginTop: '20px' }}
                      isLightTheme={isLightTheme}
                      onClick={() => {
                        addNewTokenHandler(finalSendTokensList);
                      }}>
                      <img
                        src={isLightTheme ? plusIconDark : plusIconLight}
                        alt="add_receive_multiswap_token"
                      />
                    </AddReceiveTokenMultiSwapBtn>
                  )}
                </>
              )}
            </SendReceiveSubBlock>

            <SwapBlockDelimiter
              isLightTheme={isLightTheme}
              style={{ margin: '20px  27px 0 20px' }}
            />
            {/* Labels block*/}
            <DownDelimiterLabelsBlock
              isLightTheme={isLightTheme}
              style={{ marginTop: '20px', padding: '20 27px 16px 20px' }}>
              <div style={{ padding: '0 27px 16px 20px' }}>
                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Slippage Tolerance
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span>1%</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>
                <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                  <LabelsBlockImportantSpan isLightTheme={isLightTheme}>
                    Transaction speed
                  </LabelsBlockImportantSpan>
                  <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                    <span>$20 ^ Average</span>
                  </AdditionalOptionsSwapTokensSubBlock>
                </LabelsBlockSubBlock>
              </div>
            </DownDelimiterLabelsBlock>
            <SwapBlockExchangeLayout isLightTheme={isLightTheme} style={{ marginBottom: '40px' }}>
              <Button onClick={() => exchange()} disabled={!isTokensLimitNotExceeded}>
                Exchange
              </Button>
            </SwapBlockExchangeLayout>
          </SwapTokensMainSubBlock>
        </MultiSwapLayout>
      ) : (
        <span style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
          Loading...
        </span>
      )}
    </SecondColumnSwapSubBlock>
  );
}
