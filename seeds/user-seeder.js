const User = require("../models/User");
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

// User.deleteMany({})
//     .then(() => console.log('deleted users'))
//     .catch((error) => console.log(error))

    
const user1 = new User({handle: "John", email: "john@john.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user2 = new User({handle: "Nancy", email: "nancy@nancy.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user3 = new User({handle: "Sophia", email: "sophia@sophia.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user4 = new User({handle: "Andre", email: "andre@andre.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user5 = new User({handle: "Nicole", email: "nicole@nicole.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user6 = new User({handle: "Simon", email: "simon@simon.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user7 = new User({handle: "James", email: "james@james.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user8 = new User({handle: "Bartholomew", email: "bart@bart.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user9 = new User({handle: "Eduardo", email: "eduardo@eduardo.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user10 = new User({handle: "Angela", email: "angela@angela.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user11 = new User({handle: "Alex", email: "alex@alex.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user12 = new User({handle: "Jasmine", email: "jasmine@jasmine.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user13 = new User({handle: "Paul", email: "paul@paul.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })
const user14 = new User({handle: "Samantha", email: "samantha@samantha.com", password: "$2a$10$4v6bNFWW1HS57e1baMLyi.UFDnTk8WvmdwKE.xVPgPNIAJXV4zwSa" })

const users = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14];

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
