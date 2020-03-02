const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewer: {
    type: String,
    required: true
  },
  reviewee: {
    type: String,
    required: true
  },
  rate:{
    type:Number,
    required: true
  },
  comment: {
    type: String,
    default: ""
  }
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
