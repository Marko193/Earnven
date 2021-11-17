/***********************************************************************************
Purpose : Re-designed UI
Developed by : Sathyakrishna T
Version log:
----------------------------------------------------------------------------------
Version           Date                         Description
---------------------------------------------------------------------------------
1.0               4/nov/2021                   Initial Development
************************************************************************************/

import { experimentalStyled as styled } from '@material-ui/core/styles';
import accountLogo from '../../../../assets/icons/accountlogo.png';
import { createStyles } from '@material-ui/styles';
import { Collapse, List } from '@material-ui/core';
import {
  Box,
  Typography,
  Avatar,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Divider,
  ListItem,
  IconButton,
} from '@material-ui/core';
import React, { useState, useRef, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RiSettings5Line } from 'react-icons/ri';
import { VscAdd } from 'react-icons/vsc';
import './account.css';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md';
import AccountBalance from '../../../../components/AccountBalance_Menu';
import MenuPopover from '../../../../components/MenuPopover';
import { makeStyles } from '@material-ui/styles';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@material-ui/core/styles';
import { fontSize, fontStyle, fontWeight } from '@material-ui/system';
import rename_menu_icon from '../../../../assets/icons/rename_menu_icon.svg';
import copy_menu_icon from '../../../../assets/icons/copy_menu_icon.svg';
import copy_link_menu_icon from '../../../../assets/icons/copy_link_menu_icon.svg';
import disconnect_menu_icon from '../../../../assets/icons/disconnect_menu_icon.svg';
import dots_menu_icon from '../../../../assets/icons/3dots_menu_icon.svg';

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  paddingBottom: 0,
  cursor: 'pointer',
  // background: 'rgba(255, 255, 255, 0.16)',
  // mixBlendMode: 'normal',
  // boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
  // backdropFilter: 'blur(35px)',
}));

const List_Menu_Pop_UP = styled('div')(({ theme }) => ({
  width: '276px',
  height: '40px',
  display: 'flex',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.menu.account_balance,
    fontWeight: 600,
  },
  marginLeft: '15px',
  borderRadius: '10px',
  cursor: 'pointer',
}));

const Provider = styled('div')(({ theme }) => ({
  color: theme.palette.menu.account_balance,
  fontWeight: 600,
  fontsize: '4px',
}));

const useStyles = makeStyles(() =>
  createStyles({
    accountlLogo: {
      width: '1.5rem',
      height: '1.5rem',
      marginTop: '-3rem',
      marginRight: '-0.063rem',
    },
    accountBalance: {
      marginLeft: '-29px',
      textAlign: 'left',
      marginTop: '-4px',
    },
    accountAddress: {
      marginLeft: '0.02rem',
      marginTop: '-1.3rem',
    },
    myWallet: {
      marginLeft: '25px',
      marginTop: '25px',
    },
    list: {
      color: 'black',
      fontWeight: 400,
      fontSize: '14px',
      textDecoration: 'none',
    },
    menupopover: {
      marginLeft: '15rem',
      marginTop: '-2.2rem',
    },
    menu: {
      width: '306px',
    },
    icon: {
      marginLeft: '38px',
      marginTop: '12px',
      display: 'flex',
      width: '16px',
      height: '16px',
    },
    icon1: {
      marginLeft: '200px',
      marginTop: '-12px',
      width: '16px',
      height: '16px',
    },
    text: {
      marginLeft: '25px',
      marginTop: '14px',
      fontSize: '10px',
      display: 'flex',
    },
    hoverMenu: {
      '&:hover': {
        background: 'green',
        color: 'black',
        height: '56px',
      },
    },
  })
);

const CustomStyle = styled('a')(({ theme }) => ({
  color: 'black',
  fontWeight: 400,
  fontSize: '14px',
  textDecoration: 'none',
  '&:hover': {
    color: '#4453AD',
  },
}));

