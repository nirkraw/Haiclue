class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      roomName: roomName,
      targetWords: [],
      players: {},
      gameStarted: false,
      currentColor: "black"

    };
    
    this.playerCount = 0;
    this.errors = [];
    this.addPlayer = this.addPlayer.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.startGame = this.startGame.bind(this);
    this.createTargetWords = this.createTargetWords.bind(this);
    this.assignPlayerTargetWord = this.assignPlayerTargetWord.bind(this);
    this.assignPlayerClueTiles = this.assignPlayerClueTiles.bind(this);
    this.selectClueTile = this.selectClueTile.bind(this)
    this.unselectClueTile = this.unselectClueTile.bind(this)
  }

  addPlayer(handle, socketId) {
    const player = {
      handle: handle,
      socketId: socketId,
      joined: false,
      number: 0, // default value
      targetWord: "",
      clueTiles: [],
      selectedClueTiles: []
    };

    if (Object.values(this.game.players).length < 2) {
      // chnage to 4
      player.number = Object.values(this.game.players).length + 1;
      this.game.players[handle] = player;
      this.playerCount++;
    } else {
      this.errors.push(
        "This game is full :(, your friends are playing without you."
      );
    }
  }

  submit(handle) {
    const player = this.game.players[handle];
    player.joined = true;
  }

  getGameState() {
    return this.game;
  }

  createTargetWords(targetWords) {
    this.game.targetWords = targetWords;
  }

  assignPlayerTargetWord() {
    // before each round
    Object.values(this.game.players).forEach((player) => {
      player.targetWord = this.game.targetWords[this.getRandomInt(4)];
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  startGame(targetWords, clueTiles) {
    this.game.gameStarted = true;
    this.createTargetWords(targetWords);
    this.assignPlayerTargetWord();
    this.assignPlayerClueTiles(clueTiles);
  }

  assignPlayerClueTiles(clueTiles) {
    Object.values(this.game.players).forEach((player) => {
      player.clueTiles = clueTiles.splice(0, 15);
    });
  }

  selectClueTile(handle, tile) {
    const player = this.game.players[handle];
    player.selectedClueTiles.push(tile);
    const index = player.clueTiles.indexOf(tile);
    player.clueTiles.splice(index, 1);
    debugger
  }

  unselectClueTile(handle, tile) {
    const player = this.game.players[handle];
    const index = player.selectedClueTiles.indexOf(tile);
    player.selectedClueTiles.splice(index, 1);
    player.clueTiles.push(tile);
  }

  
}

module.exports = Room;
