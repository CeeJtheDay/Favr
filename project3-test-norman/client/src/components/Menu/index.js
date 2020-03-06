import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui-icons/Home'
import Button from 'material-ui/Button'
import { Link, withRouter } from 'react-router-dom'
import ChatIcon from '@material-ui/icons/WhatsApp';
import Logo from "../../assets/images/Favr Logo.png";
// import { useTheme } from '@material-ui/core/styles';
// import Badge from 'material-ui/Badge'
// import queryString from 'query-string'
// import API from "../../utils/API-User"
// import axios from "axios"

const isActive = (history, path) => {
    if (history.location.pathname === path)
        return { color: '#bef67a' }
    else
        return { color: '#ffffff', }
}
const isPartActive = (history, path) => {
    if (history.location.pathname.includes(path))
        return { color: '#bef67a' }
    else
        return { color: '#ffffff' }
}

// const classes = {
//     navbar: {
//         marginBottom: "20px"
//     }
// }
const Menu = withRouter(({ history, currUser, setCurrUser }) => {

    // const theme = useTheme();

    const classes = {
        menu: {
            width: "full",
            backgroundColor: "#565656",
            border: "solid 1px #8693AB",
            // marginBottom: "10px"
            // position:'fixed',
            // top:0

        },
        logo: {
            width: "50px",
            height: "auto",
            // opacity: 1.0
        }
    }

    return (
        <AppBar style={classes.menu}>
            <Toolbar>
                <Typography type="title" color="inherit">
                    <img alt="logo" src={Logo} style={classes.logo} />
                </Typography>
                <div>
                    {history.location.pathname.includes("/user") || history.location.pathname.includes("/barter") || history.location.pathname.includes("/profile") ? (
                        null
                        // <Link to={`/user/?id=${currUser.id}`}>
                        //     <IconButton aria-label="Home" style={isPartActive(history, "/user")}>
                        //         <HomeIcon />
                        //     </IconButton>
                        // </Link>
                    ) : (
                            <Link to="/">
                                <IconButton aria-label="Home" style={isActive(history, "/")}>
                                    <HomeIcon />
                                </IconButton>
                            </Link>)}
                    {/* {history.location.pathname.includes("/barter") && (
                        <Link to={`/barter/?id=${currUser.id}`}>
                            <Button style={isPartActive(history, "/cart")}>
                                Message
                                    <ChatIcon />
                            </Button>
                        </Link>
                    )}
                    {history.location.pathname.includes("/user") && (
                        <Link to={`/barter/?id=${currUser.id}`}>
                            <Button style={isPartActive(history, "/cart")}>
                                Message
                                    <ChatIcon />
                            </Button>
                        </Link>
                    )}
                    {history.location.pathname.includes("/profile") && (
                        <Link to={`/barter/?id=${currUser.id}`}>
                            <Button style={isPartActive(history, "/cart")}>
                                Message
                                    <ChatIcon />
                            </Button>
                        </Link>
                    )} */}
                </div>
                <div style={{ 'position': 'absolute', 'right': '10px' }}>
                    <span style={{ 'float': 'right' }}>
                        {
                            history.location.pathname === "/" || history.location.pathname === "/signup" || history.location.pathname === "/signin" ? (<span>
                                <Link to="/signup">
                                    <Button style={isActive(history, "/signup")}>Sign up</Button>
                                </Link>
                                <Link to="/signin">
                                    <Button style={isActive(history, "/signin")}>Sign In</Button>
                                </Link>
                            </span>) : (
                                    <Link to="/">
                                        <Button>Sign out</Button>
                                    </Link>
                                )
                        }
                    </span>
                </div>
            </Toolbar>
        </AppBar>
    )
})

export default Menu
