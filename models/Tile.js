const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TileSchema = new Schema({
  black: {// black side word
    type: String, 
    require: true,
  },
  white: {// white side word
    type: String, 
    require: true,
  },
  display: {
    type: Boolean,
    default: true,
    require: true
  }
});
// {id: ???, black: "hello", white: "world"} 

module.exports = Tile = mongoose.model("tiles", TileSchema);

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const TileSchema = new Schema({
//   word: {
//     type: String,
//     required: true,
//   },
//   color: {
//     type: String, // either "black" or "white"
//     require: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = Tile = mongoose.model("tiles", TileSchema);
