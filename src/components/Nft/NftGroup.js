import { Stack, Typography } from '@material-ui/core';
import NftList from './NftList'
import React from 'react';


export default function NftGroup({ nftData }) {

    return (
        <>
            {nftData.map((object) => (
                <Stack direction='column' spacing={0}>
                    <Typography variant='h5' sx={{mb:2,mt:4}}>{object.name}</Typography>
                    <NftList nftTokenIdList={object.tokens} contractAddress={object.address}/>
                </Stack>
            ))}
        </>
    );
}