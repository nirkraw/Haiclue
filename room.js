class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      targetWords: ["tileObect", "tileObject"], //index to differentiate
      playerSubmitted: false,
      playerTwoSubmitted: false,
      // playerThreeSubmitted: false,
      // playerFourSubmitted: false,
    }; // not sure what does this yet
    this.players = {};
    // this.players = [];
    this.errors = [];
    this.addPlayer = this.addPLayer.bind(this);
  }

  // addPLayer(playerHandle, socketId) {
  //   const player = {
  //     playerHandle: playerHandle,
  //     socketId: socketId,
  //     submitted: false
  //   };
  //   if (this.players.length < 2) {
  //     // should be 4
  //     this.players.push(player);
  //   } else {
  //     this.errors.push("This game is full :(, your friends are playing without you.");
  //   }
  // }

  addPLayer(playerHandle, socketId) {
    const player = {
      playerHandle: playerHandle,
      socketId: socketId,
      submitted: false,
      number: 0, // default value
    };

    // if (this.players.length < 2) {
    if (Object.values(this.players).length < 2) {
      // should be 4
      player.number = this.players.length + 1;
      // this.players.push(player);
      this.players[socketId] = player;
    } else {
      this.errors.push(
        "This game is full :(, your friends are playing without you."
      );
    }

    // this.game[`player_${this.players.length}`] = player.submitted;
  }

  // this.players // array of all the players in the room {handle: ???, socketId: ???}
  submit(playerSocketId) {
    //string ex: "player_one"
    this.players[playerSocketId].submitted = true;
    // this.game[playerNumber] = true
    // this.setState({[playerNumber]: true})
  }

  // getGameState(){
  //   return this.game
  //   }

  // createGame(){}

  // getPlayers(){}
}

module.exports = Room;
