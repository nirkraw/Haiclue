const Tile = require("../models/Tile");
const mongoose = require("mongoose");
const db = require("../config/keys").mongoURI; 


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

Tile.deleteMany({})
    .then(() => console.log('deleted tiles'))
    .catch((error) => console.log(error))

const blackWords = ["flat", "horn", "hurting", "oil", "bump", "walking", "stolen", "space", "jam", "saved", "decent", "acts", "lobby", "giant", "net", "farmer", "monkey", "western", "inch", "drawer", "joint", "build", "cherry", "tip", "private", "poem", "buck", "local", "motel", "sample", "shoe", "bail", "dancer", "tube", "log", "intense", "pray", "marked", "oxygen", "chair", "loan", "picnic", "drank", "wounds", "maid", "vehicle", "chief", "whip", "hatch", "casino", "offer", "accent", "grow", "classes", "clock", "silent", "add", "fighter", "witch", "dawn", "subject", "random", "cast", "blast", "uniform", "flower", "union", "fallen", "cruel", "agreed", "justice", "charity", "form", "history", "lad", "pin", "admire", "row", "laying", "kit", "radar", "coat", "tower", "trial", "level", "drawing", "opera", "sail", "corner", "pattern", "dentist", "tunnel", "pole", "round", "spare", "ruin", "trained", "rhythm", "serial", "mud", "push", "repeat", "super", "climb", "spring", "reward", "award", "belong", "friendly", "survival", "chat", "virus", "card", "cocktail", "motive", "budget", "iron", "bright", "campus", "bug", "return", "ranch", "traffic", "assault", "fit", "ice", "backup", "drill", "knife", "mail", "jungle", "tested", "bite", "pork", "chick", "handy", "twisted", "lived", "crystal", "twins", "booth", "fraud", "mission", "profile", "seal", "market", "habit", "golf", "lake", "league", "nervous", "creative", "apology", "nap", "channel", "trailer", "grand", "branch", "nuclear", "daily", "ticket", "clown", "fetch", "passing", "prince", "bat", "tank", "urgent", "group", "broad", "main", "raised", "awake", "identify", "raw", "stroke", "permit", "weight", "neck", "tragedy", "cotton", "belly", "proof", "relief", "camera", "railroad", "visiting", "majesty", "electric", "favor", "turtle", "blind", "page", "waste", "entry", "rescue", "senator", "score", "locked", "health", "voice", "scratch", "holiday", "ending", "polite", "comic", "wallet", "chill", "failure", "bra", "cookie", "temple", "plane", "tub", "album", "system"]
  
 
const whiteWords = ["spy", "badge", "smart", "brains", "radio", "direct", "share", "scotch", "master", "source", "skip", "tiny", "library", "window", "facing", "cheap", "modern", "dope", "lawn", "hooked", "string", "code", "crawl", "candy", "suit", "hostage", "bee", "fever", "issue", "painting", "bless", "fixed", "pet", "reading", "desk", "term", "bell", "trick", "barrel", "foul", "sneak", "fan", "council", "fill", "loyalty", "cancer", "coach", "operate", "dozen", "count", "deaf", "writer", "bowling", "wolf", "desert", "speech", "hollow", "shock", "photo", "resist", "miracle", "star", "destiny", "adult", "alien", "shed", "swell", "wrist", "lousy", "capture", "island", "bishop", "battery", "finish", "alert", "burn", "speed", "pillow", "chase", "tune", "tour", "flash", "drown", "bound", "butter", "wing", "harm", "birth", "blown", "trade", "mall", "boot", "sharp", "sheriff", "dust", "activity", "lifetime", "exit", "warm", "killer", "bend", "mount", "impress", "pan", "range", "miles", "pure", "liar", "press", "hat", "central", "visual", "hood", "appear", "loose", "joining", "original", "waiter", "bureau", "base", "bid", "gear", "effort", "cabin", "lamp", "trail", "stone", "worker", "bank", "glasses", "port", "injured", "tag", "bucket", "teach", "loving", "model", "claim", "minor", "theme", "species", "boom", "patch", "ship", "moon", "outfit", "beauty", "powers", "taxi", "dry", "verdict", "cloud", "halt", "firing", "strip", "shake", "laid", "event", "disaster", "winner", "noise", "chip", "spotted", "royal", "spike", "hungry", "bush", "nanny", "military", "profit", "handled", "item", "temper", "key", "remove", "sport", "wine", "bingo", "division", "guest", "popular", "mate", "yellow", "reverse", "goat", "flesh", "pilot", "spread", "fuel", "pro", "column", "search", "lap", "starting", "widow", "bridge", "grew", "pool", "regret", "ballet", "episode", "gather", "helpful", "detail", "hail", "jeep", "religion", "studied", "cancel", "block", "mix", "defeat", "leading", "dime", "teeth", "rolling"]


let tiles = [];

for (let i = 0; i < blackWords.length; i++) {
    let black = blackWords[i];
    let white = whiteWords[i];
    let tile = new Tile({black: black, white: white, display: true })
    tiles.push(tile);
}

 let done = 0;
 for (let i = 0; i < tiles.length; i++) {
   tiles[i].save(function (err, result) {
     done++;
     if (done === tiles.length) {
       exit();
     }
   });
 }

 function exit() {
   mongoose.disconnect();
 }