import React, { Component } from 'react'

import Cell from './Cell'

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nColumns: 5,
    chanceLightStartsOn: 0.25,
  }
  constructor(props) {
    super(props)
    this.state = {
      board: this.createBoard(),
      gameOver: false,
    }
    this.flipCellsAround = this.flipCellsAround.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  createBoard() {
    return Array.from({ length: this.props.nRows }, () =>
      Array.from(
        { length: this.props.nColumns },
        () => Math.random() < this.props.chanceLightStartsOn
      )
    )
  }

  flipCellsAround(coord) {
    const { nColumns, nRows } = this.props
    let board = this.state.board

    let [x, y] = coord.split('-').map(Number)

    function flipCell(x, y) {
      if (x >= 0 && x < nRows && y >= 0 && y < nColumns) {
        board[x][y] = !board[x][y]
      }
    }

    flipCell(x, y)
    flipCell(x + 1, y)
    flipCell(x - 1, y)
    flipCell(x, y + 1)
    flipCell(x, y - 1)

    this.setState({ board })

    if (!this.state.board.flat().includes(true)) {
      this.setState({ gameOver: true })
    }
  }

  handleClick() {
    this.setState({ board: this.createBoard(), gameOver: false })
  }

  render() {
    {
      while (!this.state.gameOver)
        return (
          <main className="flex h-screen items-center">
            <section className={`grid grid-rows-5 gap-2 mx-auto`}>
              {this.state.board.map((_, row) => (
                <div key={row} className="flex flex-row gap-2">
                  {this.state.board[row].map((value, column) => (
                    <Cell
                      flipCellsAroundMe={this.flipCellsAround}
                      isLit={value}
                      key={`${row}-${column}`}
                      data-key={`${row}-${column}`}
                    />
                  ))}
                </div>
              ))}
            </section>
          </main>
        )
    }

    return (
      <section className="flex flex-col h-screen items-center justify-center">
        <h2 className="text-4xl font-bold tracking-wider text-white mb-6 uppercase">
          Victory
        </h2>
        <button onClick={this.handleClick} className="btn animate-pulse">
          Reset game
        </button>
      </section>
    )
  }
}

export default Board
