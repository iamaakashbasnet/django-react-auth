import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './../actions/auth';
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    useMediaQuery,
    makeStyles,
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    VpnKeyOutlined as VpnKeyIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    HighlightOff as HighlightOffIcon,
    ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        color: '#fff',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    close: {
        textAlign: 'right',
        cursor: 'pointer',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const Navbar = ({ isAuthenticated, logout }) => {
    const classes = useStyles();
    const biggerScreen = useMediaQuery('(min-width: 700px)');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const GuestLinksDrawer = () => (
        <>
            <ListItem button component={RouterLink} to="/login">
                <ListItemIcon>
                    <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={RouterLink} to="/signup">
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="SignUp" />
            </ListItem>
        </>
    );

    const AuthLinksDrawer = () => (
        <>
            <ListItem button onClick={logout}>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItem>
        </>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    {biggerScreen ? (
                        ''
                    ) : (
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <RouterLink to="/" className={classes.title}>
                        <Typography variant="h6">Django React Auth</Typography>
                    </RouterLink>
                    {biggerScreen ? (
                        <>
                            {isAuthenticated ? (
                                <Button color="inherit" onClick={logout}>
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <Button color="inherit" component={RouterLink} to="/login">
                                        Login
                                    </Button>
                                    <Button color="inherit" component={RouterLink} to="/signup">
                                        Signup
                                    </Button>
                                </>
                            )}
                        </>
                    ) : (
                        ''
                    )}
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={handleDrawer} anchor="left">
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={handleDrawer}
                    onKeyDown={handleDrawer}
                >
                    <List>
                        <div className={classes.close}>
                            <HighlightOffIcon />
                        </div>
                        <Divider />
                        {isAuthenticated ? <AuthLinksDrawer /> : <GuestLinksDrawer />}
                    </List>
                </div>
            </Drawer>
        </>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
