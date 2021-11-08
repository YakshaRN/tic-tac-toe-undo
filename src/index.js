import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  // console.log('props value changed '+props.value);
  return (
    <button className="square" onClick={props.whenClicked}>
      {props.value}
    </button>
  );
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
      return squares[a];
    }
  }
  return null;
}
class Board extends React.Component {

  renderSquare(i) {
    return <Square 
            value={this.props.gameState[i]} 
            whenClicked={()=>this.props.asClick(i)}
          />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      history : [{squares: Array(9).fill(null)}],
      xIsNext : true
    };
  }
  
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i])
    return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext
    });
    console.log('after setting state value of history  : '+i);
  }

  undo() {
    console.log('position = '+this.state.history.length);
    if(this.state.history.length===1)
      return;
    const history = this.state.history.slice(0, this.state.history.length-1);
    this.setState({
      history: history,
      xIsNext: !this.state.xIsNext,
    });
  }

  start() {
    this.setState({
      history : [{squares: Array(9).fill(null)}],
      xIsNext : true
    });
  }

  render() {
    console.log('GAme render called');
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            gameState={current.squares}
            asClick={
              (i) => {
                console.log('value of square selected from game : '+i+ 'history size = '+this.state.history.length);
                this.handleClick(i);
                console.log('history size = '+this.state.history.length);
              }
            }
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.undo()}>Undo</button>
          <button onClick={() => this.start()}>Restart</button>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

