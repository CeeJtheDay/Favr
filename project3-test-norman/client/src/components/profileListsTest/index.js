// import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import React, { useState, useEffect } from 'react'
import Paper from 'material-ui/Paper'
// import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
// import Avatar from 'material-ui/Avatar'
// import Typography from 'material-ui/Typography'
// import Person from 'material-ui-icons/Person'
// import Divider from 'material-ui/Divider'
// import { createMuiTheme } from 'material-ui/styles'
// import { useTheme } from '@material-ui/core/styles';
// import NSList from '../components/NeedsNServices/index'
import Grid from 'material-ui/Grid'
import VirtualizedList from '../ProfileList/scottList'
import ProfileHeader from '../ProfileHeader/index'
import Popover from "../Popover/index"
// import { StylesProvider } from '@material-ui/core/styles';
// import Navbar from "../components/Navbar/index"
// import listTabs from '../components/profileListsTest/index.js'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Paper style={classes.root1} elevation={4}>
          <Typography type="title" style={classes.title1}>
            Needs
  
        </Typography>
          <Grid container item xs={12} spacing={3}>
            <VirtualizedList>
              
            </VirtualizedList>
           
          </Grid>
          {/* <Divider /> */}
          <Popover></Popover>

        </Paper>        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Paper style={classes.root1} elevation={4}>
          <Typography type="title" style={classes.title1}>
            Services
        </Typography>
          <Grid container item xs={12} spacing={3}>
            <VirtualizedList></VirtualizedList>
          </Grid>
          {/* <Divider/> */}
          <Popover></Popover>
      </Paper>        </TabPanel>
      
      </SwipeableViews>
    </div>
  );
}
