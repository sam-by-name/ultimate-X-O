import React, {Component} from 'react'
import MiniBoard from './MiniBoard'
import {gameArr} from '../../lib/gameArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameArr: gameArr
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {

    var cellInfo = e.target.attributes.cellinfo.value
    cellInfo = cellInfo.split(",")
    if (this.props.player) {
      cellInfo.push('red')
      e.target.style.backgroundColor = 'red'
    } else {
      cellInfo.push('blue')
      e.target.style.backgroundColor = 'blue'
    }
    enterCell = {
      isAlive: cellInfo[0],
      isPlayable: cellInfo[1],
      takenBy: cellInfo[5],
      lastTaken: cellInfo[2]
    }

    this.setState(
      gameArr[cellInfo[2]][cellInfo[3]] = enterCell
    )
    var i = 10
  }

  render () {
    return (
      <div className='mainBoard'>
        <div className='topRow'>
          <div className='fl'>   <MiniBoard handleClick={this.handleClick} value={0} /></div>
          <div className='fl tM'><MiniBoard handleClick={this.handleClick} value={1} /></div>
          <div className='fl'>   <MiniBoard handleClick={this.handleClick} value={2} /></div>
        </div>
        <div className='clear'></div>
        <div className='midRow'>
          <div className='fl mL'><MiniBoard handleClick={this.handleClick} value={3} /></div>
          <div className='fl mM'><MiniBoard handleClick={this.handleClick} value={4} /></div>
          <div className='fl mR'><MiniBoard handleClick={this.handleClick} value={5} /></div>
        </div>
        <div className='clear'></div>
        <div className='botRow'>
          <div className='fl'>   <MiniBoard handleClick={this.handleClick} value={6} /></div>
          <div className='fl bM'><MiniBoard handleClick={this.handleClick} value={7} /></div>
          <div className='fl'>   <MiniBoard handleClick={this.handleClick} value={8} /></div>
        </div>
        <div className='clear'></div>
      </div>
    )
  }
}

export default MainBoard
