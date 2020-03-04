import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    wants: true
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

 const setCategory = (props.setState)
  return (
    <span>
     <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Select
        </InputLabel>
        <Select
          
          onChange={setCategory}
          labelWidth={labelWidth}
          inputProps={{
            name: 'Select',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value={'need'}>Wants</option>
          <option value={'services'}>Services</option>
          {/* <option value={'both'}>Both</option> */}
        </Select>
      </FormControl>
    </span>
  );
}
