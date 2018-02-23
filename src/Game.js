import React from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import Moves from './Moves';

const Game = ({
                  history,
                  stepNumber,
                  squares,
                  winners,
                  status,
                  orderStepsAsc,
                  jumpTo,
                  handleClick,
                  handleOrderingToggle
              }) => (
    <div className="game">
        <div className="game-board">
            <Board
                squares={squares}
                winners={winners}
                onClick={(i) => handleClick(i)}/>
        </div>
        <div className="game-info">
            <div>{status}</div>
            <ol>
                <Moves
                    history={history}
                    stepNumber={stepNumber}
                    orderStepsAsc={orderStepsAsc}
                    jumpTo={jumpTo} />
            </ol>
            <div>
                <input id="toggleOrdering" type="checkbox"
                       checked={orderStepsAsc}
                       onChange={() => handleOrderingToggle()}/>
                <label htmlFor="toggleOrdering">Ascending order of steps</label>
            </div>
        </div>
    </div>
);

Game.propTypes = {
    history: PropTypes.array.isRequired,
    stepNumber: PropTypes.number.isRequired,
    squares: PropTypes.array.isRequired,
    winners: PropTypes.array,
    status: PropTypes.string.isRequired,
    orderStepsAsc: PropTypes.bool.isRequired,
    jumpTo: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleOrderingToggle: PropTypes.func.isRequired
};

export default Game;