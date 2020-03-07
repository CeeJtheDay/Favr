import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import Container from '@material-ui/core/Container';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import option from '@material-ui/core/option';
// import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: 0,
    minWidth: 120,
    marginRight:'5px',
    marginBottom:"2px",
    backgroundColor:"white"
    
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();

 const setCategory = props.setState;
 const category = props.category;
console.log(category);
 return (
  <span>
    <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">option</InputLabel>
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
