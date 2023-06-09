/* eslint-disable */
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet-async';
import React, {forwardRef} from 'react';
// material
import {Box} from '@material-ui/core';

const Page = forwardRef(({children, title = '', ...other}, ref) => (
    <Box ref={ref} {...other} sx={{mt: 2}}>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {children}
    </Box>
));

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page;
