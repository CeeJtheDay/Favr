import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ReactStars from "react-rating-stars-component";



export default function RecipeReviewCard({ currUser, setCurrUser, reviewList }) {

    const classes = {
        root: {
            maxWidth: 345,
            marginBottom: "5px"
        },
        avatar: {
            backgroundColor: red[500],
        },
    }

    return (
        <div>
            {reviewList.length > 0 && (
                reviewList.map(review => (
                    <Card style={classes.root}>
                        <CardHeader
                        avatar={
                            <Avatar 
                            aria-label="recipe" 
                            src={'/uploads/' + review.reviewer.image} 
                            style={classes.avatar} 
                            />
                        }
                        title={review.reviewer.name}
                        style={{paddingBottom:"5px"}}
                        />
                        <CardContent style={{paddingTop:"5px"}}>
                            <Typography >
                                <ReactStars
                                    value={review.rate}
                                    size={20}
                                    half={true}
                                />
                            </Typography>
                            <Typography 
                            variant="body2" 
                            color="primary" 
                            component="h5"
                            >
                                {review.comment}
                            </Typography>
                        </CardContent>
                    </Card>

                ))
            )}
            {reviewList.length === 0 && (
                <h3>No Review</h3>
            )}
        </div>
    );
}
