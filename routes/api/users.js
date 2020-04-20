const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

router.get("/test", (req, res) => {
  return res.json({ msg: "This is the user route" });
});

module.exports = router;
