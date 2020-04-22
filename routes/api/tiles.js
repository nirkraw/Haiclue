const express = require("express");
const router = express.Router();
const Tile = require("../../models/Tile");

router.get("/test", (req, res) => {
  return res.json({ msg: "This is the tile route" });
});

router.get("/", (req, res) => {
  Tile.find()
    .then((tiles) => res.json(tiles))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;