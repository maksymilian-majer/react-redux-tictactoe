import {combineReducers} from 'redux'
import {StepsOrder} from "./viewStates";
import {SELECT_SQUARE, SELECT_STEP, SET_STEPS_ORDER} from "./actionTypes";


function getInitialHistory() {
    return [{
        squares: Array(9).fill(null),
        selectedIndex: null
    }];
}

function stepsOrder(state = StepsOrder.ASC, action) {
    switch (action.type) {
        case SET_STEPS_ORDER:
            return action.order;
        default:
            return state;
    }
}

function stepNumber(state = getInitialHistory(), action) {
    switch (action.type) {
        case SELECT_STEP:
            return action.stepNumber;
        case SELECT_SQUARE:
            return state.length;
        default:
            return state.length - 1;
    }
}

function xIsNext(state = getInitialHistory(), action) {
    switch (action.type) {
        case SELECT_STEP:
            return (action.stepNumber % 2) === 0;
        case SELECT_SQUARE:
            return (state.length % 2) === 0;
        default:
            return ((state.length - 1) % 2) === 0;
    }
}

function history(state = getInitialHistory(), action) {
    switch (action.type) {
        case SELECT_SQUARE:
            const history = state.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.slice();
            squares[action.index] = xIsNext(state, action) ? 'X' : 'O';
            return history.concat([{
                squares,
                selectedIndex: action.index
            }]);
        default:
            return state;
    }
}

function game(state = {
    history: getInitialHistory(),
    xIsNext: true,
    stepNumber: 0,
}, action) {
    return {
        history: history(state.history, action),
        xIsNext: xIsNext(state.history, action),
        stepNumber: stepNumber(state.history, action),
    }
}

const ticTacToeApp = combineReducers({
    game,
    stepsOrder
});

export default ticTacToeApp;