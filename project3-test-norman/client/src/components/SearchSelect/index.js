import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// import Container from '@material-ui/core/Container';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import option from '@material-ui/core/option';
// import NativeSelect from '@material-ui/core/NativeSelect';

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
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

 const setCategory = (props.setState)
 return (
  <span>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple" >
        Filter
        </InputLabel>
          <Select
            // displayEmpty="true"
            // defaultValue="Services"
            onChange={setCategory}
            labelWidth="auto"
            inputProps={{
              name: 'Select',
              id: 'outlined-age-native-simple',
            }}
          >
            <option value={'needs'}>Wants</option>
            <option value={'services'} selected>Services</option>
          </Select>
      </FormControl>
    </span>
  );
}
