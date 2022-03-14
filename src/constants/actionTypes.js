// import { setInitialSendTokenSingleSwap } from '../store/exchangeTokensLists/actions';
// import { getInitUSDCurrencyAmountSagaWatcher } from '../store/exchangeTokensLists/sagas';

export default {
  GET_ACCOUNT_BALANCE: 'ACCOUNT_BALANCE',
  SET_ACCOUNT_ADDRESS: 'SET_ACCOUNT_ADDRESS',

  SET_SEND_TOKENS_LIST: 'SET_SEND_TOKENS_LIST',
  GET_SEND_TOKENS_LIST: 'GET_SEND_TOKENS_LIST',

  SET_RECEIVE_TOKENS_LIST: 'SET_RECEIVE_TOKENS_LIST',
  GET_RECEIVE_TOKENS_LIST: 'GET_RECEIVE_TOKENS_LIST',

  SET_INIT_SEND_TOKEN_SWAP: 'SET_INIT_SEND_TOKEN_SWAP',
  SET_INIT_RECEIVE_FIRST_TOKEN_SWAP: 'SET_INIT_RECEIVE_FIRST_TOKEN_SWAP',
  SET_INIT_SEND_MULTISWAP_TOKEN: 'SET_INIT_SEND_MULTISWAP_TOKEN',
  SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST: 'SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST',
  SET_INIT_SEND_MULTISWAP_TOKENS_LIST_LOADING: 'SET_INIT_SEND_MULTISWAP_TOKENS_LIST_LOADING',
  SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING: 'SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_LOADING',

  SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_OVERWRITE:
    'SET_INIT_RECEIVE_MULTISWAP_TOKENS_LIST_OVERWRITE',

  GET_INIT_USD_CURRENCY_TOKEN_AMOUNT: 'GET_INIT_USD_CURRENCY_TOKEN_AMOUNT',
  SET_INIT_USD_CURRENCY_TOKEN_AMOUNT: 'SET_INIT_USD_CURRENCY_TOKEN_AMOUNT',

  SET_ACCOUNT_LOADER: 'SET_ACCOUNT_LOADER',
  SET_TWITTER_DATA: 'SET_TWITTER_DATA',
  GET_TWEETS_DATA: 'GET_TWEETS_DATA',
  GET_HEADER_TITLES: 'GET_HEADER_TITLES',
  SET_CURRENT_ROUTE_TITLE: 'SET_CURRENT_ROUTE_TITLE',
  //non-actual
  GET_THEME: 'GET_THEME',
  GET_WEB3_OBJECT: 'GET_WEB3_OBJECT',
  //eth2.0 protocol
  GET_ETH2_STAKE_DATA: 'GET_ETH2_STAKE_DATA',
  GET_ETH2_STAKE_TOTAL: 'GET_ETH2_STAKE_TOTAL',
  //sushiStake LP toke (SLP) protocol
  GET_SLP_STAKE_DATA: 'GET_SLP_STAKE_DATA',
  GET_SLP_STAKE_TOTAL: 'GET_SLP_STAKE_TOTAL',
  // nftData
  SET_NFT_DATA: 'SET_NFT_DATA',
  GET_NFT_DATA: 'GET_NFT_DATA',
  INITIAL_NFT_DATA: 'INITIAL_NFT_DATA',
  //YearnFinance protocol
  SET_YFI_TOKEN_DATA: 'SET_YFI_TOKEN_DATA',
  GET_YFI_TOKEN_DATA: 'GET_YFI_TOKEN_DATA',
  GET_YFI_TOKEN_TOTAL: 'GET_YFI_TOKEN_TOTAL',
  SET_YTOKEN_DATA: 'SET_YTOKEN_DATA',
  GET_YTOKEN_DATA: 'GET_YTOKEN_DATA',
  GET_YTOKEN_TOTAL: 'GET_YTOKEN_TOTAL',

  //balancerv2LP
  SET_BALANCER_LP: 'SET_BALANCER_LP',
  GET_BALANCER_LP: 'GET_BALANCER_LP',
  GET_BALANCER_LP_TOT: 'GET_BALANCER_LP_TOT',

  //uniswapV2
  SET_UNISWAPV2_LP: 'SET_UNISWAPV2_LP',
  GET_UNISWAPV2_LP: 'GET_UNISWAPV2_LP',

  //uniswapv2Stake
  SET_UNISWAPV2_STAKE: 'SET_UNISWAPV2_STAKE',
  GET_UNISWAPV2_STAKE: 'GET_UNISWAPV2_STAKE',
  GET_UNISWAPV2_STAKE_TOTAL: 'GET_UNISWAPV2_STAKE_TOTAL',

  //Curve(cvx)Token
  SET_CRV_TOKEN_DATA: 'SET_CRV_TOKEN_DATA',
  GET_CRV_TOKEN_DATA: 'GET_CRV_TOKEN_DATA',
  GET_CRV_TOKEN_TOTAL: 'GET_CRV_TOKEN_TOTAL',

  //LiquityStaked
  SET_LIQUITY_STAKE_AMOUNT: 'SET_LIQUITY_STAKE_AMOUNT',

  //synthetix
  SET_SNX_COLLATERAL_DATA: 'SET_SNX_COLLATERAL_DATA',
  SET_SNX_TOTAL: 'SET_SNX_TOTAL',
  SET_SNX_TOKEN_DATA: 'SET_SNX_TOKEN_DATA',
  SET_SNX_TOKEN_TOTAL: 'SET_SNX_TOKEN_TOTAL',

  //PickleDill
  SET_PICKLE_STAKE: 'SET_PICKLE_STAKE',
  GET_PICKLE_STAKE: 'GET_PICKLE_STAKE',

  SET_PICKLE_STAKE_TOTAL: '  SET_PICKLE_STAKE_TOTAL',

  GET_PICKLE_DILL: 'GET_PICKLE_DILL',
  SET_PICKLE_DILL: 'SET_PICKLE_DILL',

  //Curve(crv) staking and claimable
  SET_CRV_STKCLM_DATA: 'SET_CRV_STKCLM_DATA',
  GET_CRV_STKCLM_DATA: 'GET_CRV_STKCLM_DATA',
  GET_CRV_STKCLM_TOTAL: 'GET_CRV_STKCLM_TOTAL',

  //convexStake
  SET_CONVEX_STAKE_DATA: 'SET_CONVEX_STAKE_DATA',
  SET_CONVEX_STAKE_TOTAL: 'SET_CONVEX_STAKE_TOTAL',
  SET_CONVEX_STAKE_TOKEN_IMAGE: 'SET_CONVEX_STAKE_TOKEN_IMAGE',

  //curveLpToken
  GET_CRV_LP_TOKEN_IMAGES: 'GET_CRV_LP_TOKEN_IMAGES',
  SET_CURVE_LP_TOKEN_DATA: 'SET_CURVE_LP_TOKEN_DATA',
  SET_CURVE_LP_TOKEN_TOTAL: 'SET_CURVE_LP_TOKEN_TOTAL',

  //AAVE
  SET_AAVE_STAKING_DATA: 'SET_AAVE_STAKING_DATA',
  SET_AAVE_STAKING_TOTAL: 'SET_AAVE_STAKING_TOTAL',

  //Liquity(LQTY) token data
  SET_LQTY_TOKEN_DATA: 'SET_LQTY_TOKEN_DATA',
  GET_LQTY_TOKEN_DATA: 'GET_LQTY_TOKEN_DATA',
  GET_LQTY_TOKEN_TOTAL: 'GET_LQTY_TOKEN_TOTAL',

  //creamIronBank
  CREAM_IRON_BANK_TOTAL: 'CREAM_IRON_BANK_TOTAL',

  //snowSwan
  SET_SNOW_SWAN_DATA: 'SET_SNOW_SWAN_DATA',

  //cream
  SET_CREAM_DATA: 'SET_CREAM_DATA',
  SET_CREAM_TOTAL: 'SET_CREAM_TOTAL',

  //Olympus(OHM) token data
  SET_OHM_TOKEN_DATA: 'SET_OHM_TOKEN_DATA',
  GET_OHM_TOKEN_DATA: 'GET_OHM_TOKEN_DATA',
  GET_OHM_TOKEN_TOTAL: 'GET_OHM_TOKEN_TOTAL',

  //ethApi
  SET_ETH_API: 'SET_ETH_API',
  GET_ETH_API: 'GET_ETH_API',

  //mStable
  SET_MSTABLE_SAVINGS: 'SET_MSTABLE_SAVINGS',
  GET_MSTABLE_SAVINGS: 'GET_MSTABLE_SAVINGS',
  SET_MSTABLE_FARM: 'SET_MSTABLE_FARM',
  GET_MSTABLE_FARM: 'GET_MSTABLE_FARM',
  SET_MSTABLE_POOL: 'SET_MSTABLE_POOL',
  GET_MSTABLE_POOL: 'GET_MSTABLE_POOL',

  //sushiSwap token data
  SET_SUSHILP_DATA: 'SET_SUSHILP_DATA',
  GET_SUSHILP_DATA: 'GET_SUSHILP_DATA',
  GET_SUSHILP_TOTAL: 'GET_SUSHILP_TOTAL',

  //get initial sidebar values from LocalStorage
  GET_SELECTED_ADDRESS: 'GET_SELECTED_ADDRESS',
  GET_SELECTED_NAME: 'GET_SELECTED_NAME',
  GET_WALLETS_LIST: 'GET_WALLETS_LIST',

  //alchemix
  GET_ALCHEMIX_VAULT: 'GET_ALCHEMIX_VAULT',
  SET_ALCHEMIX_VAULT: 'SET_ALCHEMIX_VAULT',

  //Compound token data
  SET_COMP_TOKEN_DATA: 'SET_COMP_TOKEN_DATA',
  GET_COMP_TOKEN_DATA: 'GET_COMP_TOKEN_DATA',
  GET_COMP_TOKEN_TOTAL: 'GET_COMP_TOKEN_TOTAL',
  GET_COMP_CLAIM_DATA: 'GET_COMP_CLAIM_DATA',

  //gas price
  SET_GAS_DATA: 'SET_GAS_DATA',
  SET_SELECTED_GAS_PRICE: 'SET_SELECTED_GAS_PRICE',
  SET_PROPOSE_GAS_PRICE: 'SET_PROPOSE_GAS_PRICE',

  //curveLpToken data
  SET_CRVLP_TOKEN_DATA: 'SET_CRVLP_TOKEN_DATA',
  GET_CRVLP_TOKEN_DATA: 'GET_CRVLP_TOKEN_DATA',
  GET_CRVLP_TOKEN_TOTAL: 'GET_CRVLP_TOKEN_TOTAL',

  //Aave staking
  SET_AAVE_TOKEN_DATA: 'SET_AAVE_TOKEN_DATA',
  GET_AAVE_TOKEN_DATA: 'GET_AAVE_TOKEN_DATA',
  GET_AAVE_TOKEN_TOTAL: 'GET_AAVE_TOKEN_TOTAL',
  //synthetix token
  SET_SNX_COLL_DATA: 'SET_SNX_COLL_DATA',
  SET_SNX_TOKENS_DATA: 'SET_SNX_TOKENS_DATA',
  GET_SNX_COLL_DATA: 'GET_SNX_COLL_DATA',
  GET_SNX_COLL_TOTAL: 'GET_SNX_COLL_TOTAL',
  GET_SNX_TOKEN_DATA: 'GET_SNX_TOKEN_DATA',
  GET_SNX_TOKEN_TOTAL: 'GET_SNX_TOKEN_TOTAL',

  //convex staking
  SET_CVX_TOKEN_DATA: 'SET_CVX_TOKEN_DATA',
  GET_CVX_TOKEN_DATA: 'GET_CVX_TOKEN_DATA',
  GET_CVX_TOKEN_TOTAL: 'GET_CVX_TOKEN_TOTAL',

  //snowswap token
  SET_SNOW_SWAP_DATA: 'SET_SNOW_SWAP_DATA',
  GET_SNOW_SWAP_DATA: 'GET_SNOW_SWAP_DATA',
  GET_SNOW_SWAP_TOTAL: 'GET_SNOW_SWAP_TOTAL',

  //CreamIronBank
  SET_CREAM_IRON_DATA: 'SET_CREAM_IRON_DATA',
  GET_CREAM_IRON_DATA: 'GET_CREAM_IRON_DATA',
  GET_CREAM_IRON_TOTAL: 'GET_CREAM_IRON_TOTAL',

  //for preloading
  SET_SHUSHI_LP_LOADING: 'SET_SHUSHI_LP_LOADING',
  SET_UNISWAPV2_PROTOCOL_LOADING: 'SET_UNISWAPV2_PROTOCOL_LOADING',
  SET_CRV_LP_LOADING: 'SET_CRV_LP_LOADING',
  SET_SNOW_SWAP_LOADING: 'SET_SNOW_SWAP_LOADING',
  SET_LQTY_TOKEN_LOADING: 'SET_LQTY_TOKEN_LOADING',
  SET_BALANCER_PROTOCOL_LOADING: 'SET_BALANCER_PROTOCOL_LOADING',
  //Loading process for Vaults section
  SET_OHM_LOADING: 'SET_OHM_LOADING',
  SET_CRV_TOKEN_LOADING: 'SET_CRV_TOKEN_LOADING',
  SET_PICKLE_DILL_LOADING: 'SET_PICKLE_DILL_LOADING',
  SET_YFI_LOADING: 'SET_YFI_LOADING',
  SET_SNX_LOADING: 'SET_SNX_LOADING',
  //loading process for savings/loans section
  SET_COMP_LOADING: 'SET_COMP_LOADING',
  SET_ETH2_LOADING: 'SET_ETH2_LOADING',
  SET_CRV_STAKE_LOADING: 'SET_CRV_STAKE_LOADING',
  SET_AAVE_LOADING: 'SET_AAVE_LOADING',
  SET_CONVEX_LOADING: 'SET_CONVEX_LOADING',
  SET_CREAM_IRON_LOADING: 'SET_CREAM_IRON_LOADING',
  SET_SUSHI_STAKE_LOADING: 'SET_SUSHI_STAKE_LOADING',
  SET_UNISWAP_STAKE_LOADING: 'SET_UNISWAP_STAKE_LOADING',
};

