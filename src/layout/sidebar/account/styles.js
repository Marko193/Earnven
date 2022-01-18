import styled, { css } from 'styled-components';
import { experimentalStyled as MUIStyled } from '@material-ui/core/styles';
import { Avatar, Box, List, ListItem, Typography, ListItemText } from '@material-ui/core';
import { VscAdd } from 'react-icons/vsc';
import { AccountBalanceWallet } from '@material-ui/icons';

export const AccountLayout = styled.div``;

export const AccountStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-top: 28px;
  margin-right: 20px;
  @media (max-width: 1280px) {
    display: none;
  } ;
`;

const handleBackgroundColorBtn = (isLightTheme, isBlockActivated) => {
  switch (true) {
    case isBlockActivated && isLightTheme:
      return 'background: #FFFFFF29; backdrop-filter: blur(35px); box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);';
    case !isBlockActivated && isLightTheme:
      return 'background: white; box-shadow: 4px 6px 20px -5px rgba(51, 78, 131, 0.17);';
    case isBlockActivated && !isLightTheme:
      return 'background: #1F265C3D; backdrop-filter: blur(35px); box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);';
    default:
      return 'background: #1F265C3D; backdrop-filter: blur(35px); box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1);';
  }
};

export const WalletsListBlock = styled.div`
  display: flex;
  flex-direction: column;

  ${(props) => handleBackgroundColorBtn(props.isLightTheme, props.isBlockActivated)};

  border-radius: 10px;
  width: 186px;
  height: 74px;
`;

export const FirstWalletsListBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  //margin-top: 9px;
  margin-left: 20px;
`;

export const UserAvatar = styled(Avatar)`
  width: 21px;
  height: 21px;
  margin-right: 5px;
`;

export const WalletAddress = styled.p`
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-size: 14px;
`;

export const WalletArrow = styled.span`
  margin-left: auto;
  margin-top: 7px;
  margin-right: 20px;
`;

export const EnterAccountBlock = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: auto;
  margin-right: 20px;
  width: 169px;
  height: 38px;

  p {
    color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
    font-family: 'Saira', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
  }
`;

export const MyWalletsLabel = styled(Box)`
  margin-left: 25px;

  margin-top: ${(props) => (props.allWalletsListMobile ? '17px' : '25px')};

  p {
    margin-bottom: -8px;
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#ffffff')};

    @media (max-width: 1280px) {
      margin-bottom: ${(props) => (props.allWalletsListMobile ? '-3px' : '-6px')};
    }
  }
`;

export const WalletsList = styled(List)`
  padding-top: 8px;
`;

export const WalletsListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  height: 60px;
  width: 291px;
  margin-left: 27px;
  padding-top: 12px;
  padding-left: 7px;

  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
  }

  @media (max-width: 1280px) {
    margin-left: ${(props) => (props.isMobileWalletsList ? '18px' : '27px')};
    width: ${(props) => (props.isMobileWalletsList ? '300px' : '291px')};
    height: ${(props) => (props.isMetamaskWallet ? '65px' : '60px')};
    padding-top: ${(props) => (props.isMobileWalletsList ? '0px' : '12px')};
  }
`;

const manageItemsButtons = css`
  display: flex;
  align-items: center;
  height: 60px;
  width: 291px;
  margin-left: 27px;

  padding-left: 7px;

  color: ${(props) => (props.isLightTheme ? '#1E1E20' : '#ffffff')};
  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C3D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter: ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')};
    border-radius: 10px;
  }

  @media (max-width: 1280px) {
    height: 40px;
  }
`;

export const AddNewWalletListItem = styled(ListItem)`
  ${manageItemsButtons};
  margin-top: 20px;
`;

export const ManageWalletsListItem = styled(ListItem)`
  ${manageItemsButtons}
`;
//dropdown wallets list styles

export const AddWalletIcon = styled(VscAdd)`
  margin-right: 15px;
  font-size: 10px;
  width: 14px;
  height: 14px;
  color: ${(props) => (props.isLightTheme ? '#828283' : '#ffffff')};
  opacity: 0.5;
`;

export const AccountWalletBalance = styled(AccountBalanceWallet)`
  margin-right: 15px;
  font-size: 10px;
  width: 14px;
  height: 14px;
  color: ${(props) => (props.isLightTheme ? '#828283' : '#ffffff')};
  opacity: 0.5;
`;

export const NewWalletLabel = styled(ListItemText)`
  margin-top: 2px;
  opacity: 0.5;
`;

