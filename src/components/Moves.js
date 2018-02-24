import React from "react";
import PropTypes from "prop-types";
import Move from "./Move";

const Moves = ({history, stepNumber, orderStepsAsc, jumpTo}) => {
    function getRow(i) {
        return Math.floor(i/3) + 1;
    }

    function getCol(i) {
        return i % 3 + 1;
    }

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move + ' (' + getRow(step.selectedIndex) + ', ' + getCol(step.selectedIndex) + ')':
            'Go to game start';


        return (
            <Move key={move} move={move} desc={desc} isSelected={move === stepNumber} jumpTo={jumpTo} />
        );
    });

    if (!orderStepsAsc) {
        moves.reverse();
    }

    return moves;
};

Moves.propTypes = {
    history: PropTypes.array.isRequired,
    stepNumber: PropTypes.number.isRequired,
    orderStepsAsc: PropTypes.bool.isRequired,
    jumpTo: PropTypes.func.isRequired
};

export default Moves;