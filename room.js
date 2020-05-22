class Room {
  constructor(roomName) {
    this.roomName = roomName;
    this.game = {
      roomName: roomName,
      joined: false,
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
      endRound: null,
      over: false,
      timer: false,
    };

    this.playerCount = 0;

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
    this.gameOver = this.gameOver.bind(this);
    this.storeTiles = this.storeTiles.bind(this);
    this.getRoundTiles = this.getRoundTiles.bind(this);
    this.startRound = this.startRound.bind(this);
    this.resetPlayersSubmittedClue = this.resetPlayersSubmittedClue.bind(this);
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
      submittedClue: false,
      submittedGuess: false,
      guessedWord: "",
      oldGuessedWord: "",
      revealedClue: false,
      guessIndex: null,
    };

    if (Object.values(this.game.players).length < 10) {
      player.number = Object.values(this.game.players).length + 1;
      this.game.players[socketId] = player;
      console.log(`${socketId} : ${handle}`);
      this.playerCount++;
    }
  }

  submit(socketId) {
    const player = this.game.players[socketId];
    player.joined = true;
  }

  getGameState() {
    return this.game;
  }

  createTargetWords(targetWords) {
    this.game.targetWords = targetWords;
  }

  assignPlayersTargetWord() {
    Object.values(this.game.players).forEach((player) => {
      let index = this.getRandomInt(4); // should we combine this
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
    this.game.endRound = rounds + 1;
    this.game.gameStarted = true;
    if (timer) this.game.timer = true;
    this.startRound();
  }

  startRound() {
    this.resetPlayersSubmittedClue();
    this.game.clueSubmissionCount = 0;
    this.game.currentPlayerTurn = 1;
    this.game.phase = "clue construction";
    this.game.round++;

    if (this.game.round === this.game.endRound) {
      this.gameOver();
    }

    if (this.game.round % 2 === 0) {
      this.game.currentColor = "white";
    } else {
      this.game.currentColor = "black";
    }

    const newTiles = this.getRoundTiles(this.game.tiles);
    const targetWords = newTiles.slice(150);
    const clueTiles = newTiles.slice(0, 150);

    this.createTargetWords(targetWords);
    this.assignPlayersTargetWord();
    this.assignPlayersClueTiles(clueTiles);
  }

  resetPlayersSubmittedClue() {
    Object.values(this.game.players).forEach((player) => {
      player.submittedClue = false;
      player.selectedClueTiles = [];
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
    return arr.slice(0, 154); // returns the first 64 tiles
  }

  assignPlayersClueTiles(clueTiles) {
    Object.values(this.game.players).forEach((player) => {
      player.clueTiles = clueTiles.splice(0, 15);
    });
  }

  selectClueTile(socketId, tile) {
    const player = this.game.players[socketId];
    if (!player.selectedClueTiles.includes(tile)) {
      player.selectedClueTiles.push(tile);
      for (let i = 0; i < player.clueTiles.length; i++) {
        if (tile._id === player.clueTiles[i]._id) {
          player.clueTiles.splice(i, 1);
        }
      }
    }
  }

  unselectClueTile(socketId, tile) {
    const player = this.game.players[socketId];
    if (!player.clueTiles.includes(tile)) {
      player.clueTiles.push(tile);
      for (let i = 0; i < player.selectedClueTiles.length; i++) {
        if (tile._id === player.selectedClueTiles[i]._id) {
          player.selectedClueTiles.splice(i, 1);
        }
      }
    }
  }

  insertLine(socketId) {
    const player = this.game.players[socketId];
    player.selectedClueTiles.push(`${player.selectedClueTiles.length}`);
  }

  removeLine(socketId, lineIndex) {
    const player = this.game.players[socketId];
    player.selectedClueTiles.splice(lineIndex, 1);
  }

  submitClue(socketId) {
    const player = this.game.players[socketId];
    if (!player.submittedClue) {
      player.submittedClue = true;
      this.game.clueSubmissionCount++;
    }
    if (this.game.clueSubmissionCount === this.playerCount) {
      // trigger into the next game phase
      this.game.phase = "clue guessing";
    }
  }

  submitGuess(
    localPlayerSocketId,
    matchBoolean,
    currentPlayerSocketId,
    guessedWord,
    guessedIndex
  ) {
    const localPlayer = this.game.players[localPlayerSocketId];
    const currentPlayer = this.game.players[currentPlayerSocketId];
    localPlayer.submittedGuess = true;

    if (localPlayer.guessedWord === guessedWord) {
      return null;
    }

    localPlayer.guessedWord = guessedWord;
    localPlayer.guessIndex = guessedIndex;

    this.game.clueGuessCount++;

    if (matchBoolean) {
      localPlayer.points++;
      currentPlayer.points++;
    }
    let { targetWord, targetIndex } = currentPlayer;

    if (this.game.clueGuessCount === this.playerCount - 1) {
      currentPlayer.revealedClue = true;

      currentPlayer.correctWord = targetWord[this.game.currentColor];
      currentPlayer.correctIndex = targetIndex;

      currentPlayer.correctWord =
        currentPlayer.targetWord[this.game.currentColor];
      this.game.currentPlayerTurn++;
      this.game.clueGuessCount = 0;

      setTimeout(() => {
        Object.values(this.game.players).forEach((player) => {
          player.guessedWord = "";
          player.submittedGuess = false;
        });
        currentPlayer.revealedClue = false;
      }, 5000);
    }

    if (this.game.currentPlayerTurn === this.playerCount + 1) {
      setTimeout(() => {
        this.startRound();
      }, 5000);
    }
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
