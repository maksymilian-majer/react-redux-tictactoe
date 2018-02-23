import React from "react";
import PropTypes from 'prop-types';

import Square from "./Square";

const Board = ({squares, winners, onClick}) => {
    function renderSquare(i) {
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                isWinner={!!winners && winners.includes(i)}
            />
        );
    }

    function renderRow(i) {
        let cols = [];
        for (let col = 0; col < 3; col++) {
            cols.push(renderSquare(i + col))
        }
        return cols;
    }

    return squares.map((val, i) => {
        if (i % 3 === 0) {
            const row = i / 3;
            return (
                <div key={row} className="board-row">
                    {renderRow(i)}
                </div>
            );
        }

        return null;
    });
};

Board.propTypes = {
    squares: PropTypes.array.isRequired,
    winners: PropTypes.array,
};

export default Board;