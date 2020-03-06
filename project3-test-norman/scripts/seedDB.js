const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Posts collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/barter");

const barterSeed = [
  {
    // _id : ObjectId("5e5f297310740303b4e7060c"),
    intro : "",
    zip : "98006",
    needs : [ 
        "burrito", 
        "laundry"
    ],
    offers : [ 
        "math help", 
        "ride to work"
    ],
    rate : 3.5,
    ratingQuantity : 2,
    name : "Norman Lei",
    email : "normy@gmail.com",
    password : "password",
    street : "5566 Southeast 47th Street",
    city : "Seattle",
    state : " WA",
    lat : 47.4674185,
    lng : -121.7446515,
    // createdAt : ISODate("2020-03-04T04:07:16.557Z"),
    __v : 0
},
{
  // _id : ObjectId("5e5f297320740303b4e7060c"),
  intro : "",
  zip : "98199",
  needs : [ 
      "house paint", 
      "storage"
  ],
  offers : [ 
      "burritos", 
      "babysitting"
  ],
  rate : 3.5,
  ratingQuantity : 2,
  name : "Scotty T",
  email : "scotty@gmail.com",
  password : "passworrrd",
  street : "7798 S 7th St",
  city : "Seattle",
  state : " WA",
  lat : 47.4674185,
  lng : -121.7446515,
  // createdAt : ISODate("2020-03-04T04:07:16.557Z"),
  __v : 0
},
{
  // _id : ObjectId("5e5f297310749303b4e7060c"),
  intro : "",
  zip : "98107",
  needs : [ 
      "babysitting", 
      "ride to work"
  ],
  offers : [ 
      "storage"
      
  ],
  rate : 4,
  ratingQuantity : 1,
  name : "CJ",
  email : "CJ@gmail.com",
  password : "password",
  street : "9900 N 22ndth Ave",
  city : "Seattle",
  state : " WA",
  lat : 47.4674185,
  lng : -121.7446515,
  // createdAt : ISODate("2020-03-04T04:07:16.557Z"),
  __v : 0
},

{
  // _id : ObjectId("5e5f397310749303b4e7060c"),
  intro : "",
  zip : "98108",
  needs : [ 
      "handyman", 
      "life advice"
  ],
  offers : [ 
      "emotional distress"
      
  ],
  rate : 2,
  ratingQuantity : 100,
  name : "Tiffany",
  email : "tiffthegiff@gmail.com",
  password : "whatsapasswrod",
  street : "1800 N silly Ave",
  city : "Seattle",
  state : " WA",
  lat : 47.4674185,
  lng : -121.7446515,
  // createdAt : ISODate("2020-03-04T04:07:16.557Z"),
  __v : 0
},

{
  // _id : ObjectId("5e5f397310749303b4e7060c"),
  intro : "",
  zip : "98110",
  needs : [ 
      "girlfriend", 
      "chicken nugget preparation"
  ],
  offers : [ 
      "to hold the door for you"
      
  ],
  rate : 1,
  ratingQuantity : 100,
  name : "Billy",
  email : "billthegill@gmail.com",
  password : "hellopw",
  street : "88 W goofus Ave",
  city : "Seattle",
  state : " WA",
  lat : 47.4674185,
  lng : -121.7446515,
  // createdAt : ISODate("2020-03-04T04:07:16.557Z"),
  __v : 0
},

{
  // _id : ObjectId("5e5f397310749303b4e7060c"),
  intro : "",
  zip : "98111",
  needs : [ 
      "Doom Metal Tickets", 
      "New Kingkiller Book"
  ],
  offers : [ 
      "coding tutoring"
      
  ],
  rate : 5,
  ratingQuantity : 100,
  name : "Jaysawn",
  email : "jjsansawn@gmail.com",
  password : "heeeerespassword",
  street : "1800 dev st.",
  city : "Seattle",
  state : " WA",
  lat : 47.4674185,
  lng : -121.7446515,
  // createdAt : ISODate("2020-03-04T04:07:16.557Z"),
  __v : 0
}


];



db.User.insertMany(barterSeed)
  .then(data => {
    console.log(data.result + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

 