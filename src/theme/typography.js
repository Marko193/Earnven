// ----------------------------------------------------------------------

function pxToRem(value) {
  return `${value / 16}rem`;
}

function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:960px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1280px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const FONT_PRIMARY = 'Saira, sans-serif';
// fontFamily: 'Saira, sans-serif',
const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: pxToRem(40),
    ...responsiveFontSizes({ sm: 52, md: 58, lg: 64 }),
  },
  h2: {
    fontWeight: 700,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
    ...responsiveFontSizes({ sm: 40, md: 44, lg: 48 }),
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 30, lg: 32 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 20, md: 24, lg: 24 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 700,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    ...responsiveFontSizes({ sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'capitalize',
  },
  primaryFont: {
    fontSize: pxToRem(14),
  },
  primaryFont1: {
    fontWeight: 500,
    fontSize: pxToRem(20),
  },
  myWallet_font: {
    fontWeight: 600,
    fontSize: pxToRem(14),
  },
  myWallet_font_light: {
    fontSize: pxToRem(10),
  },
  fontSize: pxToRem(10),
  myWallet_font_watchlist: {
    fontWeight: 600,
    fontSize: pxToRem(10),
  },
  popupTitle: {
    fontSize: pxToRem(26),
  },
  myWallet_font_address: {
    fontSize: pxToRem(14),
  },
  WaltchList_font_address: {
    fontSize: pxToRem(10),
  },
  watchlist_font_balance: {
    fontSize: pxToRem(10),
    fontWeight: 600,
  },
  NFT_name: {
    fontSize: pxToRem(20),
    fontWeight: 500,
  },
  NFT_networth: {
    fontSize: pxToRem(40),
    fontWeight: 600,
  },
  NFT_networth_text: {
    fontSize: pxToRem(10),
    fontWeight: 'normal',
  },
  NFT_Name_text: {
    fontSize: pxToRem(20),
    fontWeight: 600,
  },
  AboutBody: {
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  tranfer_title: {
    fontSize: pxToRem(30),
    fontWeight: 400,
    opacity: '0.5',
  },
  transferbody: {
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  transferbody_mobile: {
    fontSize: pxToRem(10),
    fontWeight: 400,
  },
};

export default typography;
