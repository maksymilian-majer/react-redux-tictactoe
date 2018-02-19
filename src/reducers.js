import {StepsOrder} from "./viewStates";
import {SELECT_SQUARE, SELECT_STEP, SET_STEPS_ORDER} from "./actionTypes";

const initialState = {
    history: [Array(9).fill(null)],
    xIsNext: true,
    stepNumber: 0,
    stepsOrder: StepsOrder.ASC,
};

function ticTacToeApp(state = initialState, action) {
    switch (action.type) {
        case SET_STEPS_ORDER:
            return {...state, stepsOrder: action.order};
        case SELECT_STEP:
            return {...state, stepNumber: action.stepNumber, xIsNext: (action.stepNumber % 2) === 0};
        case SELECT_SQUARE:
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            if (calculateWinner(squares) || squares[action.index]) {
                return;
            }
            squares[action.index] = this.state.xIsNext ? 'X' : 'O';
            return {
                history: history.concat(squares),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext,
            };
        default:
            return state
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return null;
}