import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import Board from './Board';

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

const Moves = ({history, stepNumber, jumpTo}) => {
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
            <Move move={move} desc={desc} isSelected={move === stepNumber} jumpTo={jumpTo} />
        );
    });

    if (!this.state.orderStepsAsc) {
        moves.reverse();
    }

    return moves;
};

Moves.propTypes = {
    history: PropTypes.array.isRequired,
    stepNumber: PropTypes.number.isRequired,
    jumpTo: PropTypes.func.isRequired
};

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
                <Moves history={history} stepNumber={stepNumber} jumpTo={jumpTo} />
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

class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                selectedIndex: null
            }],
            xIsNext: true,
            stepNumber: 0,
            orderStepsAsc: true,
        };
    }

    jumpTo(step) {
        this.setState({
            ...this.state,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                selectedIndex: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const stepNumber = this.state.stepNumber;
        const current = history[stepNumber];
        const winners = calculateWinner(current.squares);

        const draw = current.squares.every(x => !!x) && !winners;

        let status;
        if (draw) {
            status = 'The game is draw';
        } else if (winners) {
            const [winner] = winners;
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + ' (' + getRow(step.selectedIndex) + ', ' + getCol(step.selectedIndex) + ')':
                'Go to game start';

            if (move === stepNumber) {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>
                            <strong>{desc}</strong>
                        </button>
                    </li>
                );
            } else {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>
                            {desc}
                        </button>
                    </li>
                );
            }

        });

        if (!this.state.orderStepsAsc) {
            moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        winners={winners}
                        onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ moves }</ol>
                    <div>
                        <input id="toggleOrdering" type="checkbox"
                               checked={this.state.orderStepsAsc}
                               onChange={() => this.handleOrderingToggle()}/>
                        <label htmlFor="toggleOrdering">Ascending order of steps</label>
                    </div>
                </div>
            </div>
        );
    }

    handleOrderingToggle() {
        this.setState({
            orderStepsAsc: !this.state.orderStepsAsc,
        })
    }
}

function getRow(i) {
    return Math.floor(i/3) + 1;
}

function getCol(i) {
    return i % 3 + 1;
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [a, b, c];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <GameContainer />,
    document.getElementById('root')
);
registerServiceWorker();
