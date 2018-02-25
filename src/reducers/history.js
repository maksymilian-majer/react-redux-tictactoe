import {SELECT_SQUARE, SELECT_STEP} from "../actions/actionTypes";
import {calculateWinner, xIsNext} from "../services/game";


function getInitialHistory() {
    return [Array(9).fill(null)];
}


function history(state = getInitialHistory(), action) {
    let history;
    switch (action.type) {
        case SELECT_STEP:
            history = action.stepNumber > 0 ? state.slice(0, action.stepNumber + 1) : getInitialHistory();
            return history;
        case SELECT_SQUARE:
            history = state.slice();
            const current = history[history.length - 1];
            const squares = current.slice();

            if (calculateWinner(squares) || squares[action.index]) {
                return state;
            }

            squares[action.index] = xIsNext(history) ? 'X' : 'O';

            return history.concat([squares]);
        default:
            return state;
    }
}

export default history;