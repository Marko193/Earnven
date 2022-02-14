import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonsLayout, CutAddressName } from './styles';
import { DisconnectWarnLabel, Address, Button_Rename, Button_Rename_Disconnect } from './styles';

export const DisconnectPopup = ({ address, name, setOpenPopup, isLightTheme }) => {
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);

  const disconnect = (address) => {
    let result = localStorage.getItem('wallets');
    result = JSON.parse(result);
    let flag_variable = false;
    let selected = localStorage.getItem('selected-account');
    let selected_name = localStorage.getItem('selected-name');
    let mywallet = localStorage.getItem('mywallet');
    mywallet = JSON.parse(mywallet);
    if (selected == address) {
      setflag(true);
      flag_variable = true;
      mywallet &&
        mywallet.map((option) => {
          selected = option.address;
          selected_name = option.name;
        });
    }
    localStorage.setItem('selected-account', selected);
    localStorage.setItem('selected-name', selected_name);
    let output = result.filter((option) => {
      return option.address !== address;
    });
    if (output.length > 0) {
      localStorage.setItem('wallets', JSON.stringify(output));
    } else {
      localStorage.removeItem('mywallet');
      localStorage.setItem('selected-name', 'null');
      localStorage.setItem('selected-address', 'null');
    }
    localStorage.setItem('wallets', JSON.stringify(output));
    flag_variable == true
      ? navigate(`/app/connect-wallet`, { replace: true })
      : navigate(`/${address}${localStorage.getItem('setnavigation')}/`, { replace: true });
  };

  return (
    <div>
      <DisconnectWarnLabel isLightTheme={isLightTheme}>
        Are you sure you want to disconnect ?
      </DisconnectWarnLabel>

      <CutAddressName isLightTheme={isLightTheme}>{name === 'null' ? '' : name}</CutAddressName>

      <Address style={{ flexGrow: 1 }} isLightTheme={isLightTheme}>
        {address}
      </Address>

      <ButtonsLayout>
        <Button_Rename onClick={() => setOpenPopup(false)} isLightTheme={isLightTheme}>
          <p> Cancel </p>
        </Button_Rename>

        <Button_Rename_Disconnect
          isLightTheme={isLightTheme}
          onClick={() => {
            disconnect(address);
            setOpenPopup(false);
          }}>
          <p> Disconnect </p>
        </Button_Rename_Disconnect>
      </ButtonsLayout>
    </div>
  );
};