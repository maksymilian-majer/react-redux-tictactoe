import {StepsOrder} from "./viewStates";

const initialState = {
    history: [{
        squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0,
    stepsOrder: StepsOrder.ASC,
};

function ticTacToeApp(state, action) {
    if (typeof state === 'undefined') {
        return initialState
    }

    // For now, don't handle any actions
    // and just return the state given to us.
    return state
}