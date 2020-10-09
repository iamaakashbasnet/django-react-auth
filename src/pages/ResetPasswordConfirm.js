import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPasswordConfirm } from '../actions/auth';
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

const ResetPasswordConfirm = (props) => {
    const classes = useStyles();
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: '',
    });

    const { new_password, re_new_password } = formData;

    const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();

        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.resetPasswordConfirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent) {
        return <Redirect to="/" />;
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Enter New Password
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="new_password"
                        label="New Password"
                        name="new_password"
                        autoComplete="new_password"
                        autoFocus
                        onChange={handleInput}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="re_new_password"
                        label="Confirm Password"
                        name="re_new_password"
                        autoComplete="re_new_password"
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
                        Reset Password
                    </Button>
                </form>
            </div>
        </Container>
    );
};

ResetPasswordConfirm.propTypes = {
    resetPasswordConfirm: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
};

export default connect(null, { resetPasswordConfirm })(ResetPasswordConfirm);
