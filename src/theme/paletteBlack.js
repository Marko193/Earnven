import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

function createGradientHorizontal(color1, color2) {
  return `linear-gradient(to right, ${color1}, ${color2})`;
}

// SETUP COLORS
const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const PRIMARY = {
  lighter: '#f1e6fe',
  light: '#d5b4fd',
  main: '#BB86FC',
  dark: '#ab6afb',
  darker: '#811ff9',
  contrastText: '#fff',
};
const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};
const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};
const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};
const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};
const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};
// Colors used in side menu
const MENU = {
  light: '#012138', // background color for currently selected option
  text_color: '#ffffff', // text color of the side menu options
  primary: '#ffffff', // text color used for texts in menu
  background_sidemenu: createGradientHorizontal('#000101', '#020c13'), // background color for menu
  test: '#fa0000',
  backgorundColor_wallet: 'rgba(0, 0, 139)', // background color for the div of account photo, balance and user address
  account_font: '#ffffff', // front color for account user address
  account_balance: '#ffffff', // font color for account user balance
  accList_balance: '2px 2px 4px 0px #ffff9c inset', // background color for Watchlist hover
  backgorundColor_wallet_secondary: '#043c74', // white for front menu wallet
};

const BACKGROUND = {
  lighter: MENU.background_sidemenu,
  light: MENU.background_sidemenu,
  main: MENU.background_sidemenu,
  dark: MENU.background_sidemenu,
  darker: MENU.background_sidemenu,
  contrastText: MENU.background_sidemenu,
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
  background: createGradient(BACKGROUND.light, BACKGROUND.dark),
  custom: createGradientHorizontal('#3b2959', '#1d282f'),
  background_sidemenu: createGradientHorizontal('#000101', '#020c13'), // background color for side menu
};

// background: 'rgba(255, 255, 255, 0.16)',
// mixBlendMode: 'normal',
// boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
// backdropFilter: 'blur(35px)',
const paletteBlack = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  menu: { ...MENU },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  text: { primary: '#fcfcfc', secondary: '#fcfcfc', disabled: '#fcfcfc' },
  background: { paper: '#0B0E1D', default: '#0B0E1D', neutral: '#0B0E1D' },
  action: {
    active: GREY[600],
    hover: '#FFFFFF',
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default paletteBlack;