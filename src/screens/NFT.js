import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NftGroup from '../components/Nft/NftGroup';
import Page from '../components/Page';

export default function NFT() {
  const { address } = useParams();
  const [Account, setAccount] = useState('0x0');
  const [data, setdata] = useState(null);

  useEffect(() => {
    async function getData() {
      const account = address;
      setAccount(account);
      console.log(Account);
      await axios
        .get(
          `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${account}&startblock=0&endblock=999999999&sort=asc&apikey=CISZAVU4237H8CFPFCFWEA25HHBI3QKB8W`,
          {},
          {}
        )
        .then(async (response) => {
          const b = {};
          const res = response.data.result;
          console.log(res);
          for (const i in res) {
            if (b[res[i].tokenName] === undefined) {
              b[res[i].tokenName] = {};
              b[res[i].tokenName].tokens = [];
              b[res[i].tokenName].txHash = [];
              if (res[i].from.toLowerCase() === account.toLowerCase()) {
                b[res[i].tokenName].qtty = -1;
              } else {
                b[res[i].tokenName].qtty = 1;
                b[res[i].tokenName].tokens.push(res[i].tokenID);
                b[res[i].tokenName].txHash.push(res[i].hash);
              }
              b[res[i].tokenName].name = res[i].tokenName;
              b[res[i].tokenName].address = res[i].contractAddress;
            } else if (res[i].from.toLowerCase() === account.toLowerCase()) {
              b[res[i].tokenName].qtty -= 1;
              const index = b[res[i].tokenName].tokens.indexOf(res[i].tokenID);
              if (index > -1) {
                b[res[i].tokenName].tokens.splice(index, 1);
                b[res[i].tokenName].txHash.splice(index, 1);
              }
            } else {
              b[res[i].tokenName].qtty += 1;
              b[res[i].tokenName].tokens.push(res[i].tokenID);
              b[res[i].tokenName].txHash.push(res[i].hash);
            }
          }
          // console.log("final data:::", Object.values(b).filter((object) => object.tokens.length > 0))
          // setdata(Object.values(b).filter((object) => object.tokens.length > 0));

          const temp = Object.values(b);
          console.log('value of all nfts', temp);
          const finalObject = [];
          for (const i in temp) {
            if (temp[i].tokens.length > 0) {
              finalObject.push(temp[i]);
            }
          }
          setdata(finalObject);

          /* for (let i in temp) {
                        if (temp[i].tokens.length > 0) {
                            for (let j in temp[i].tokens) {
                                let tempTokenObject = {}
                                tempTokenObject.tokenID = temp[i].tokens[j]
                                tempTokenObject.contractAddress = temp[i].address
                                tempTokenObject.txHash = temp[i].txHash[j]
                                allTokens.push(tempTokenObject)
                            }
                        }
                    }

                    console.log("all nft tokens",allTokens)
                    setdata(allTokens); */
        });
    }

    getData();
  }, [Account, address]);

  return (
    <Page title="Nft">
      <Container>
        {/* <Typography variant="h2" sx={{ mb: 2 }}>
                    NFT
                </Typography> */}

        {data === null ? <div>Loading</div> : <NftGroup nftData={data} />}
      </Container>
    </Page>
  );

  /*  return (
         <Page title="Nft">
             <Container>
                 {data === null ? <div>Loading</div> : <NftList nftData={data} />}
             </Container>
         </Page>
     ); */
}
