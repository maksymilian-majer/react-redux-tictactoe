import {combineReducers} from 'redux'
import stepsOrder from "./stepsOrder";
import history from "./history";


const ticTacToeApp = combineReducers({
    history,
    stepsOrder
});

export default ticTacToeApp;