import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import ReactStars from "react-rating-stars-component";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);

export default function RecipeReviewCard({ currUser, setCurrUser, reviewList }) {
    const classes = useStyles();
    console.log(reviewList);
    return (
        <div>
            {reviewList.length > 0 && (
                reviewList.map(review => (
                    <Card className={classes.root}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" src={'/uploads/' + review.reviewer.image} className={classes.avatar} />
                            }
                            title={review.reviewer.name}
                            subheader={review.time}
                        />
                        <CardContent>
                            <Typography>
                                <ReactStars
                                    value={review.rate}
                                    size={30}
                                    half={true}
                                />
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
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
