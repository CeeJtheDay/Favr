import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function BasicTextFields() {
  const classes = {
    root: {
      '& > *': {
        // margin: theme.spacing(1),
        width: 200,
      }
    }
  }

  return (
    <form 
    style={classes.root} 
    noValidate 
    autoComplete="off"
    >
      <TextField 
      id="standard-basic" 
      label="Enter" 
      />
      
    </form>
  );
}