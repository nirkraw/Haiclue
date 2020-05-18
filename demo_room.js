class DemoRoom {
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
            endRound: 3,
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
        // this.getRoundTiles = this.getRoundTiles.bind(this);
        this.startRound = this.startRound.bind(this);
        this.resetPlayersSubmitedClue = this.resetPlayersSubmitedClue.bind(this);
        this.insertLine = this.insertLine.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.restartGame = this.restartGame.bind(this);
    }

    addPlayer(handle) {
        const player = {
            handle: handle,
            joined: false,
            number: 0, 
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
            oldGuessedWord: "",
            revealedClue: false,
        };

        player.number = Object.values(this.game.players).length + 1;
        this.game.players[handle] = player;
        this.playerCount++;

        
    }

    storeTiles(tiles) {
        this.game.tiles = tiles;
    }


    startGame() {
        this.game.gameStarted = true;
        this.startRound();
    }

    startRound() {
        this.resetPlayersSubmitedClue();
        this.game.clueSubmissionCount = 0

        this.game.currentPlayerTurn = 1;

        this.game.phase = "clue construction";
        this.game.round++;

        if (this.game.round === this.game.endRound) {
            this.gameOver();
        }
        
        if (this.game.round % 2 === 0) {
            this.game.currentColor = "white"
        } else {
            this.game.currentColor = "black"
        }
        
        const tiles = Object.values(this.game.tiles).slice(0, 49);
        const targetWords = tiles.slice(0,4); //flat - spy , horn -badge , hurting - smart , oil - brains
        const allClueTiles = tiles.slice(4, 49);
        
        this.createTargetWords(targetWords);
        this.assignPlayersTargetWord();
        this.assignPlayersClueTiles(allClueTiles);
    }

    resetPlayersSubmitedClue() {
        Object.values(this.game.players).forEach((player) => {
            player.submitedClue = false;
            player.selectedClueTiles = [];
        });
    }

    createTargetWords(targetWords) {
        this.game.targetWords = targetWords; 
    }

    assignPlayersTargetWord() {
        Object.values(this.game.players).forEach((player) => {
            if (player.number === 1) {
                player.targetWord = this.game.targetWords[2];
                player.targetIndex = 2;
            }
            if (player.number === 2) {
                player.targetWord = this.game.targetWords[1]; 
                player.targetIndex = 1;
            }
            if (player.number === 3) {
                player.targetWord = this.game.targetWords[0]; 
                player.targetIndex = 0;
            }
        });
    }

    assignPlayersClueTiles(allClueTiles) {
        Object.values(this.game.players).forEach((player) => {
            if (player.number === 1) {
                player.clueTiles = allClueTiles.slice(4, 19); 
            }
            if (player.number === 2) {
                player.clueTiles = allClueTiles.slice(19, 34); 
            }
            if (player.number === 3) {
                player.clueTiles = allClueTiles.slice(34, 49); 
            }
        });
    }

    getGameState() {
        return this.game;
    }


    selectClueTile(handle, tile) {
        const player = this.game.players[handle];
        if (!player.selectedClueTiles.includes(tile)) {
            player.selectedClueTiles.push(tile);
            for (let i = 0; i < player.clueTiles.length; i++) {
                if (tile._id === player.clueTiles[i]._id) {
                    player.clueTiles.splice(i, 1);
                }
            }
        }

    }

    unselectClueTile(handle, tile) {
        const player = this.game.players[handle];
        if (!player.clueTiles.includes(tile)) {
            player.clueTiles.push(tile);
            for (let i = 0; i < player.selectedClueTiles.length; i++) {
                if (tile._id === player.selectedClueTiles[i]._id) {
                    player.selectedClueTiles.splice(i, 1);
                }
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
        currentPlayer.submitedGuess = true;
        localPlayer.guessedWord = guessedWord;
        // localPlayer.fish = "fish";

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


        if (this.game.currentPlayerTurn === this.playerCount + 1) {
            this.startRound();
        }
    }

    unrevealClue(handle) {
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

module.exports = DemoRoom;