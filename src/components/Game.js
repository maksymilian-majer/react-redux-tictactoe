import React from 'react';
import PropTypes from 'prop-types';

import Board from './Board';
import MovesContainer from "../containers/MovesContainer";

const Game = ({
                  squares,
                  winners,
                  status,
                  handleClick
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
            <MovesContainer />
        </div>
    </div>
);

Game.propTypes = {
    squares: PropTypes.array.isRequired,
    winners: PropTypes.array,
    status: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Game;