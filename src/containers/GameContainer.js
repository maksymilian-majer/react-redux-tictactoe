import {connect} from 'react-redux'
import Game from '../components/Game';
import {selectSquare, selectStep} from "../actions";
import {calculateWinner, xIsNext} from "../services/game";

const mapStateToProps = (state) => {
    const history = state.history;
    const stepNumber = state.history.length;
    const current = history[stepNumber - 1];
    const winners = calculateWinner(current);

    const draw = current.every(x => !!x) && !winners;

    let status;
    if (draw) {
        status = 'The history is draw';
    } else if (winners) {
        const [winner] = winners;
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext(history) ? 'X' : 'O');
    }
    
    return {
        history: history,
        stepNumber: stepNumber,
        squares: current,
        winners: winners,
        status: status
    }
};

const mapDispatchToProps = {
    onSelectMove: selectStep,
    handleClick: selectSquare
};

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);

export default GameContainer;