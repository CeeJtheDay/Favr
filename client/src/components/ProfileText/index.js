import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactStars from "react-rating-stars-component";

const useStyles = makeStyles({
  root: {
    width: "full",
    padding: "0 80px 0 0",
    borderRadius: "0 20px 0 0",
    backgroundColor: "#8693AB80",
    color: "white",
    textShadow: "2px 2px 4px #000000"
  },
  cardContent:{
    padding:'10px',
    paddingBottom: '10px !important'
  },
  pos: {
    marginBottom:0,
    textShadow: "none"
  }
});



export default function SimpleCard({ currUser }) {
  const classes = useStyles();
  return (
    <Card 
    className={classes.root}
    >
      <CardContent 
      className={classes.cardContent}
      >
        <Typography 
        variant="h5" 
        component="h2"
        >
          {currUser.name}
        </Typography>
        <Typography 
        className={classes.pos} color="textSecondary"
        >
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
