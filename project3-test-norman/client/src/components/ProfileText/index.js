import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactStars from "react-rating-stars-component";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container:{
    padding:'10px',
    paddingBottom: '10px !important'
  },
  pos: {
    marginBottom:0,
  },
});



export default function SimpleCard({ currUser }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.container}>
        <Typography variant="h5" component="h2">
          {currUser.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {currUser.city},{currUser.state}
        </Typography>
        <Typography>
          <ReactStars
            value={currUser.rate/currUser.rateQuantity}
            size={20}
            half={true}
          />
        </Typography>

      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>

  );
}
