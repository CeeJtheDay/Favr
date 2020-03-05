import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ReactStars from "react-rating-stars-component";
// import API from '../../utils/API-Review';
import APIU from "../../utils/API-User";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}));





const ModalPop = ({ open, handleClose, modalStyle, reviewer, reviewee }) => {
    const classes = useStyles();
    const [review,setReview] = useState ({
        rate:0,
        comment:""
    });

    const handleChange = e =>{
            setReview({...review, comment: e.target.value.trim()});
    }

    const handleSubmit = e => {
        e.preventDefault();
        let submitObj = {
            reviewer: reviewer,
            reviewee: reviewee,
            rate: review.rate,
            comment: review.comment
        };
        console.log(submitObj);
        axios.post('../api/reviews',submitObj)
        .then(()=>{
            axios.get(`../api/users/${reviewee}`)
            .then(data=>{
                console.log(data.data);
                let updateRate = data.data.rate+review.rate;
                let updateQuantity = data.data.ratingQuantity+1;
                APIU.updateUsers(reviewee,{rate:updateRate,ratingQuantity:updateQuantity})
                .then(handleClose)
            })
        })
    }

    return (
        <div>
            <div class="modal">
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={modalStyle} className={classes.paper}>
                        <ReactStars
                            value={review.rate}
                            size={50}
                            half={true}
                            onChange={newRating => {
                                setReview({...review, rate:newRating});
                            }}
                        />
                        <h3>Comment</h3>
                        <textarea rows="5" cols="40" value={review.comment} onChange={handleChange}></textarea>

                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default ModalPop;