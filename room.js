class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      roomName: roomName,
      tiles: [],
      targetWords: [],
      players: {},
      gameStarted: false,
      currentColor: "black",
      clueSubmissionCount: 0,
      clueGuessCount: 0,
      phase: "clue construction",
      currentPlayerTurn: 1,
      round: 0,
      endRound: null, //change variable name to numberOfRounds ?? 
      over: false,
      timer: false 
    };

    this.playerCount = 0;
    this.errors = [];

    this.addPlayer = this.addPlayer.bind(this);
    this.getGameState = this.getGameState.bind(this);
    this.startGame = this.startGame.bind(this);
    this.createTargetWords = this.createTargetWords.bind(this);
    this.assignPlayersTargetWord = this.assignPlayersTargetWord.bind(this);
    this.assignPlayersClueTiles = this.assignPlayersClueTiles.bind(this);
    this.selectClueTile = this.selectClueTile.bind(this);
    this.unselectClueTile = this.unselectClueTile.bind(this);
    this.submitClue = this.submitClue.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.unrevealClue = this.unrevealClue.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.storeTiles = this.storeTiles.bind(this);
    this.getRoundTiles = this.getRoundTiles.bind(this);
    this.startRound = this.startRound.bind(this);
    this.resetPlayersSubmitedClue = this.resetPlayersSubmitedClue.bind(this);
    this.insertLine = this.insertLine.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  addPlayer(handle, socketId) {
    const player = {
      handle: handle,
      socketId: socketId,
      joined: false,
      number: 0, // default value // number of player
      targetWord: "",
      correctWord: "",
      targetIndex: null,
      correctIndex: null,
      points: 0,
      clueTiles: [],
      selectedClueTiles: [],
      submitedClue: false,
      submitedGuess: false, 
      guessedWord: "",
      revealedClue: false,
    };

    if (Object.values(this.game.players).length < 10) {
      // change to 4
      this.game.players[handle] = player;
      player.number = Object.values(this.game.players).length;
      ///
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

  assignPlayersTargetWord() {
    // before each round
    Object.values(this.game.players).forEach((player) => {
      let index = this.getRandomInt(4);
      player.targetWord = this.game.targetWords[index];
      player.targetIndex = index;
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  storeTiles(tiles) {
    this.game.tiles = tiles;
  }

  startGame(rounds, timer) {
    this.game.endRound = (rounds + 1);
    this.game.gameStarted = true;
    if(timer) this.game.timer = true; 
    this.startRound();
  }
  
  
  startRound() {
    // debugger
    this.resetPlayersSubmitedClue();
    this.game.clueSubmissionCount = 0
    this.game.currentPlayerTurn = 1;
    this.game.phase = "clue construction";
    this.game.round++;

    
    if (this.game.round === this.game.endRound) { // change number of rounds 
      this.gameOver();
    }
    
    if(this.game.round % 2 === 0) {
      this.game.currentColor = "white"
    } else {
      this.game.currentColor = "black"
    }
    
    const newTiles = this.getRoundTiles(this.game.tiles);
    const targetWords = newTiles.slice(60);
    const clueTiles = newTiles.slice(0, 60);
    
      this.createTargetWords(targetWords);
      this.assignPlayersTargetWord();
      this.assignPlayersClueTiles(clueTiles);
  }

  resetPlayersSubmitedClue() {
    Object.values(this.game.players).forEach((player) => {
      player.submitedClue = false;
      player.selectedClueTiles = []
      // player.guessedWord = "";
    });
  }

  getRoundTiles(arr, currentIndex = arr.length) {
    while (currentIndex !== 0) {
      //Get a random index
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      //Swap the values
      let temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr.slice(0, 64); // returns the first 64 tiles
  }

  assignPlayersClueTiles(clueTiles) {
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

  insertLine(handle) {
    const player = this.game.players[handle];
    player.selectedClueTiles.push(`${player.selectedClueTiles.length}`);
  }

  removeLine(handle, lineIndex) {
    const player = this.game.players[handle];
    player.selectedClueTiles.splice(lineIndex, 1);
  }

  submitClue(handle) {
    const player = this.game.players[handle];
    if (!player.submitedClue) {
      player.submitedClue = true;
      this.game.clueSubmissionCount++;
    }
    if (this.game.clueSubmissionCount === this.playerCount) {
      // trigger into the next game phase
      this.game.phase = "clue guessing";
    }
  }

  submitGuess(localPlayerhandle, matchBoolean, currentPlayerHandle, guessedWord) {
    const localPlayer = this.game.players[localPlayerhandle];
    const currentPlayer = this.game.players[currentPlayerHandle];

    localPlayer.submitedGuess = true;
    localPlayer.guessedWord = guessedWord;

    this.game.clueGuessCount++;

    if (matchBoolean) {
      localPlayer.points++;
      currentPlayer.points++;
    }

    let { targetWord, targetIndex } = currentPlayer

    if (this.game.clueGuessCount === this.playerCount - 1) {
      currentPlayer.correctWord = targetWord[this.game.currentColor]; 
      currentPlayer.correctIndex = targetIndex;
      Object.values(this.game.players).forEach((player) => {
        player.submitedGuess = false; 
      });
      
      currentPlayer.correctWord = currentPlayer.targetWord[this.game.currentColor];
      currentPlayer.revealedClue = true;
      this.game.currentPlayerTurn++;
      this.game.clueGuessCount = 0;
    }

      // if (this.game.currentPlayerTurn === this.playerCount + 1) {
      //   this.startRound();
      // }
  }

  unrevealClue(handle) {
    if (this.game.currentPlayerTurn === this.playerCount + 1) {
      // this may solve other issues with reveal clue component, that were previously solved by adding correctIndex and correctWord keys into player object.
      this.startRound();
    }
    const player = this.game.players[handle];
    player.revealedClue = false;
  }

  gameOver() {
    this.game.over = true;
  }

  restartGame() {
    this.game.round = 0;
    this.game.over = false; 
    Object.values(this.game.players).forEach((player) => {
      player.points = 0; 
    });
    this.startRound();
  }
}

module.exports = Room;