export const WalletsListLayout = styled.div`
  width: 291px;
  @media (max-width: 1280px) {
    width: ${(props) => (props.isMetamaskWallet ? '294px' : '291px')};
  }
`;

export const WalletListItemAccountLogo = styled(Avatar)`
  width: 21px;
  height: 21px;

  @media (max-width: 1280px) {
    width: ${(props) => (props.isMetamaskWallet ? '46px' : '21px')};
    height: ${(props) => (props.isMetamaskWallet ? '46px' : '21px')};
    margin-top: ${(props) => (props.isMobileWalletsList ? '8px' : '0px')};
  }
`;

export const WalletListItemContent = styled.div`
  display: flex;
  align-items: center;
  margin-left: 27px;
  margin-top: -17px;

  @media (max-width: 1280px) {
    margin-top: ${(props) =>
      props.isMetamaskWallet && props.isMobileWalletsList ? '-30px' : '-15px'};
  }
  @media (min-width: 1280px) {
    margin-top: ${(props) => props.isMetamaskWallet && '-21px'};
  }
`;

export const WalletListItemAccountBalance = styled.div`
  //({ isLightTheme, isMetamaskWallet, isMobileWalletsList }) => ({
  font-size: ${(props) => (props.isMetamaskWallet ? '14px' : '10px')};
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  @media (max-width: 1280px) {
    margin-top: ${(props) =>
      props.isMetamaskWallet && props.isMobileWalletsList ? '-15px' : '0px'};
    margin-left: ${(props) =>
      props.isMetamaskWallet && props.isMobileWalletsList ? '24px' : '-2px'};
  }
`;

export const MetamaskLabel = styled.span`
  margin-left: 27px;
  color: #4453ad;
  font-family: 'Saira', sans-serif;
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  text-align: center;

  @media (max-width: 1280px) {
    margin-top: ${(props) => props.isMobileWalletsList && props.isMetamaskWallet && '-50px'};
    margin-left: ${(props) => props.isMobileWalletsList && props.isMetamaskWallet && '53px'};
  }
`;

export const WalletListItemGreenDot = styled.img`
  display: flex;
  float: right;
  margin-top: 5px;
  margin-left: 10px;
`;

export const WalletActionsLayout = styled.div`
  width: 306px;
  height: 197px;

  @media (max-width: 1280px) {
    height: 222px;
  }
`;

export const WalletActionsList = styled.ul`
  margin-top: 2px;

  @media (max-width: 1280px) {
    margin-top: 6px;
  }
`;

export const WalletActionsListItem = styled.li`
  display: flex;
  width: 276px;
  height: 40px;
  margin-left: 15px;
  padding: 0;

  @media (max-width: 1280px) {
     margin-bottom: 5px;
    height: 50px;

  }


  :hover {
    p{
      color: #4453ad;
      font-weight: 600;
    }
    background-color: ${(props) => (props.isLightTheme ? '#FFFFFF' : '#1F265C3D')};
    box-shadow: ${(props) =>
      props.isLightTheme
        ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
        : 'box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
    backdrop-filter:  ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')});
    border-radius: 10px;
    cursor: pointer;
  }
`;

export const WalletActionsListItemLabel = styled.p`
  margin-top: ${(props) => (props.isDisconnectLabel ? '21px' : '14px')};
  @media (max-width: 1280px) {
    margin-top: ${(props) => props.isDisconnectLabel && '22px'};
    font-family: 'Saira', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    text-align: left;
  }

  display: flex;
  width: 276px;
  margin-left: 25px;
  color: ${(props) => (props.isLightTheme ? '#000000' : '#FFFFFF')};
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;

  :hover {
    color: #4453ad;
    font-weight: 600;
  }
`;

export const DisconnectWalletActionsListItem = styled.li`
  display: flex;
  width: 305px;
  height: 60px;
  padding: 0;
  margin-top: 17px;

  @media (max-width:1280px){
    margin-top: 0;
  }
  
  background-color: ${(props) => (props.isLightTheme ? '#E5E5E5' : '#1F265C3D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : 'box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  backdrop-filter:  ${(props) => (props.isLightTheme ? 'none' : 'blur(35px)')});
  border-radius: 10px;
  cursor: pointer;

  :hover {
    p{
      color: #4453ad;
      font-weight: 600;
    }
  }
`;

export const DotIconBlock = styled.div`
  margin-left: auto;
  margin-top: -12px;
  margin-bottom: 3px;
  margin-right: -7px;
  width: 16px;
  height: 16px;
`;