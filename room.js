class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      roomName: roomName,
      targetWords: [], 
      players: {},
      gameStarted: false
    };

    this.playerCount = 0;
    this.errors = [];
    this.addPlayer = this.addPLayer.bind(this);
    this.getGameState = this.getGameState.bind(this);
  
  }

  addPLayer(handle, socketId) {
    const player = {
      handle: handle,
      socketId: socketId,
      joined: false,
      number: 0, // default value
    };

    if (Object.values(this.game.players).length < 2) { // chnage to 4
      player.number = Object.values(this.game.players).length + 1;
      this.game.players[handle] = player;
      this.playerCount++
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
    // debugger
    return this.game;
  }

  createTargetWords(targetWords) {
    this.game.targetWords = targetWords
    debugger; 
  }

  startGame() {
    this.game.gameStarted = true;
  }

  // createGame(){}

  // getPlayers(){}
}

module.exports = Room;
