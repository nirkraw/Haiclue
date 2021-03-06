import React from "react";
import "../css/layout.css";
import "../css/current_clue.css";
import Tile from "../tile_bank/tile";
import Timer from "../timer/timer";

const CurrentClue = (props) => {
  const { gameState, socket } = props;
  if (!gameState) return null;
  if (gameState.over) return null;

  const currentPlayer = Object.values(gameState.players).filter((player) => {
    return player.number === gameState.currentPlayerTurn;
  })[0];

  const localPlayer = Object.values(gameState.players).filter((player) => {
    return player.socketId === socket.id;
  })[0];

  const tiles = currentPlayer.selectedClueTiles;
  const currentClue = tiles.map((tile, index) => {
    if (typeof tile === "string") {
      return <br key={index * 1000} />;
    }
    return (
      <Tile
        key={index}
        phase={gameState.phase}
        tile={tile}
        currentColor={gameState.currentColor}
        display={tile.display}
        type="bank"
      />
    );
  });

  let selectorTri = (
    <svg
      width="100%"
      height="80px"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className="selector-tri"
    >
      <path
        d="M -200 100 L 600 100 L 200 300 z"
        fill="white"
        stroke="rgb(70, 70, 70)"
      />
    </svg>
  );

  if (
    gameState.phase === "clue guessing" &&
    localPlayer.socketId !== currentPlayer.socketId &&
    !localPlayer.submittedGuess
  ) {
    return (
      <div className="currentClue">
        <div>
          {gameState.timer ? (
            <Timer
              phase={"submit guess"}
              secs={5}
              socket={socket}
              roomName={gameState.roomName}
              localPlayerSocketId={localPlayer.socketId}
              currentPlayerSocketId={currentPlayer.socketId}
            />
          ) : (
            <div></div>
          )}
        </div>
        {selectorTri}
        <h1>Guess {currentPlayer.handle}'s Clue!</h1>
        {currentClue}
      </div>
    );
  } else if (
    gameState.phase === "clue guessing" &&
    localPlayer.socketId === currentPlayer.socketId
  ) {
    return (
      <div className="currentClue">
        <h1>Your clue is being guessed!</h1>
        {currentClue}
      </div>
    );
  } else if (
    gameState.phase === "clue guessing" &&
    localPlayer.socketId !== currentPlayer.socketId &&
    localPlayer.submittedGuess
  ) {
    return (
      <div className="currentClue">
        <h1>Waiting for other players to guess!</h1>
      </div>
    );
  } else {
    return null;
  }
};

export default CurrentClue;
