const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Posts collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/barter");

const bookSeed = [
  {
    name: "test1",
    email:"jfjd@fjfj.com",
    password:"123",
    intro: "",
    street: "123 abc s",
    city: "seattle",
    state: "wa",
    zip: "90383"
  },
  {
    name: "test2",
    email:"jffdad@fjfj.com",
    password:"123",
    intro: "",
    street: "123 abc s",
    city: "seattle",
    state: "wa",
    zip: "90383"
  },
  {
    name: "test3",
    email:"jfhhad@fjfj.com",
    password:"123",
    intro: "",
    street: "123 abc s",
    city: "seattle",
    state: "wa",
    zip: "90383"
  }
];

const barterSeed = [
  {
    user1:"5e51e1dab60f065e28a63c90",
    user2:"5e532ec4c13649aebf918d56"
  }
];

db.User.insertMany(bookSeed)
  .then(data => {
    console.log(data.result + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.Barter.insertMany(barterSeed)
  .then(data=>{
    console.log("barters were inserted");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
