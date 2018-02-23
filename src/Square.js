import React from 'react'
import PropTypes from 'prop-types'

const Square = ({isWinner, value, onClick}) => {
    if (isWinner) {
        return (
            <button className="square winner" onClick={onClick}>
                {value}
            </button>
        );
    } else {
        return (
            <button className="square" onClick={onClick}>
                {value}
            </button>
        );
    }
};

Square.propTypes = {
    onClick: PropTypes.func.isRequired,
    isWinner: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired
};

export default Square;