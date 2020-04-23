class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      targetWords: ["tileObect", "tileObject"], //index to differentiate
      players: {},
    };

    this.errors = [];
    this.addPlayer = this.addPLayer.bind(this);
    this.getGameState = this.getGameState.bind(this);
  }

  addPLayer(handle, socketId) {
    const player = {
      handle: handle,
      socketId: socketId,
      submitted: false,
      number: 0, // default value
    };

    if (Object.values(this.game.players).length < 2) {
      // should be 4
      player.number = this.game.players.length + 1;
      this.game.players[handle] = player;
    } else {
      this.errors.push(
        "This game is full :(, your friends are playing without you."
      );
    }
  }

  submit(handle) {
    // debugger
    const player = this.game.players[handle];
    player.submitted = true;
  }

  getGameState() {
    // debugger
    return this.game;
  }

  // createGame(){}

  // getPlayers(){}
}

module.exports = Room;