export default function Acc({ address, provider }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [account, setaccount] = useState(false);
  const [accountList, setaccountList] = useState([]);

  useEffect(() => {
    const result = localStorage.getItem('mywallet');
    setaccountList(JSON.parse(result));
  }, [account]);

  const showAccountPopover = () => {
    setaccount(true);
  };
  const hideAccountPopover = () => {
    setaccount(false);
  };

  const routeToConnectWallet = () => {
    navigate('/app/connect-wallet');
    setaccount(false);
  };

  const updateSelectedAccount = (address) => {
    localStorage.setItem('selected-account', address);
  };

  const routeToDashboard = () => {
    const address = localStorage.getItem('selected-account');
    navigate(`/${address}/dashboard/`, { replace: true });
  };

  function shortaddress(addy) {
    if (addy === '') {
      return addy;
    }
    if (addy) {
      const l = addy.length;
      const addynew = `${
        addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
      }...${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${addy[l - 2]}${
        addy[l - 1]
      }`;

      const shortAddress = `${
        addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
      }...`;
      return addynew;
    }
  }

  function shortaddress1(addy) {
    if (addy === '') {
      return addy;
    }
    const l = addy.length;
    const addynew = `${
      addy[0] + addy[1] + addy[2] + addy[3] + addy[4] + addy[5] + addy[6] + addy[7] + addy[8]
    }...${addy[l - 8]}${addy[l - 7]}${addy[l - 6]}${addy[l - 5]}${addy[l - 4]}${addy[l - 3]}${
      addy[l - 2]
    }${addy[l - 1]}`;
    return addynew;
  }

  return (
    <>
      <AccountStyle ref={anchorRef}>
        <Avatar className={classes.accountlLogo} src={accountLogo} alt="photoURL" />
        <Box sx={{ ml: 1 }}>
          <Stack
            onClick={() => {
              hideAccountPopover();
              updateSelectedAccount(address);
              routeToDashboard();
            }}
            direction="row">
            <Typography
              variant="myWallet_font"
              sx={{
                color: (theme) => theme.palette.menu.myWallet_font_light,
              }}
              className={classes.accountAddress}>
              {shortaddress(address)}
            </Typography>
          </Stack>
          <div className={classes.icon1} onClick={showAccountPopover}>
            <img src={dots_menu_icon} alt="no pic" />
          </div>
          <Typography
            onClick={() => {
              hideAccountPopover();
              updateSelectedAccount(address);
              routeToDashboard();
            }}
            className={classes.accountBalance}>
            <Provider>{provider}</Provider>
          </Typography>
        </Box>
      </AccountStyle>
      <MenuPopover
        className={classes.menupopover}
        open={account}
        onClose={hideAccountPopover}
        anchorEl={anchorRef.current}>
        <Box className={classes.menu}>
          <List disablePadding>
            <List_Menu_Pop_UP>
              <div className={classes.icon}>
                <img src={rename_menu_icon} alt="no pic" />
              </div>
              <div className={classes.text}>Rename Wallet</div>
            </List_Menu_Pop_UP>
          </List>
          {/* <List className="List" disablePadding>
            <List_Menu_Pop_UP>
              <div className={classes.icon}>
                <img src={copy_menu_icon} alt="no pic" />
              </div>
              <div className={classes.text}>Copy Address</div>
            </List_Menu_Pop_UP>
          </List> */}
          <List disablePadding>
            <List_Menu_Pop_UP>
              <div className={classes.icon}>
                <img src={copy_menu_icon} alt="no pic" />
              </div>
              <div className={classes.text}>Copy Address</div>
            </List_Menu_Pop_UP>
          </List>
          <List disablePadding>
            <List_Menu_Pop_UP>
              <div className={classes.icon}>
                <img src={copy_link_menu_icon} alt="no pic" />
              </div>
              <div className={classes.text}>Copy Link</div>
            </List_Menu_Pop_UP>
          </List>
          <List disablePadding>
            <List_Menu_Pop_UP>
              <div className={classes.icon}>
                <img src={disconnect_menu_icon} alt="no pic" />
              </div>
              <div className={classes.text}>Disconnect</div>
            </List_Menu_Pop_UP>
          </List>
        </Box>
      </MenuPopover>
    </>
  );
}

// secondaryAction={
//   <IconButton edge="end" aria-label="copy">
//     <CopyToClipboard text={option.address}>
//       <MdContentCopy style={{ color: 'green', px: '1px' }} />
//     </CopyToClipboard>
//   </IconButton>
// }
