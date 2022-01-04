// import { experimentalStyled as styled } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';

export const RootStyle = styled.div`
  background: ${(props) =>
    props.isLightTheme
      ? `url(${require(`../../assets/images/lightDashboard.jpg`).default})`
      : `#0B0E1D`};
  @media (min-width: 1930px) {
    background: ${(props) =>
      props.isLightTheme
        ? `url(${require(`../../assets/images/lightDashboardBig.jpg`).default})`
        : `#0B0E1D`};
  }
`;

export const MainStyle = styled.div`
  display: flex;
  justify-content: center;

  height: 100vh;

  @media (max-width: 710px) {
    padding-top: 27px;
    padding-left: 15px;
    padding-right: 15px;
  }

  @media (min-width: 711px) {
    padding-right: 35px;
    padding-bottom: 20px;
    padding-left: 35px;
  }

  @media (min-width: 1280px) {
    //margin-top: 72px;
    //margin-left: 314px;
  }
`;

export const MainSubLayout = styled.div`
  width: 570px;
  margin-top: 72px;
  @media (max-width: 600px) {
    width: 345px;
  }
`;

export const MainSubLayoutTitle = styled.p`
  margin-bottom: 7px;
  font-size: 12px;
  color: ${(props) => (props.isLightTheme ? '#000000' : '#ffffff')};
  @media (max-width: 710px) {
    font-size: 16px;
    font-weight: bold;
  }
`;

export const MetaMaskBtn = styled(Button)`
  font-size: 16px;
  height: 60px;
  border-radius: 10px;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#10142D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : '  inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  color: ${(props) => (props.isLightTheme ? '#8F86FF' : '#8F86FF')};

  :hover {
    background-color: #e5e5e5;
  }
`;

export const WalletButtonsLayout = styled.div`
  display: grid;
  justify-self: center;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  margin-top: 30px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
  }
`;

export const WalletBtnConnect = styled(Button)`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  padding: 13px;
  height: 60px;
  width: 171px;
  font-size: 16px;
  background: #85868e;
  box-shadow: inset 0 5px 10px -6px rgba(51, 78, 131, 0.12);
  border-radius: 10px;
  border: none;
  //opacity: 0.5;

  div {
    color: #4e4a8e !important;
  }

  :hover {
    border: none;
    background-color: #e5e5e5;
  }

  @media (max-width: 710px) {
    height: 66px;
    width: 165px;
    font-size: 15px;
    //padding: 10px;
  }
`;

export const WalletBtnName = styled.span`
  display: flex;
  margin-right: auto;
`;

export const ComingSoonItem = styled.span`
  display: flex;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;

export const WalletBtnConnectImg = styled.img`
  width: 20px;
  height: 20px;
`;

export const EthereumAddressBlock = styled.div``;

export const EthereumAddressField = styled(TextField)`
  height: 60px;
  width: 461px;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#10142D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : '  inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  border: none !important;
  border-radius: 10px;

  :hover {
    border: none !important;
    background-color: #e5e5e5;
  }

  @media (max-width: 600px) {
    width: 250px;
  }
`;

export const SubmitEthereumAddressBtn = styled(Button)`
  height: 60px;
  width: 79px;
  background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#10142D')};
  box-shadow: ${(props) =>
    props.isLightTheme
      ? 'inset 0px 5px 10px -6px rgba(51, 78, 131, 0.12)'
      : '  inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
  border-radius: 10px;

  :hover {
    border: none;
    background-color: #e5e5e5;
  }
`;
