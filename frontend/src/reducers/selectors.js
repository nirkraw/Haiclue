export const startingTiles = (state) => {
  const allTiles = Object.values(state.entities.tiles);
  const shuffleAndSlice = (arr, currentIndex = arr.length) => {
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
  };

  return shuffleAndSlice(allTiles);
};
