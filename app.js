const path = require('path');

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/keys").mongoURI; 
const passport = require("passport");
// const User = require("./models/User"); 
const users = require("./routes/api/users");
const tiles = require("./routes/api/tiles");


const port = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    // const user = new User({
    //     handle: "jim",
    //     email: "jim@jim.jim",
    //     password: "jimisgreat123"
    // })
    // user.save();
    res.send("Hello World!");
}); 

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.log(error));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/tiles", tiles);