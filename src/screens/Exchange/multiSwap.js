import React, { useEffect, useState } from 'react';
import {
  AdditionalOptionsSwapTokensSubBlock,
  AddReceiveTokenMultiSwapBtn,
  ChosenMultiSwapSendReceiveTokenValueInput,
  ChosenTokenLabel,
  ColumnMainSubTitles,
  ColumnMainTitles,
  DownDelimiterLabelsBlock,
  ExchangerElementListItem,
  ExchangersLayout,
  ExchangersLayoutTitlesBlock,
  ExchangersMainSubLayout,
  ExchangerMainList,
  FirstSubLayoutMultiSwapReceiveTokensBlock,
  LabelsBlockImportantSpan,
  LabelsBlockSubBlock,
  LabelsBlockSubBlockSpan,
  MultiSwapChooseBtnTokenBlock,
  MultiSwapReceiveTokensBlock,
  MultiSwapSendTokensChooseBlock,
  MultiSwapSendValueLabel,
  MultiSwapTokenAvatar,
  NewMultiSwapButton,
  OfferedByLayoutLabelBlock,
  SecondColumnSwapSubBlock,
  SecondColumnTitleBlock,
  SecondColumnTitleHeaderBlock,
  SecondSubLayoutMultiSwapReceiveTokensBlock,
  SendReceiveSubBlock,
  SendTokenImg,
  SwapBlockDelimiter,
  SwapBlockExchangeLayout,
  SwapTokensMainSubBlock,
  SwapTokensOfferedBySubBlock,
  SwitchTokensBtn,
  USDCurrencyInputBlock,
  ExchangerElementSpan,
  ExchangerBestRateSpan,
  ExchangerIcon,
  GreenDotIcon,
  ExchangersMainListLayout,
  SaveSelectedExchangerButton,
  TokensModalSubLayout,
  SearchTokensModalTextField,
  SendTokensModalList,
  SendTokenModalListItem,
  SendTokenLabelsBlock,
  SendTokenName,
  SendTokenConvertedMeasures,
  SendTokenBalance,
  AbsentFoundTokensBlock,
} from './styled';
import EthIcon from '../../assets/icons/ethereum.svg';
import chevronDownBlack from '../../assets/icons/chevronDownLightTheme.svg';
import chevronDownLight from '../../assets/icons/chevronDownLight.svg';
import switchTokensLight from '../../assets/icons/switchTokensLight.svg';
import switchTokensDark from '../../assets/icons/switchTokensDark.svg';

import plusIconDark from '../../assets/icons/plusIconDark.svg';
import plusIconLight from '../../assets/icons/plusIconLight.svg';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import daiICon from '../../assets/icons/daiIcon.svg';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import actionTypes from '../../constants/actionTypes';
import { getTokenDataSaga } from '../../store/currentTokenData/actions';
import { useParams } from 'react-router-dom';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import greenDot from '../../assets/icons/greenDot.svg';

import paraSwapIcon from '../../assets/icons/exchangers/paraSwapExchangerIcon.svg';
import uniswapExchangerIcon from '../../assets/icons/exchangers/uniswapExchangerIcon.svg';

import exchangersOfferedList from './exchangersOfferedList';
import sendTokensMockList from './sendTokensMockList.json';
import SelectTokensModalContainer from './selectTokensModal';
import OutsideClickHandler from './outsideClickHandler';
import { CloseButton, Header, ModalTitle } from './selectTokensModal/styles';
import closeModalIcon from '../../assets/icons/close_nft.svg';
import closeModalIconDark from '../../assets/icons/closenftdark.svg';
import searchTokensImportModalDark from '../../assets/icons/searchTokensInputModalDark.svg';
import searchTokensImportModalLight from '../../assets/icons/searchTokensButtonMobileLight.svg';
import Avatar from 'react-avatar';
import Loader from 'react-loader-spinner';
import { filteredTokensByName } from './helpers';

const useStyles = makeStyles((theme) => ({
  noBorder: {
    border: 'none !important',
  },
}));

