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
        // this.unrevealClue = this.unrevealClue.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.storeTiles = this.storeTiles.bind(this);
        this.guessingPhase = this.guessingPhase.bind(this);
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
            number: 0, 
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
            guessIndex: null
        };

        player.number = Object.values(this.game.players).length + 1;
        this.game.players[socketId] = player;
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

        console.log("START ROUND")
        this.resetPlayersSubmittedClue();
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
        
        const tiles = this.game.tiles.slice(0, 49);
        const targetWords = tiles.slice(0, 4); //flat - spy , horn -badge , hurting - smart , oil - brains
        const allClueTiles = tiles.slice(4, 49);
        
        this.createTargetWords(targetWords);
        this.assignPlayersTargetWord();
        this.assignPlayersClueTiles(allClueTiles);

        const khaleel = this.game.players["2"];
        const sara = this.game.players["3"];

        
        
    
        if (this.game.round === 1) {
            setTimeout(() => {
                this.submitClue("2");
                khaleel.selectedClueTiles = 
                [
                    khaleel.clueTiles[5], khaleel.clueTiles[6], "1", 
                    khaleel.clueTiles[11], khaleel.clueTiles[12]
                ];
            }, 5000);
            setTimeout(() => { 
                this.submitClue("3");
                sara.selectedClueTiles = 
                [
                    sara.clueTiles[7], "1", 
                    sara.clueTiles[6], "2",
                    sara.clueTiles[11], sara.clueTiles[14]
                ];
            }, 7000);
        } else {
            setTimeout(() => {
                this.submitClue("2");
                khaleel.selectedClueTiles =
                    [
                        khaleel.clueTiles[6], khaleel.clueTiles[9], "1",
                        khaleel.clueTiles[1]
                    ];
            }, 7000);
            setTimeout(() => {
                this.submitClue("3");
                sara.selectedClueTiles =
                    [
                        sara.clueTiles[10], sara.clueTiles[6], "1",
                        sara.clueTiles[12], sara.clueTiles[5], "2",
                        sara.clueTiles[2]
                    ];
             }, 9000);
        }
        // this.guessingPhase();
    }

    resetPlayersSubmittedClue() {
        Object.values(this.game.players).forEach((player) => {
            player.submittedClue = false;
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
                player.clueTiles = allClueTiles.slice(0, 15); 
            }
            if (player.number === 2) {
                player.clueTiles = allClueTiles.slice(15, 30); 
            }
            if (player.number === 3) {
                player.clueTiles = allClueTiles.slice(30, 45); 
            }
        });
    }

    getGameState() {
        return this.game;
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
            this.guessingPhase();
        }
        
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    guessingPhase() {
        console.log("GUESSING PHASE")
        const humanPlayer = Object.values(this.game.players).filter((player) => {
           return player.number === 1;
        })[0];
        const humanSocket = humanPlayer.socketId

        // const humanSocket = Object.values(this.game.players)[0].socketId;
        if ((this.game.round === 1)) {
            if (this.game.currentPlayerTurn === 1) {
                setTimeout(() => {
                    this.submitGuess("2", true, humanSocket, "oil", 2);
                    this.submitGuess("3", false, humanSocket, "flat", 0);
                }, 5000);
            } else if (this.game.currentPlayerTurn === 2){
                setTimeout(() => {
                    this.submitGuess("3", false, "2", "oil", 2);
                }, 5000);
            } else {
                setTimeout(() => {
                    this.submitGuess("2", true, "3", "flat", 0);
                }, 5000);
            }
        } else {
            console.log("ROUND2");
            if (this.game.currentPlayerTurn === 1) {
                // spy badge brains smart 
                setTimeout(() => {
                    this.submitGuess("2", false, humanSocket, "smart", 3);
                    this.submitGuess("3", false, humanSocket, "spy", 0);
                }, 5000);
            } else if (this.game.currentPlayerTurn === 2) {
                setTimeout(() => {
                    this.submitGuess("3", true, "2", "badge", 1);
                }, 5000);
            } else {
                setTimeout(() => {
                    this.submitGuess("2", false, "3", "brains", 2);
                }, 5000);
            }
        }

    }

    submitGuess(localPlayerSocketId, matchBoolean, currentPlayerSocketId, guessedWord, guessedIndex) {
        console.log("SUBMIT GUESS")
        const localPlayer = this.game.players[localPlayerSocketId];
        const currentPlayer = this.game.players[currentPlayerSocketId];

        localPlayer.submittedGuess = true;
        localPlayer.guessedWord = guessedWord;
        localPlayer.guessIndex = guessedIndex;

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
                player.submittedGuess = false;
            });

            currentPlayer.correctWord = currentPlayer.targetWord[this.game.currentColor];
            currentPlayer.revealedClue = true;
            setTimeout(() => {
                currentPlayer.revealedClue = false
            }, 5000);
            this.game.currentPlayerTurn++;
            this.game.clueGuessCount = 0;
             if (this.game.currentPlayerTurn === this.playerCount + 1) {
            setTimeout(() => {
                this.startRound();
            }, 5000);
            } else {
                this.guessingPhase();
            }
        }


        // if (this.game.currentPlayerTurn === this.playerCount + 1) {

        //     // setTimeout(() => {
        //         this.startRound();
        //     // }, 5000);
        // }
    }

    // unrevealClue(socketId) {
    //     const player = this.game.players[socketId];
    //     player.revealedClue = false;
    // }

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