//  tokenPage data
//  current token common data
export const GET_TOKEN_DATA_SAGA = 'GET_TOKEN_DATA_SAGA';
export const GET_TOKEN_DATA = 'GET_TOKEN_DATA';
export const GET_TOKEN_DATA_SUCCESS = 'GET_TOKEN_DATA_SUCCESS';
export const GET_TOKEN_DATA_FAIL = 'GET_TOKEN_DATA_FAIL';

//  current token transactions
export const GET_TOKEN_TRANSACTIONS_SAGA = 'GET_TOKEN_TRANSACTIONS_SAGA';
export const GET_TOKEN_TRANSACTIONS = 'GET_TOKEN_TRANSACTIONS';
export const GET_TOKEN_TRANSACTIONS_SUCCESS = 'GET_TOKEN_TRANSACTIONS_SUCCESS';
export const GET_TOKEN_TRANSACTIONS_FAIL = 'GET_TOKEN_TRANSACTIONS_FAIL';

// current wallet data
export const GET_WALLET_DATA_SAGA = 'GET_WALLET_DATA_SAGA';
export const GET_WALLET_DATA = 'GET_WALLET_DATA';
export const GET_WALLET_DATA_SUCCESS = 'GET_WALLET_DATA_SUCCESS';
export const GET_WALLET_DATA_FAIL = 'GET_WALLET_DATA_FAIL';

//  current token price history
export const GET_TOKEN_PRICE_HISTORY_SAGA = 'GET_TOKEN_PRICE_HISTORY_SAGA';
export const GET_TOKEN_PRICE_HISTORY = 'GET_TOKEN_PRICE_HISTORY';
export const GET_TOKEN_PRICE_HISTORY_SUCCESS = 'GET_TOKEN_PRICE_HISTORY_SUCCESS';
export const GET_TOKEN_PRICE_HISTORY_FAIL = 'GET_TOKEN_PRICE_HISTORY_FAIL';
