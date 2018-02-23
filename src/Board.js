import React from "react";
import PropTypes from 'prop-types';

import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isWinner={this.props.winners && this.props.winners.includes(i)}
            />
        );
    }

    renderRow(i) {
        let cols = [];
        for (let col = 0; col < 3; col++) {
            cols.push(this.renderSquare(i + col))
        }
        return cols;
    }

    render() {
        return this.props.squares.map((val, i) => {
            if (i % 3 === 0) {
                const row = i / 3;
                return (
                    <div key={row} className="board-row">
                        {this.renderRow(i)}
                    </div>
                );
            }

            return null;
        });
    }
}

Board.propTypes = {
    squares: PropTypes.array.isRequired,
    winners: PropTypes.array,
};

export default Board;