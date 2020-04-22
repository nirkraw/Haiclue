import { connect } from "react-redux";
import Tester from "./tester";
import { startingTiles } from "../../reducers/selectors";
import { fetchTiles } from "../../actions/tile_actions";

const mapStateToProps = (state) => {
  return {
    tiles: startingTiles(state), // 64 random tiles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTiles: () => dispatch(fetchTiles()),
  };
};

const TesterContainer = connect(mapStateToProps, mapDispatchToProps)(Tester);
export default TesterContainer; 
