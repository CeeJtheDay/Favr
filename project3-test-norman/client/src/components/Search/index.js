import React, { useState } from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
// import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'
import API from "../../utils/API-User";
// import { createMuiTheme } from 'material-ui/styles'
// import { useTheme } from '@material-ui/core/styles';
import Candidates from "../Candidates";
// import axios from "axios";
import Fuse from "fuse.js";
import Select from '../SearchSelect/index'

// set a default search value for onMount


const Search = ({ category, currUser, setCurrUser }) => {
    let serviceOptions = {
        shouldSort: true,
        tokenize: false,
        matchAllTokens: false,
        findAllMatches: false,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "offers"
        ]
    };
    let needOptions = {
        shouldSort: true,
        tokenize: false,
        matchAllTokens: false,
        findAllMatches: false,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "needs"
        ]
    };
    // const theme = useTheme();
    const classes = {
        card: {
            margin: 'auto',
            textAlign: 'center',
            paddingTop: 10,
            backgroundColor: '#80808024',
            border: "groove 1px #96CDFF"
        },
        menu: {
            width: 200,
        },
        textField: {
            marginLeft: "auto",
            marginRight: "auto",
            width: 130,
            verticalAlign: 'bottom',
            marginBottom: '20px'
        },
        searchField: {
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            marginBottom: '20px'
        },
        searchButton: {
            width: 'auto',
            height: '60px',
            padding: '0 8px',
            // backgroundColor: "#96CDFF",
            backgroundImage: "linear-gradient(to right, #96CDFF 0%, #077699 51%, #96CDFF 100%)",
            border: "solid 1px #077699",
            borderRadius: "15px",
            marginBottom: "24px"
        },
        // candidates: {
        //     border: "solid 1px white",
        //     borderRadius: "20px",
        //     maxWidth: 400,
        // }
    };

    const [state, setState] = useState({
        category: category,
        search: '',
        results: [],
        searched: false,
    });

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        })
    };

    const search = () => {
        console.log(currUser);
        let currResult = [];
        API.findAllUsers()
            .then(data => {
                console.log(data.data);
                if (!state.search || state.search.trim().length === 0) {
                    currResult = data.data.filter(user => user._id !== currUser.id);
                    setState({ ...state, results: currResult });
                } else {
                    console.log(state.category)
                    if (state.category === "need") {
                        console.log('need selected')
                        let fuse = new Fuse(data.data, serviceOptions);
                        currResult = fuse.search(state.search);
                        currResult = currResult.filter(user => user._id !== currUser.id);
                        // data.data.map(user => {
                        //     console.log(user);
                        //     if (user._id!==currUser.id) {
                        //         if (user.offers.includes(state.search)) {
                        //             currResult.push(user);
                        //             console.log(currResult);
                        //         }
                        //     }
                        // });
                        // console.log(currResult);
                        if (currResult.length === 0) {
                            currResult = data.data.filter(user => user._id !== currUser.id);
                            setState({ ...state, results: currResult });
                        } else {
                            setState({ ...state, results: currResult, searched: true });
                        }
                    } else {
                        console.log('service selected')

                        let fuse = new Fuse(data.data, needOptions);
                        currResult = fuse.search(state.search);
                        currResult = currResult.filter(user => user._id !== currUser.id);
                        // data.data.map(user => {
                        //     if (user.id !== currUser.id) {
                        //         if (user.needs.includes(state.search)) {
                        //             currResult.push(user);
                        //         }
                        //     }
                        // });
                        if (currResult.length === 0) {
                            currResult = data.data.filter(user => user._id !== currUser.id);
                            setState({ ...state, results: currResult });
                        } else {
                            setState({ ...state, results: currResult, searched: true });
                        }
                    }
                }
            });
    };

    const enterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault()
            search();
        }
    };

   

    return (
        // <div >
        <React.Fragment>
            {/* <Card style={classes.card}> */}
                <TextField
                    id="search"
                    label="Search products"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('search')}
                    style={classes.searchField}
                    margin="normal"
                />
                <Select 
                setState = {handleChange('category')}
                />
                <Button variant="raised" style={classes.searchButton} onClick={search}>
                    <SearchIcon />
                </Button>
                {/* <Divider /> */}
                <Candidates category={state.category} candidates={state.results} searched={state.searched} currUser={currUser} setCurrUser={setCurrUser} />
            {/* </Card> */}
        </React.Fragment>
        // </div>

    )
}


export default Search;
