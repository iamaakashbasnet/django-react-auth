import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Paper, Typography } from '@material-ui/core';

const Home = ({ isAuthenticated }) => {
    return (
        <Paper>
            <Box mt={5} p={3}>
                <Typography align="center" variant="h3">
                    <Box mt={3} fontWeight="fontWeightBold">
                        Welcome
                    </Box>
                </Typography>
                <Typography align="center" variant="h5">
                    {isAuthenticated ? (
                        <Box mt={5}>User Authenticated</Box>
                    ) : (
                        <Box mt={5}>User not Authenticated</Box>
                    )}
                </Typography>
            </Box>
        </Paper>
    );
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
