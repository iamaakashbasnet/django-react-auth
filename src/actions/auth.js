import axios from 'axios';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    LOGOUT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
} from './types';

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const res = await axios.post('/auth/jwt/verify', body, config);
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAILED,
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAILED,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAILED,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`,
                Accept: 'application/json',
            },
        };

        try {
            const res = await axios.get('/auth/users/me/', config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data,
            });
            console.log(res.data);
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAILED,
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAILED,
        });
    }
};

export const login = (username, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post('/auth/jwt/create/', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAILED,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};

export const resetPassword = (email) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post('/auth/users/reset_password/', body, config);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
        });
    }
};

export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async (
    dispatch,
) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
        });
    }
};

export const signup = ({ username, email, password, re_password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ username, email, password, re_password });

    try {
        const res = await axios.post(`/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
        });
    }
};

export const verify = (uid, token) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ uid, token });

    try {
        const res = await axios.post(`/auth/users/activation/`, body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL,
        });
    }
};
