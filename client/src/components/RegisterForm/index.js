import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./style.css";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));


const RegisterForm = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <form>
                        <TextField id="firstName" label="First Name" variant="outlined" />
                    </form>
                </Grid>
                <Grid item xs={4}>
                    <form>
                        <TextField id="lastName" label="Last Name" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <form>
                        <TextField id="email" label="email" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <form>
                        <TextField id="password" label="password" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <form>
                        <TextField id="verifyPass" label="Verify password" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <form>
                        <TextField id="intro" label="Introduce yourself..." variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                   <form>
                        <TextField id="streetAdd" label="Street Address" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <form>
                        <TextField id="city" label="City" variant="outlined" />
                    </form>
                </Grid>
                <Grid item xs={2}>
                    <form>
                        <TextField id="state" label="State" variant="outlined" />
                    </form>
                </Grid>
                <Grid item xs={3}>
                    <form>
                        <TextField id="zip" label="Zip" variant="outlined" />
                    </form>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Button variant="contained" color="primary">
                        Register
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default RegisterForm;