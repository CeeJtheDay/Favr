import React, { useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TelegramIcon from '@material-ui/icons/Telegram';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import API from "../../utils/API-Barter";
import { withRouter } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const Candidates = withRouter(({ history, category, candidates, searched, currUser, setCurrUser }) => {
    const classes = {
        root: {
            flexGrow: 1,
            border: "solid 1px white",
            borderRadius: "20px",
            width: "400px",
            padding: "50px"
        },
        demo: {
            backgroundColor: "#8693AB"
        },
        title: {
            margin: "10px 40px",
            color: "white",
            fontWeight: "bold",
            textShadow: "2px 2px 4px #000000"
        },
        selectEmpty: {
            marginTop: "40px",
            color: "white"
        },
        list: {
            backgroundColor: " rgb(43,41,44, 0.3)",
            border: "groove 1px rgb(43,41,44, 0.3)",
            borderRadius: "20px",
            padding: "10px"
        },
        listItem: {
            backgroundColor: "rgb(43,41,44, 0.3)",
            margin: "8px auto",
            padding: "15px",
            borderRadius: "20px",
            border: "groove 1px #96CDFF80",
        },
        liText1: {
            color: "white",
            textShadow: "2px 2px 4px #000000",
            backgroundColor: "#96CDFF",
            borderRadius: "20px",
            border: "hidden 1px #077699",
            boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)",
            padding: "5px"
        },

        messageBtn: {
            margin: "5px",
            color: "white",
            textShadow: "2px 2px 4px #000000",
            backgroundColor: "#96CDFF ",
            border: "dotted 2px #077699",
            boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)"

        },
        profileBtn: {
            margin: "5px",
            color: "white",
            textShadow: "2px 2px 4px #000000",
            backgroundColor: "#96CDFF ",
            border: "dotted 2px #077699",
            boxShadow: "2px 4px 2px rgb(43,41,44, 0.3)"
        },
        formControl: {
            minWidth: "200px",
            marginBottom: "10px"
        }
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

    const handlePage = id => {
        history.push(`/other/?id=${id}`);
    }

    const [state, setState] = useState({
        finalCandidates: []
    });

    async function handleChange(e) {
        if (e.target.value === "rating") {
            console.log("doing rating sort");
            let tempCandidate = candidates;
            console.log(tempCandidate);
            tempCandidate.sort(function (user1, user2) {
                let rate1 = user1.ratingQuantity > 0 ? user1.rate / user1.ratingQuantity : 0;
                let rate2 = user2.ratingQuantity > 0 ? user2.rate / user2.ratingQuantity : 0;
                return rate2 - rate1;

            });
            console.log(tempCandidate);
            setState({ finalCandidates: tempCandidate });
        }
        else if (e.target.value === "distance") {
            console.log("doing distance sort");
            let tempCandidate = candidates;
            console.log(tempCandidate);
            let currUserObj = {
                lat: currUser.lat,
                lng: currUser.lng
            };
            tempCandidate.sort((user1, user2) => {
                let obj1 = {
                    lat: user1.lat,
                    lng: user1.lng
                };
                let obj2 = {
                    lat: user2.lat,
                    lng: user2.lng
                }
                console.log(haversine_distance(currUserObj, obj1));
                return haversine_distance(currUserObj, obj1) - haversine_distance(currUserObj, obj2);
            });
            console.log(tempCandidate);
            // console.log(tempCandidate);
            setState({ finalCandidates: tempCandidate });
        }
    }

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
        <React.Fragment>
            {searched && (<Typography variant="h6" style={classes.title}>
                Result for {category}
            </Typography>)}
            {searched===false && (
                <Typography variant="h6" style={classes.title}>
                    No Result was Founded! Here are all the users!
                </Typography>
            )}
            <FormControl style={classes.formControl}>
                <InputLabel id="demo-simple-select-helper-label">Sort Result By</InputLabel>
                <Select
                    value={state.filter}
                    onChange={handleChange}
                    // displayEmpty 
                    style={classes.selectEmpty}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="distance">Distance</MenuItem>
                </Select>
            </FormControl>
            <div style={classes.demo}>
                {state.finalCandidates.length > 0 ? (

                    <List
                        disablePadding="true"
                        style={classes.list}>
                        {state.finalCandidates.map((user, i) => (
                            <ListItem key={i} style={classes.listItem}>
                                <ListItemText
                                    style={classes.liText1}
                                    primary={`${user.name}`}
                                />

                                <ListItemSecondaryAction>
                                    <IconButton
                                        style={classes.messageBtn}
                                        edge="end"
                                        aria-label="connect"
                                        onClick={() => handleConnect(user._id, currUser.id)}
                                    >
                                        <TelegramIcon />
                                    </IconButton>
                                    <IconButton
                                        style={classes.profileBtn}
                                        edge="end"
                                        aria-label="profile"
                                    >
                                        <AccountCircleIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>


                ) : (
                        <List
                            disablePadding="true"
                            style={classes.list}>
                            {candidates.map((user, i) => (
                                <ListItem
                                    style={classes.listItem}
                                    key={i}
                                >
                                    <ListItemText
                                        style={classes.liText1}
                                        primary={`${user.name}`}
                                    />


                                    <ListItemSecondaryAction>
                                        <IconButton
                                            style={classes.messageBtn}
                                            edge="end"
                                            aria-label="connect"
                                            onClick={() => handleConnect(user._id, currUser.id)}
                                        >
                                            <TelegramIcon />
                                        </IconButton>
                                        <IconButton
                                            style={classes.profileBtn}
                                            edge="end"
                                            aria-label="profile"
                                            onClick={() => handlePage(user._id)}
                                        >
                                            <AccountCircleIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>

                    )}
            </div>
        </React.Fragment>
    )
})


export default Candidates;
