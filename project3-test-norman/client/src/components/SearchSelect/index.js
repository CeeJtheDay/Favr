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
const selectStyles = {
  backgroundColor: "white",
  // backgroundColor: "#96CDFF",



};

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
    // <span>
    //   <FormControl variant="outlined" className={classes.formControl}>
    //       <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple" >
    //       Select
    //       </InputLabel>
    //         <Select
    //           // displayEmpty="true"
    //           // defaultValue="Services"
    //           style={selectStyles}
    //           onChange={setCategory}
    //           labelWidth="auto"
    //           inputProps={{
    //             name: 'Select',
    //             id: 'outlined-age-native-simple',
    //           }}
    //         >
    //           <option value={'needs'}>Wants</option>
    //           <option value={'services'} selected>Services</option>
    //         </Select>
    //     </FormControl>
    //   </span>



//     <div class="input-group mb-3">
//             <input type="text" class="form-control" aria-label="Text input with segmented dropdown button"/>
//       <div class="input-group-append">

//         {/* <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
//         <button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</button>
//           {/* <span class="sr-only">Toggle Dropdown</span> */}
//         {/* </button> */}
//         <div class="dropdown-menu">
//       <a class="dropdown-item" href="#">Action</a>
//       <a class="dropdown-item" href="#">Another action</a>
//       <a class="dropdown-item" href="#">Something else here</a>
//       <div role="separator" class="dropdown-divider"></div>
//       <a class="dropdown-item" href="#">Separated link</a>
//     </div>
//         <button type="button" class="btn btn-info">Search</button>
//       </div>

//  </div>
<div className="input-group">
  <input type="text" class="form-control" aria-label="Text input with dropdown button"/>
  <div className="input-group-append">
    <button className="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
    <div className="dropdown-menu">
      <a className="dropdown-item" href="#">Action</a>
      <a className="dropdown-item" href="#">Another action</a>
      <a className="dropdown-item" href="#">Something else here</a>
      <div role="separator" class="dropdown-divider"></div>
      <a className="dropdown-item" href="#">Separated link</a>
    </div>
   <button type="button" class="btn btn-info">Search</button>
  </div>
</div>
      );
    }
