class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      roomName: roomName,
      targetWords: [],
      players: {},
      gameStarted: false,
      currentColor: "black",
      clueSubmissionCount: 0,
      clueGuessCount: 0,
      phase: "clue construction",
      currentPlayerTurn: 1 
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
    this.submitClue = this.submitClue.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.unrevealClue = this.unrevealClue.bind(this);
  }

  addPlayer(handle, socketId) {
    const player = {
      handle: handle,
      socketId: socketId,
      joined: false,
      number: 0, // default value // number of player
      targetWord: "",
      points: 0,
      clueTiles: [],
      selectedClueTiles: [],
      submitedClue: false, 
      submitedGuess: false, // the guess 
      revealedClue: false
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
    for (let i = 0; i < player.clueTiles.length; i++) {
        if (tile._id === player.clueTiles[i]._id) {
          player.clueTiles.splice(i, 1);
        }
    }
  }

  unselectClueTile(handle, tile) {
    const player = this.game.players[handle];
    player.clueTiles.push(tile);
    for (let i = 0; i < player.selectedClueTiles.length; i++) {
      if (tile._id === player.selectedClueTiles[i]._id) {
        player.selectedClueTiles.splice(i, 1);
      }
    }
  }

  submitClue(handle) {
    const player = this.game.players[handle];
    if(!player.submitedClue) {
      player.submitedClue = true;
      this.game.clueSubmissionCount++;
    }

    if (this.game.clueSubmissionCount === this.playerCount){
      // trigger into the next game phase
      this.game.phase = "clue guessing";
    }
  }

  submitGuess(localPlayerhandle, matchBoolean, currentPlayerHandle) {
    const localPlayer = this.game.players[localPlayerhandle];
    const currentPlayer = this.game.players[currentPlayerHandle];
    this.game.clueGuessCount++
    if(matchBoolean) {
      localPlayer.points++
      currentPlayer.points++
    }

    if(this.game.clueGuessCount === this.playerCount - 1) {
      currentPlayer.revealedClue = true;
      this.game.currentPlayerTurn++
    }
  }

  unrevealClue(handle) {
    const player = this.game.players[handle];
    player.revealedClue = false;
  }
}

module.exports = Room;
