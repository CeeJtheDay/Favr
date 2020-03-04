import React, { useState } from 'react'
import { createMuiTheme } from 'material-ui/styles'
// import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TelegramIcon from '@material-ui/icons/Telegram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import API from "../../utils/API-Barter";
import { withRouter } from 'react-router-dom';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import axios from "axios";
// import $ from "jquery";

const Candidates = withRouter(({ history, category, candidates, searched, currUser, setCurrUser }) => {
    const theme = createMuiTheme();
    const classes = {
        root: {
            flexGrow: 1,
            width: "50%",
            margin: 'auto'
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing.unit * 1,
        },
        formControl: {
            margin: theme.spacing.unit * 1,
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing.unit * 1,
        },
    };

    const handleConnect = (user1Id, user2Id) => {
        console.log("create chat btw" + user1Id + user2Id);
        API.findAll()
            .then(data => {
                let currList = data.data.filter(chat => {
                    return ((chat.user1 === user1Id && chat.user2 === user2Id) || ((chat.user1 === user2Id && chat.user2 === user1Id)))
                });
                console.log(currList);
                if (currList.length === 0) {
                    console.log("create chat here");
                    API.create({ user1: user1Id, user2: user2Id })
                        .then(() => {
                            history.push(`/barter/?id=${currUser.id}`);
                        })
                } else {
                    history.push(`/barter/?id=${currUser.id}`);
                }
            })
    }

    const [state, setState] = useState({
        finalCandidates: []
    });

    async function handleChange (e) {
        if (e.target.value === "rating") {
            console.log("doing rating sort");
        }
        else if (e.target.value === "distance") {
            console.log("doing distance sort");
            let tempCandidate = candidates;
            console.log(tempCandidate);
            let currUserObj = {
                lat: currUser.lat,
                lng: currUser.lng
            };
            tempCandidate.sort((user1,user2)=>{
                let obj1 = {
                    lat: user1.lat,
                    lng: user1.lng
                };
                let obj2 = {
                    lat: user2.lat,
                    lng: user2.lng
                }
                console.log(haversine_distance(currUserObj,obj1));
                return haversine_distance(currUserObj,obj1)-haversine_distance(currUserObj,obj2);
            });
            console.log(tempCandidate);
            // console.log(tempCandidate);
            setState({finalCandidates: tempCandidate});
        }
    }

    // key=AIzaSyCy_fsa23_HL03eeIZhtAcxDd8RCmVnogo
    // const getLatLon = address => {
    //     axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCy_fsa23_HL03eeIZhtAcxDd8RCmVnogo`)
    //         .then(data => {
    //             console.log(data.data.results[0].geometry.location);
    //             return data.data.results[0].geometry.location;
    //         })

    // }

    function haversine_distance(mk1, mk2) {
        var R = 3958.8; // Radius of the Earth in miles
        var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
        var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
        var difflat = rlat2 - rlat1; // Radian difference (latitudes)
        var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
        return d;
    }


    return (
        <div style={classes.root}>
            <Grid item xs={12} md={12}>
                {searched ? (<Typography variant="h6" style={classes.title}>
                    Result for {category}
                </Typography>) : (<Typography variant="h6" style={classes.title}>
                    All Result for {category}
                </Typography>)}
                <FormControl style={classes.formControl}>
                    <Select value={state.filter} onChange={handleChange} displayEmpty style={classes.selectEmpty}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                        <MenuItem value="distance">Distance</MenuItem>
                    </Select>
                    <FormHelperText>Results Sorted By</FormHelperText>
                </FormControl>
                <div style={classes.demo}>
                    {state.finalCandidates.length > 0 ? (
                        <List>
                            {state.finalCandidates.map((user, i) => (
                                <ListItem>
                                    <ListItemText
                                        primary={user.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="connect" onClick={() => handleConnect(user._id, currUser.id)}>
                                            <TelegramIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="profile">
                                            <AccountCircleIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                    ) : (
                            <List>
                                {candidates.map((user, i) => (
                                    <ListItem>
                                        <ListItemText
                                            primary={user.name}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="connect" onClick={() => handleConnect(user._id, currUser.id)}>
                                                <TelegramIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="profile">
                                                <AccountCircleIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>

                        )}
                </div>
            </Grid>
        </div >
    )
})


export default Candidates;
