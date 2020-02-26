const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const barterSchema = new Schema({
  user1: {
    type: String,
    required: true
  },
  user2: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Ongoing"
  }
});

const Barter = mongoose.model("barters", barterSchema);

module.exports = Barter;
