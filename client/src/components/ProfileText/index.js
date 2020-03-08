import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ReactStars from "react-rating-stars-component";





export default function SimpleCard({ currUser }) {
  const classes = {
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
  }
  const rate = currUser.ratingQuantity>0 ? currUser.rate/currUser.ratingQuantity : 0;
 
  return (
    <Card 
    style={classes.root}
    >
      <CardContent 
      style={classes.cardContent}
      >
        <Typography 
        variant="h5" 
        component="h2"
        >
          {currUser.name}
        </Typography>
        <Typography 
        style={classes.pos} 
        color="textSecondary"
        >
          {currUser.city},{currUser.state}
        </Typography>
        <Typography>
          <ReactStars
            value={rate}
            size={20}
            half={true}
          />
        </Typography>

      </CardContent>
 
    </Card>

  );
}
