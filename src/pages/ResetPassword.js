import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';
import { Typography, TextField, Button, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ResetPassword = (props) => {
    const classes = useStyles();
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
    });

    const { email } = formData;

    const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        props.resetPassword(email);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to="/" />;
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleInput}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send Email
                    </Button>
                </form>
            </div>
        </Container>
    );
};

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
