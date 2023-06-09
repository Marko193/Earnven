import styled from 'styled-components';
import { Button, Box, Popover, ListItemText } from '@material-ui/core';

export const GasButton = styled(Button)`
  height: 40px;
  width: 70px;
  border-radius: 10px;
  font-weight: normal !important;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  background-color: ${(props) => (props.isLightTheme ? 'white' : '#10142D')};
  box-shadow: ${(props) =>
    props.isLightTheme ? 'none' : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};
`;

export const GasMenuPopover = styled(Popover)`
  @media (min-width: 1900px) {
    margin-left: 122px;
  }
`;

export const MenuPopoverBox = styled(Box)`
  width: 320px;

  border-radius: 10px;
  background-color: ${(props) => (props.isLightTheme ? 'rgba(255, 255, 255, 0.16)' : '#11152D')};
  box-shadow: ${(props) =>
    props.isLightTheme ? 'none' : 'inset 2px 2px 4px rgba(255, 255, 255, 0.1)'};

  @media (max-width: 1900px) {
    width: 250px;
  }
`;

export const MenuPopoverBoxTitle = styled.p`
  margin-top: 20px;
  margin-left: 13px;
  margin-bottom: 17px;
  font-family: 'Saira', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 25px;
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};

  @media (max-width: 910px) {
    margin-left: 7px;
  }
`;

export const MenuPopoverBoxNote = styled.div`
  margin-top: 30px;
  margin-left: 13px;
  color: #7b7c87;
  font-size: 14px;

  a {
    color: #7b7c87;
    text-decoration: none;
  }

  @media (max-width: 910px) {
    margin-left: 3px;
  }
`;

export const SidebarMobileGasItemsBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
  //background-color: blue;
`;

export const GasMenuItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 287px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isLightTheme
      ? props.selected
        ? 'white'
        : 'transparent'
      : props.selected
      ? '#1F265C'
      : 'transparent'};
  color: ${(props) => (props.isLightTheme ? 'black' : 'white')};
  font-family: 'Saira', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: ${(props) => (props.selected ? '500' : 'normal')};

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  :hover {
    cursor: pointer;
    background-color: ${(props) => (props.isLightTheme ? '#ffffff' : '#1F265C')};
    color: #4453ad;
    font-weight: 600;

    @media (max-width: 1280px) {
      border-radius: 10px;
    }
  }

  @media (max-width: 910px) {
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 3px;
    margin-right: 3px;
  }
`;

export const MobileSidebarSpeedValueParameter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 9px;
`;

export const MobileSidebarGasGweiLabel = styled.div`
  margin-right: 19px;
`;
