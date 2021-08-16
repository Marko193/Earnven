
import { Box, Typography, Grid, Button, Stack, TextField } from "@material-ui/core";
import metamask from '../assets/icons/metamask.svg';
import walletConnectLogo from '../assets/icons/walletconnect-logo.svg'
import trustWalletLogo from '../assets/icons/TWT.svg'
import fortmaticLogo from '../assets/icons/fortmatic.png'
import coinbaseWalletLogo from '../assets/icons/coinbase-wallet.png'
import torusWalletLogo from '../assets/icons/torus.png';
import portisWalletLogo from '../assets/icons/portisLogo.png'
import Web3 from "web3";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import Portis from '@portis/web3';
import Fortmatic from 'fortmatic';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from "@toruslabs/torus-embed";

export default function ConnectWallet() {
    const navigate = useNavigate();
    const [address, setstate] = useState('')
    const [errorMsg, seterrorMsg] = useState(false)

    const loadWalletConnect = async() => {
        const provider = new WalletConnectProvider({
            infuraId: "e6669739aaca42608ef4c5d8a9de0d4d",
          });

        await provider.enable();
        const web3 = new Web3(provider);
        window.web3 = web3;
        const accounts = await window.web3.eth.getAccounts();
        routeToDashboard(accounts[0], 'metamask');
    }

    const loadTorus = async() => {
        const torus = new Torus();
        await torus.init();
        await torus.login(); // await torus.ethereum.enable()
        const web3 = new Web3(torus.provider);
        window.web3 = web3;
        const accounts = await window.web3.eth.getAccounts();
        routeToDashboard(accounts[0], 'metamask');
    }

    const loadPortis = async() => {
        const portis = new Portis('a48d17a8-f418-407e-951c-23ed15677980', 'mainnet');
        const web3 = new Web3(portis.provider);
        window.web3 = web3;
        const accounts = await window.web3.eth.getAccounts();
        routeToDashboard(accounts[0], 'metamask');
    }

    const loadFormatic = async() => {
        let fm = new Fortmatic('pk_live_9F53EBC750F34391');
        let web3 = new Web3(fm.getProvider());
        window.web3 = web3;
        const accounts = await window.web3.eth.getAccounts();
        routeToDashboard(accounts[0], 'metamask');
    }

    const loadMetamask = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            const accounts = await window.web3.eth.getAccounts();
            routeToDashboard(accounts[0], 'metamask');
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)

        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const routeToDashboard = async (account, provider) => {
        let existingWallet = localStorage.getItem('wallets');
        let parsedExistingWallet = JSON.parse(existingWallet)

        const newWallet = {
            address: account,
            provider: provider,

        }
        let newDetails = [];
        if (existingWallet === null) {
            newDetails.push(newWallet);
        }
        else {
            const isAddressPresent = parsedExistingWallet.findIndex((element) => element.address === account);
            if (isAddressPresent === -1) {
                newDetails.push(newWallet);
                newDetails = [...parsedExistingWallet, newWallet]
            }
            else{
                newDetails=[...parsedExistingWallet];
            }
        }
        localStorage.setItem('wallets', JSON.stringify(newDetails))


        localStorage.setItem('selected-account', account);
        navigate(`/${account}/dashboard`)
    }

    const addressUpdate = (e) => {

        setstate(e.target.value)
    }

    const trackAddress = () => {
        let validAddress = Web3.utils.isAddress(address);
        if (validAddress) {
            routeToDashboard(address, null);
            seterrorMsg(false)
        }
        else {
            seterrorMsg(true);
        }

    }

    const ErrorComponent = (props) => {
        const isWrongAddress = props.isWrongAddress;
        if (isWrongAddress) {
            return (<Typography
                variant='caption'
                sx={{ color: (theme) => (theme.palette.error.light) }} >
                Invalid Ethereum address
            </Typography>);
        }
        else {
            return null;
        }
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item >
                <Box sx={{ mt: 2 }}>
                    <Typography variant='h3' >Connect To Earnven</Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='caption'>Connect Wallet</Typography>
                        <Button variant='contained'
                            sx={{ backgroundColor: (theme) => (theme.palette.primary.dark) }}
                            onClick={loadMetamask}
                            disableElevation
                            fullWidth
                            startIcon={<img src={metamask} alt="" style={{ height: '14px', width: '14px' }}></img>} >
                            MetaMask
                        </Button>

                        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
                            <Button onClick={async(e)=>{try{await loadWalletConnect()}catch{}}} variant='outlined' startIcon={<img src={walletConnectLogo} alt="" style={{ height: '14px', width: '14px' }}></img>}>WalletConnect</Button>
                            <Button onClick={loadPortis} variant='outlined' startIcon={<img src={portisWalletLogo} alt="" style={{ height: '14px', width: '14px' }}></img>}>Portis</Button>
                            <Button variant='outlined' startIcon={<img src={coinbaseWalletLogo} alt="" style={{ height: '14px', width: '14px' }}></img>}>Coinbase Wallet</Button>
                        </Stack>
                        <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
                            <Button onClick={loadFormatic} variant='outlined' startIcon={<img src={fortmaticLogo} alt="" style={{ height: '14px', width: '14px' }}></img>}>Fortmatic</Button>
                            <Button onClick={loadTorus} variant='outlined' startIcon={<img src={torusWalletLogo} alt="" style={{ height: '14px', width: '14px' }}></img>}>Torus Wallet</Button>
                        </Stack>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant='caption'>Track any address</Typography>
                            <Stack direction='row' spacing={1}>
                                <TextField
                                    fullWidth
                                    placeholder="Track any ethereum address"
                                    id="fullWidth"
                                    onChange={addressUpdate}
                                />
                                <Button variant='contained' onClick={trackAddress}><FaArrowRight /></Button>
                            </Stack>
                            <ErrorComponent isWrongAddress={errorMsg}></ErrorComponent>
                        </Box>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    );
}