import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "../NeedsNServices"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `div-${index}`
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="span"
            onClick={event => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom:"20px",
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height: '72%',
        maxHeight: '72%'
    },
    tabPage: {
        overflow: 'auto',
        height: "88%",
        paddingRight: "20px",
        paddingLeft: "20px"
    }
}));

export default function NavTabs({ currUser, setCurrUser }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                >
                    <LinkTab label="Needs" {...a11yProps(0)} />
                    <LinkTab label="Offers" {...a11yProps(1)} />
                    <LinkTab label="Reviews" {...a11yProps(2)} />

                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.tabPage}>
                <List category="needs" list={currUser.needs} currUser={currUser} setCurrUser={setCurrUser} />
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabPage}>
                <List category="offers" list={currUser.offers} currUser={currUser} setCurrUser={setCurrUser} />
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.tabPage}>
                Coming soon!!!
            </TabPanel>
        </div>
    );
}
