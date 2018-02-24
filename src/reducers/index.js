import {combineReducers} from 'redux'
import stepsOrder from "./stepsOrder";
import game from "./game";


const ticTacToeApp = combineReducers({
    game,
    stepsOrder
});

export default ticTacToeApp;