export default function MultiSwapComponent() {
  const { address } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [sendTokenForExchange, setSendTokenForExchange] = useState({
    symbol: 'ETH',
    logoURI: EthIcon,
    avatarIcon: 'Ethereum',
    name: 'Ethereum',
    id: 'ethereum',
    sendTokensListItem: true,
    address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  });

  const [tokenSendUSDCurrency, setTokenSendUSDCurrency] = useState('$0.00');

  const initReceiveTokensList = [
    {
      symbol: 'WETH',
      logoURI: 'https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295',
      avatarIcon: 'Weth',
      name: 'Wrapped Ether',
      id: 'weth',
      receiveTokensListItem: true,
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    },
    {
      symbol: 'DAI',
      logoURI: 'https://assets.coingecko.com/coins/images/9956/thumb/4943.png?1636636734',
      avatarIcon: 'Dai Stablecoin',
      name: 'Dai Stablecoin',
      id: 'dai',
      receiveTokensListItem: true,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    },
    // {
    //   id: 'usdt',
    //   symbol: 'USDT',
    //   name: 'Tether USD',
    //   decimals: 6,
    //   tokenType: 'ERC20',
    //   address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    //   logoURI: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707',
    //   receiveTokensListItem: true,
    // },
  ];

  const [receiveTokensList, setReceiveTokensList] = useState(initReceiveTokensList);

  console.log('init receive multiswap state', receiveTokensList);

  const [openTokensModal, setOpenTokensModal] = useState(false);
  const isLightTheme = useSelector((state) => state.themeReducer.isLightTheme);

  //working saga
  // const finalSendTokensList = useSelector((state) => state.tokensListReducer.sendTokensList);
  // const finalReceiveTokensList = useSelector((state) => state.tokensListReducer.receiveTokensList);
  const finalSendTokensList = sendTokensMockList;
  const finalReceiveTokensList = sendTokensMockList;

  const [filteredSendTokensListData, setFilteredSendTokensListData] = useState([]);
  const [filteredReceiveTokensListData, setFilteredReceiveTokensListData] = useState([]);

  useEffect(() => {
    finalSendTokensList.length !== 0 && setFilteredSendTokensListData(finalSendTokensList);
    finalReceiveTokensList.length !== 0 && setFilteredReceiveTokensListData(finalReceiveTokensList);
  }, [finalSendTokensList, finalReceiveTokensList]);

  let convertSendTokenToUSDCurrency = async (tokenData) => {
    console.log('multiswap tokenData', tokenData);

    if (tokenData.amount === '') {
      tokenData.amount = '0';
    }

    if (tokenData.symbol === 'ETH') {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      setTokenSendUSDCurrency(
        `$${(ethDollarValue.data.ethereum.usd * parseInt(tokenData.amount)).toFixed(2)}`
      );
    } else {
      if (tokenData.USDCurrency !== undefined) {
        setTokenSendUSDCurrency(
          `$${(tokenData.USDCurrency * parseInt(tokenData.amount)).toFixed(2)}`
        );
      } else {
        setTokenSendUSDCurrency('Price not available');
      }
    }
  };

  let convertReceiveTokenToUSDCurrency = async (tokenData) => {
    console.log('receive USD tokenData multiswap', tokenData);

    if (tokenData.amount === '' || typeof tokenData.amount === 'symbol') {
      tokenData.amount = '0';
    }

    let tokenUSDCurrencyValue;
    let finalUSDCurrencyValue;

    if (
      tokenData.receiveTokensListItem === true &&
      tokenData.address !== '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenData.USDCurrency === undefined
    ) {
      // tokenUSDCurrencyValue = await axios.get(
      //   `https://api.ethplorer.io/getTokenInfo/${tokenData.address}?apiKey=EK-qSPda-W9rX7yJ-UY93y`
      // );

      // if (tokenUSDCurrencyValue.data.price.rate !== undefined) {
      // finalUSDCurrencyValue = `$ ${(
      //   tokenUSDCurrencyValue.data.price.rate * parseInt(tokenData.amount)
      // ).toFixed(2)}`;

      //not permanent solution
      finalUSDCurrencyValue = `$${1.0 * parseInt(tokenData.amount)}`;

      // } else {
      //   console.log('Price not available');
      // }
    } else if (
      tokenData.address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' &&
      tokenData.receiveTokensListItem === true
    ) {
      const ethDollarValue = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      );
      finalUSDCurrencyValue = `$${(
        ethDollarValue.data.ethereum.usd * parseInt(tokenData.amount)
      ).toFixed(2)}`;
    }

    console.log('receive USD finalUSDCurrencyValue', finalUSDCurrencyValue);

    // found necessary index of element, which currency is updated
    const needIndex = receiveTokensList.findIndex((token) => token.address === tokenData.address);

    console.log('receive USD index', needIndex);

    // && needIndex === tokenData.receiveTokenIndex

    if (needIndex !== -1) {
      receiveTokensList[tokenData.receiveTokenIndex] = {
        ...receiveTokensList.filter((token) => token.address === tokenData.address)[0],
        USDCurrency: finalUSDCurrencyValue,
        amount: parseInt(tokenData.amount),
      };
    }

    let temp_state = [...receiveTokensList];

    let temp_element = { ...temp_state[needIndex] };

    temp_element.USDCurrency = finalUSDCurrencyValue;

    temp_state[needIndex] = temp_element;

    setReceiveTokensList(temp_state);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  let [tokensListModal, setTokensListModal] = useState([]);
  let [isSendTokenSelectedSwapped, setIsSendTokenSelectedSwapped] = useState(false);

  const [sendTokenForExchangeAmount, setSendTokenForExchangeAmount] = useState();
  const [receiveTokenForExchangeAmount, setReceiveTokenForExchangeAmount] = useState();
  let [oldTokenSwappedAddress, setOldTokenSwappedAddress] = useState();

  const openModalHelper = (payload) => {
    setOpenTokensModal(true);
    console.log('tokensList multiswap payload', payload);
    setTokensListModal(payload.tokensList);
    setIsSendTokenSelectedSwapped(payload.isSendModalOpen);
  };

  const searchTokensHandler = (event, searchTokensData) => {
    console.log('event multiswap', event);
    const result = filteredTokensByName(event, searchTokensData);
    console.log('result multiswap', result);
    setTokensListModal(result);
  };

  // console.log('useState tokensListModal multiswap', tokensListModal);
  // console.log('useState isSendTokenSelectedSwappedTokenType', isSendTokenSelectedSwapped);

  const selectTokenForSwap = (selectedSwapToken, isSendTokenSelectedSwapped) => {
    console.log('selectedSwapToken multiswap 123', selectedSwapToken);
    console.log('objIDAddress multiswap 123', oldTokenSwappedAddress);
    console.log('isSendTokenSelectedSwapped multiswap 123', isSendTokenSelectedSwapped);

    if (isSendTokenSelectedSwapped === true) {
      setSendTokenForExchange(selectedSwapToken);
      setSendTokenForExchangeAmount(1);
      convertSendTokenToUSDCurrency({
        amount: 1,
        ...selectedSwapToken,
        address: selectedSwapToken.address,
      });
    } else {
      console.log('123 typeof', typeof oldTokenSwappedAddress);

      const needIndex = receiveTokensList.findIndex(
        (token) => token.address === oldTokenSwappedAddress
      );

      console.log('need index receive multiswap 123', needIndex);
      console.log('obj multiswap 123', { ...selectedSwapToken, receiveTokensListItem: true });
      console.log('multiswap 123 need elem', receiveTokensList[needIndex]);

      receiveTokensList[needIndex] = {
        ...selectedSwapToken,
        receiveTokensListItem: true,
      };

      // setReceiveTokenForExchangeAmount(1)

      // if (needIndex !== -1) {
      //   receiveTokensList[needIndex] = {
      //     ...receiveTokensList.filter((token) => token.address === tokenData.address)[0],
      //     USDCurrency: finalUSDCurrencyValue,
      //   };
      // }
    }
  };

  console.log('state sendTokenForExchange multiswap', sendTokenForExchange);
  console.log('state receiveTokenForExchange array multiswap 123', receiveTokensList);
  console.log('state setSendTokenForExchangeAmount multiswap', sendTokenForExchangeAmount);

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
      <SwapTokensMainSubBlock
        isLightTheme={isLightTheme}
        style={{ marginTop: '0', height: '600px' }}>
        {/*Choose send tokens block*/}
        <SendReceiveSubBlock>
          <MultiSwapSendTokensChooseBlock isLightTheme={isLightTheme}>
            {/* SEND block */}
            <MultiSwapChooseBtnTokenBlock
              onClick={() =>
                openModalHelper({ tokensList: finalSendTokensList, isSendModalOpen: true })
              }>
              <div>
                {sendTokenForExchange.logoURI !== null ? (
                  <SendTokenImg
                    alt="token_img"
                    src={sendTokenForExchange.logoURI}
                    style={{ marginLeft: '4px' }}
                  />
                ) : (
                  <MultiSwapTokenAvatar
                    name={sendTokenForExchange.avatarIcon}
                    round={true}
                    size="21"
                    textSizeRatio={1}
                  />
                )}
                <ChosenTokenLabel isLightTheme={isLightTheme}>
                  {sendTokenForExchange.symbol === 'ethereum' ? 'ETH' : sendTokenForExchange.symbol}
                </ChosenTokenLabel>
                <img src={isLightTheme ? chevronDownBlack : chevronDownLight} alt="chevron_icon" />
              </div>
              <div>
                <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                  3510,03 BTC
                </MultiSwapSendValueLabel>
              </div>
            </MultiSwapChooseBtnTokenBlock>

            <USDCurrencyInputBlock>
              <ChosenMultiSwapSendReceiveTokenValueInput
                disabled={true}
                InputProps={{
                  inputProps: {
                    style: {
                      marginTop: '4px',
                      textAlign: 'right',
                      padding: 0,
                      width: '100px',
                      fontWeight: 600,
                      color: isLightTheme ? 'black' : 'white',
                    },
                  },
                  classes: { notchedOutline: classes.noBorder },
                }}
                isLightTheme={isLightTheme}
                placeholder="0.0"
                value={sendTokenForExchangeAmount}
                onChange={(e) => {
                  setSendTokenForExchangeAmount(e.target.value);
                  convertSendTokenToUSDCurrency({
                    amount: e.target.value,
                    ...sendTokenForExchange,
                  });
                }}
              />
              <div style={{ display: 'flex', marginRight: '20px' }}>
                <MultiSwapSendValueLabel isLightTheme={isLightTheme} style={{ marginLeft: 'auto' }}>
                  {tokenSendUSDCurrency}
                </MultiSwapSendValueLabel>
              </div>
            </USDCurrencyInputBlock>
          </MultiSwapSendTokensChooseBlock>

          <SwitchTokensBtn
            src={isLightTheme ? switchTokensLight : switchTokensDark}
            alt="switch_tokens_btn"
          />
        </SendReceiveSubBlock>

        {/* mapped received block */}
        {receiveTokensList.map((receiveToken) => (
          <MultiSwapReceiveTokensBlock isLightTheme={isLightTheme}>
            <FirstSubLayoutMultiSwapReceiveTokensBlock>
              <MultiSwapChooseBtnTokenBlock
                onClick={() => {
                  setOldTokenSwappedAddress(receiveToken.address);
                  openModalHelper({ tokensList: finalReceiveTokensList, isSendModalOpen: false });
                }}>
                <div>
                  {receiveToken.logoURI !== null ? (
                    <SendTokenImg
                      alt="token_img"
                      src={receiveToken.logoURI}
                      style={{ marginLeft: '4px' }}
                    />
                  ) : (
                    <MultiSwapTokenAvatar
                      name={receiveToken.avatarIcon}
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
                <div>
                  <MultiSwapSendValueLabel isLightTheme={isLightTheme}>
                    3510,03 BTC
                  </MultiSwapSendValueLabel>
                </div>
              </MultiSwapChooseBtnTokenBlock>
              <USDCurrencyInputBlock>
                <ChosenMultiSwapSendReceiveTokenValueInput
                  InputProps={{
                    inputProps: {
                      style: {
                        marginTop: '4px',
                        textAlign: 'right',
                        padding: 0,
                        width: '100px',
                        fontWeight: 600,
                        color: isLightTheme ? 'black' : 'white',
                      },
                    },
                    classes: { notchedOutline: classes.noBorder },
                  }}
                  isLightTheme={isLightTheme}
                  placeholder="0.0"
                  // value={receiveTokensList.amount}
                  onChange={(e) => {
                    // setSendTokenForExchangeAmount(e.target.value);
                    convertReceiveTokenToUSDCurrency({
                      amount: e.target.value,
                      receiveTokenIndex: receiveTokensList.indexOf(receiveToken),
                      address: receiveToken.address,
                      receiveTokensListItem: receiveToken.receiveTokensListItem,
                    });
                  }}
                />

                <div style={{ display: 'flex', marginRight: '20px' }}>
                  <MultiSwapSendValueLabel
                    isLightTheme={isLightTheme}
                    style={{ marginLeft: 'auto' }}>
                    {receiveToken.USDCurrency !== undefined ? receiveToken.USDCurrency : '$0.00'}
                  </MultiSwapSendValueLabel>
                </div>
              </USDCurrencyInputBlock>
            </FirstSubLayoutMultiSwapReceiveTokensBlock>
            <SecondSubLayoutMultiSwapReceiveTokensBlock>
              <LabelsBlockSubBlock isLightTheme={isLightTheme} style={{ marginBottom: '3px' }}>
                <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                  Exchange rate
                </LabelsBlockSubBlockSpan>
                <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                  1 ETH = 0,82 DAI
                </LabelsBlockSubBlockSpan>
              </LabelsBlockSubBlock>
              <LabelsBlockSubBlock isLightTheme={isLightTheme}>
                <LabelsBlockSubBlockSpan isLightTheme={isLightTheme}>
                  Offered by
                </LabelsBlockSubBlockSpan>
                <AdditionalOptionsSwapTokensSubBlock isLightTheme={isLightTheme}>
                  <img src={paraSwapIcon} alt="paraSwapIcon" />
                  <span onClick={handleClick}>ParaSwap</span>
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                          onClick={handleClose}>
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
                                <ExchangerElementListItem isLightTheme={isLightTheme}>
                                  <ExchangerElementSpan
                                    isLightTheme={isLightTheme}
                                    style={{ marginRight: '36px' }}>
                                    {exchanger.receiveTokenUSDCurrencyCourse}
                                  </ExchangerElementSpan>
                                  <ExchangerElementSpan isLightTheme={isLightTheme}>
                                    {exchanger.gasFee}
                                  </ExchangerElementSpan>
                                  <ExchangerBestRateSpan
                                    isLightTheme={isLightTheme}
                                    style={{
                                      visibility: exchanger.isBestRate === false && 'hidden',
                                    }}>
                                    Best rate
                                  </ExchangerBestRateSpan>
                                  <ExchangerIcon src={exchanger.logoIcon} alt="icon" />
                                  <GreenDotIcon
                                    src={greenDot}
                                    alt="green_dot"
                                    style={{
                                      visibility: exchanger.greenDotIcon === false && 'hidden',
                                    }}
                                  />
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
          </MultiSwapReceiveTokensBlock>
        ))}

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
                  <ModalTitle isLightTheme={isLightTheme}>
                    Select token for send multiswap
                  </ModalTitle>
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
                    searchTokensHandler(event, {
                      tokensList: tokensListModal,
                    });
                  }}
                  InputProps={{
                    endAdornment: (
                      <img
                        src={
                          isLightTheme ? searchTokensImportModalDark : searchTokensImportModalLight
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
                  <SendTokensModalList isLightTheme={isLightTheme}>
                    {tokensListModal.map((object) => (
                      <SendTokenModalListItem
                        key={object.id}
                        onClick={() => {
                          setOpenTokensModal(false);
                          selectTokenForSwap(object, isSendTokenSelectedSwapped);
                        }}
                        // onClick={() => {
                        //   setOpenTokensModal(false);
                        //   setFilteredData(finalSendTokensList);
                        //   selectSendTokenForExchange({
                        //     ...object,
                        //     sendTokensListItem: true,
                        //   });
                        //   convertSendTokenToUSDCurrency({
                        //     amount: 1,
                        //     sendTokensListItem: true,
                        //     ...object,
                        //     address: object.address,
                        //   });
                        // }}
                        isLightTheme={isLightTheme}>
                        <SendTokenLabelsBlock>
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
                            <SendTokenName isLightTheme={isLightTheme}>{object.name}</SendTokenName>
                            <SendTokenConvertedMeasures isLightTheme={isLightTheme}>
                              409,333 UNI · $19,18
                            </SendTokenConvertedMeasures>
                          </div>
                        </SendTokenLabelsBlock>
                        <SendTokenBalance isLightTheme={isLightTheme}>
                          {object.balance === undefined ? (
                            <Loader type="Rings" color="#BB86FC" height={30} width={30} />
                          ) : (
                            <span>${object.balance}</span>
                          )}
                        </SendTokenBalance>
                      </SendTokenModalListItem>
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

        <AddReceiveTokenMultiSwapBtn isLightTheme={isLightTheme}>
          <img
            src={isLightTheme ? plusIconDark : plusIconLight}
            alt="add_receive_multiswap_token"
          />
        </AddReceiveTokenMultiSwapBtn>

        <SwapBlockDelimiter isLightTheme={isLightTheme} style={{ marginTop: '10px' }} />
        {/* Labels block*/}
        <DownDelimiterLabelsBlock isLightTheme={isLightTheme} style={{ marginTop: '20px' }}>
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
        </DownDelimiterLabelsBlock>
        <SwapBlockExchangeLayout isLightTheme={isLightTheme}>
          <Button>Exchange</Button>
        </SwapBlockExchangeLayout>
      </SwapTokensMainSubBlock>
    </SecondColumnSwapSubBlock>
  );
}
