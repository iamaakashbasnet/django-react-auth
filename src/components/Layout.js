import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAuthenticated, loadUser } from './../actions/auth';
import { Container } from '@material-ui/core';
import Navbar from './Navbar';

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Navbar />
            <Container>{props.children}</Container>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    checkAuthenticated: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
};

export default connect(null, { checkAuthenticated, loadUser })(Layout);
