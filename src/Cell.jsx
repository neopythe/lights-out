import React, { Component } from 'react'

import './Cell.css'

class Cell extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.flipCellsAroundMe(this.props['data-key'])
  }

  render() {
    let classes = `Cell ${this.props.isLit && 'Cell-lit animate-pulse'}`

    return <div className={classes} onClick={this.handleClick} />
  }
}

export default Cell
