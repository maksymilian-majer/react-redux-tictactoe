import React from "react";
import PropTypes from "prop-types";
import Move from "./Move";

const Moves = ({history, stepNumber, orderStepsAsc, onSelectMove, onToggleOrder}) => {
    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move:
            'Go to history start';


        return (
            <Move key={move} move={move} desc={desc} isSelected={move === stepNumber} onSelectMove={onSelectMove} />
        );
    });

    if (!orderStepsAsc) {
        moves.reverse();
    }

    return (<ol>
        {moves}
        <div>
            <input id="toggleOrdering" type="checkbox"
                   checked={orderStepsAsc}
                   onChange={() => onToggleOrder(!orderStepsAsc)}/>
            <label htmlFor="toggleOrdering">Ascending order of steps</label>
        </div>
    </ol>);
};

Moves.propTypes = {
    history: PropTypes.array.isRequired,
    stepNumber: PropTypes.number.isRequired,
    orderStepsAsc: PropTypes.bool.isRequired,
    onSelectMove: PropTypes.func.isRequired
};

export default Moves;