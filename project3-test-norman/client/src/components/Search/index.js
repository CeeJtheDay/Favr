import React, { useState } from 'react'
import Card from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/Menu/MenuItem'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'
import API from "../../utils/API-User";
import { createMuiTheme } from 'material-ui/styles'
import Candidates from "../Candidates";
import axios from "axios";


const Search = ({ category, currUser, setCurrUser }) => {
    const theme = createMuiTheme();
    const classes = {
        card: {
            margin: 'auto',
            textAlign: 'center',
            paddingTop: 10,
            backgroundColor: '#80808024'
        },
        menu: {
            width: 200,
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: 130,
            verticalAlign: 'bottom',
            marginBottom: '20px'
        },
        searchField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
            width: "50%",
            marginBottom: '20px'
        },
        searchButton: {
            minWidth: '20px',
            height: '30px',
            padding: '0 8px'
        }
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
                    currResult = data.data.filter(user=>user._id!=currUser.id);
                    setState({ ...state, results: currResult });
                } else {
                    if (state.category === "need") {
                        data.data.map(user => {
                            console.log(user);
                            if (user._id!==currUser.id) {
                                if (user.offers.includes(state.search)) {
                                    currResult.push(user);
                                    console.log(currResult);
                                }
                            }
                        });
                        console.log(currResult);
                        if (currResult.length===0) {
                            currResult = data.data.filter(user=>user._id!=currUser.id);
                            setState({ ...state, results: currResult });
                        } else {
                            setState({ ...state, results: currResult, searched: true });
                        }
                    } else {
                        data.data.map(user => {
                            if (user.id !== currUser.id) {
                                if (user.needs.includes(state.search)) {
                                    currResult.push(user);
                                }
                            }
                        });
                        if (currResult.length === 0) {
                            currResult = data.data.filter(user=>user._id!=currUser.id);
                            setState({ ...state, results: currResult });
                        } else {
                            setState({ ...state, results: currResult, searched: true });
                        }
                    }
                }
            });
    };

    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault()
            search();
        }
    };

    return (
        <div >
            <Card style={classes.card}>
                <TextField
                    id="search"
                    label="Search products"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('search')}
                    style={classes.searchField}
                    margin="normal"
                />
                <Button variant="raised" color={'primary'} style={classes.searchButton} onClick={search}>
                    <SearchIcon />
                </Button>
                <Divider />
                <Candidates category={state.category} candidates={state.results} searched={state.searched} currUser={currUser} setCurrUser={setCurrUser} />
            </Card>
        </div>

    )
}


export default Search;
