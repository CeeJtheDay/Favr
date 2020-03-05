const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    },
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    default:""
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    default:""
  },
  lat: {
    type:Number,
    required: true
  },
  lng: {
    type:Number,
    required: true
  },
  needs:{
    type: Array,
    default: []
  },
  offers:{
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rate: {
    type: Number,
    default: 0
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  image: {
    type:String,
    default:"blank-template.jpg"
  }
});

// Execute before each user.save() call
UserSchema.pre("save", function(callback) {
  let user = this;

  // Break out if the password hasn't changed
  if (!user.isModified("password")) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
