import React from 'react'
import PropTypes from 'prop-types'

import './Square.css'

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
    value: PropTypes.string
};

export default Square;