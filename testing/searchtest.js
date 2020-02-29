// import fuse from 'fuse.js';
// import users from "./testData"
const Fuse = require("fuse.js")
const users = require("./testData")
// var wantList = users.map(wants, services)
// var serviceList = users[1,2,3,4].services

// console.log(wantList) // "list" is the item array

var options = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  threshold: 0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
    keys: [
      "wants",
      "services"
    ]
  };
  var fuse = new Fuse(users, options);
  var result = fuse.search("burri");
  console.log(result[0].firstName, result[1])
  