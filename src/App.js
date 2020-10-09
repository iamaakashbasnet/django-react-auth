import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activate from './pages/Activate';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import Error from './pages/Error';

const App = () => {
    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                'Sen',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Helvetica Neue',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
                'Segoe UI Symbol',
            ].join(','),
        },
    });

    return (
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <Layout>
                        <CssBaseline />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/signup" exact component={Signup} />
                            <Route path="/activate/:uid/:token" exact component={Activate} />
                            <Route path="/reset_password" exact component={ResetPassword} />
                            <Route
                                path="/password/reset/confirm/:uid/:token"
                                exact
                                component={ResetPasswordConfirm}
                            />
                            <Route path="/" component={Error} />
                        </Switch>
                    </Layout>
                </ThemeProvider>
            </Router>
        </Provider>
    );
};

export default App;
