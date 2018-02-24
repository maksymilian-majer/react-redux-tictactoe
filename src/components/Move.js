import React from "react";
import PropTypes from "prop-types";

const Move = ({move, desc, isSelected, jumpTo}) => {
    if (isSelected) {
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    <strong>{desc}</strong>
                </button>
            </li>
        );
    } else {
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    }
};

Move.propTypes = {
    move: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    jumpTo: PropTypes.func.isRequired
};

export default Move;