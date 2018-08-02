import React, {Component} from 'react'
import MiniBoard from './MiniBoard'
import gameArr from '../../lib/gameArr'

class MainBoard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameArr: gameArr
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    this.setState = () => {
        
    }
    if (this.props.player) {
      return (
        e.target.style.backgroundColor = 'red'
      )
    } else {
      return (
        e.target.style.backgroundColor = 'blue'
      )
    }
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
