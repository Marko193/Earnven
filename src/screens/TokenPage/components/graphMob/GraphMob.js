import React from 'react';
import {
  Main,
  Net,
  Header,
  MainLinks,
  TokenLinks,
  NetWrapper,
  TokenPlatformLogo,
} from './styledComponents';
import sendIcon from '../../../../assets/icons/send-icon.svg';
import ethLogoBlue from '../../../../assets/icons/ethLogoBlue.png';
import etherScan from '../../../../assets/icons/etherScan-icon.svg';
import { TokenLink } from '../styledComponentsCommon';
import PortfolioPerf from '../../../../components/portfolioperf/portfolioperf';

const GraphMob = ({ isLightTheme, social }) => {
  return (
    <Main isLightTheme={isLightTheme}>
      <Header>
        <TokenPlatformLogo>
          <img alt={'Platform'} src={ethLogoBlue} />
          <p>{'ETH'}</p>
        </TokenPlatformLogo>
        {social ? (
          <TokenLinks>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
          </TokenLinks>
        ) : (
          <MainLinks>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'Send'} src={sendIcon} />
            </TokenLink>
            <TokenLink isLightTheme={isLightTheme}>
              <img alt={'EtherScan'} src={etherScan} />
            </TokenLink>
          </MainLinks>
        )}
      </Header>
      <NetWrapper>
        <Net>
          <img alt={'Net'} src={ethLogoBlue} />
          <p>{'MIR Token'}</p>
        </Net>
        <MainLinks>
          {social ? (
            <>
              <TokenLink isLightTheme={isLightTheme}>
                <img alt={'Send'} src={sendIcon} />
              </TokenLink>
              <TokenLink isLightTheme={isLightTheme}>
                <img alt={'EtherScan'} src={etherScan} />
              </TokenLink>
            </>
          ) : null}
        </MainLinks>
      </NetWrapper>
      <PortfolioPerf
        theme={isLightTheme}
        address={'0x00057ef157d01c28da3e545487a4d93f55b70842'}
        totalValue={'$58,888.00'}
        difValue={'+13,8%'}
        isTokenPage={true}
      />
    </Main>
  );
};

export default GraphMob;
