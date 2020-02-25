const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name is required!"
  },
  email: {
    type: Number,
    required: "Enter an amount"
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    required: true
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
