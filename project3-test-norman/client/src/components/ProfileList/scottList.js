
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import { FixedSizeList } from 'react-window';
import List from '@material-ui/core/List';
import Popover from "../Popover/index"
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

const OffersList = ({ category, list, currUser, setCurrUser }) => {
  // console.log("VL CURRUSER", currUser);
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: "#8693AB",
      margin: "5px"
    },
  }));
  // console.log(currUser);

  const [state, setState] = useState({
    needs: currUser.needs,
    offers: currUser.offers,
    newItem: ""
  });

  const handleChange = e => {
    console.log(e.target.value);
    setState({ ...state, newItem: e.target.value });
  }




  function renderRow() {

    return (
      <React.Fragment>
        {state.offers.map((item, i) => (
          <ListItem button key={i}>

            <p>{item}</p>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </React.Fragment>
    );
  }

  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  // export default function VirtualizedList() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <List>
          {renderRow()}
        </List>
      </div>
      <Popover />
    </div>

  );
  // }
}

export default OffersList;