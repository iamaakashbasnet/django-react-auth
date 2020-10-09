import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import { Box, Button, Typography } from '@material-ui/core';

const Activate = (props) => {
    const [verified, setVerified] = useState(false);

    const verifyAccount = (e) => {
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.verify(uid, token);
        setVerified(true);
    };

    if (verified) return <Redirect to="/" />;
    return (
        <>
            <Typography align="center" variant="h4">
                <Box fontWeight="fontWeightBold" mt={4}>
                    Verify your Account
                </Box>
            </Typography>
            <Typography align="center">
                <small>Click the button below to verify</small>
                <br />
                <Button onClick={verifyAccount} type="button" variant="outlined">
                    Verify
                </Button>
            </Typography>
        </>
    );
};

Activate.propTypes = {
    match: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired,
};

export default connect(null, { verify })(Activate);
