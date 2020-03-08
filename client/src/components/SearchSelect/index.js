import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



export default function NativeSelects(props) {
  const classes = {
    formControl: {
      margin: 0,
      minWidth: 120,
      marginRight:'5px',
      marginBottom:"2px",
      backgroundColor:"white"
      
    }
  }

 const setCategory = props.setState;
 const category = props.category;
console.log(category);
 return (
  <span>
    <FormControl 
    variant="filled" 
    style={classes.formControl}>
        <InputLabel 
        id="demo-simple-select-label"
        >
        option
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={setCategory}
        >
          <MenuItem value={"need"}>Needs</MenuItem>
          <MenuItem value={"offer"}>Services</MenuItem>
        </Select>
      </FormControl>
    </span>
  );
}
