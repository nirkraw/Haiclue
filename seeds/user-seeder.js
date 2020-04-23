const User = require("../models/User");
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

// User.deleteMany({})
//     .then(() => console.log('deleted users'))
//     .catch((error) => console.log(error))

    
const user1 = new User({handle: "John", email: "john@john.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user2 = new User({handle: "Paul", email: "paul@paul.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user3 = new User({handle: "Simon", email: "simon@simon.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user4 = new User({handle: "James", email: "james@james.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user5 = new User({handle: "Bartholomew", email: "bart@bart.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })

const users = [user1, user2, user3, user4, user5];

let done = 0
 for (let i = 0; i < users.length; i++) {
   users[i].save(function (err, result) {
     done++;
     if (done === users.length) {
       exit();
     }
   });
 }

 function exit() {
   mongoose.disconnect();
 }
