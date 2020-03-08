import React, { useState } from 'react'
import SearchIcon from 'material-ui-icons/Search'
import API from "../../utils/API-User";
import Candidates from "../Candidates";
import Fuse from "fuse.js";
import Select from '../SearchSelect/index'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

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

    const classes = {
        searchField: {
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%",
            marginBottom: '0px',
            marginTop: '4px'
        },
        root: {
            background: "transparent",
            border: "black"
        }

    };

    const [state, setState] = useState({
        category: category,
        search: '',
        results: [],
        searched: "",
    });

    const handleChange = name => event => {
        console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        })
    };

    const search = () => {
        console.log(currUser);
        console.log(state);
        let currResult = [];
        API.findAllUsers()
            .then(data => {
                console.log(data.data);
                if (!state.search || state.search.trim().length === 0) {
                    currResult = data.data.filter(user => user._id !== currUser.id);
                    console.log(currResult);
                    setState({ ...state, results: currResult, searched:false });
                } else {
                    console.log(state.category)
                    if (state.category === "need") {
                        console.log('need selected')
                        let fuse = new Fuse(data.data, serviceOptions);
                        currResult = fuse.search(state.search);
                        currResult = currResult.filter(user => user._id !== currUser.id);

                        if (currResult.length === 0) {
                            currResult = data.data.filter(user => user._id !== currUser.id);
                            setState({ ...state, results: currResult, searched:false });
                        } else {
                            setState({ ...state, results: currResult, searched: true });
                        }
                    } else {
                        console.log('service selected')

                        let fuse = new Fuse(data.data, needOptions);
                        currResult = fuse.search(state.search);
                        currResult = currResult.filter(user => user._id !== currUser.id);

                        if (currResult.length === 0) {
                            currResult = data.data.filter(user => user._id !== currUser.id);
                            setState({ ...state, results: currResult, searched:false });
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
        <React.Fragment>

            <Select
                setState={handleChange('category')} category={state.category}
            />

            <FormControl 
            style={classes.searchField}
            >
                <InputLabel 
                style={classes.searchField}
                >
                    Search
                </InputLabel>
                <Input
                    onChange={handleChange('search')}
                    onKeyDown={enterKey} 
                    endAdornment={
                        <InputAdornment 
                        position="end"
                        >
                            <SearchIcon
                                onClick={search}
                            >
                            </SearchIcon>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Candidates
                category={state.category}
                candidates={state.results}
                searched={state.searched}
                currUser={currUser}
                setCurrUser={setCurrUser}
            />

        </React.Fragment>
    )
}


export default Search;
