import React, {Component} from '../../../../.cache/typescript/2.9/node_modules/@types/react'
import {HashRouter as Router, Route, Link} from '../../../../.cache/typescript/2.9/node_modules/@types/react-router-dom'

import PlayerSelect from './PlayerSelect'
import MainBoard from './MainBoard'
// import Title from './Title'
import ScoreBoard from './ScoreBoard'

class TheGame extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: false,
      player1: '',
      player2: '',
      style1: {},
      style2: {}
    }
    this.handleClick = this.handleClick.bind(this)
    this.nameCallback = this.nameCallback.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
  }

  componentDidMount () {
    this.changeStyle()
  }

  handleClick () {
    if (!this.state.player) {
      this.setState({
        player: true
      })
    } else {
      this.setState({
        player: false
      })
    }
    this.changeStyle()
  }

  changeStyle () {
    if (this.state.player) {
      this.setState({style1: {backgroundColor: 'red'}})
      this.setState({style2: {backgroundColor: 'white'}})
    } else {
      this.setState({style1: {backgroundColor: 'white'}})
      this.setState({style2: {backgroundColor: 'blue'}})
    }
  }

  nameCallback (playerNames) {
    let {player1, player2} = playerNames
    this.setState({
      player1: player1,
      player2: player2
    })
  }

  render () {
    let player = this.state.player
    return (
      <Router>
        <div>
          <Link to='/'><h1 className='title' >Ultimate noughts and crosses</h1></Link>
          <Route exact path='/' render={() =>
            <PlayerSelect callback={this.nameCallback}/>} />
          <div onClick={this.handleClick}>
            <Route path='/game' render={() =>
              <MainBoard player={player}/>} />
          </div>
          <ScoreBoard mainState={this.state}/>
        </div>
      </Router>
    )
  }
}

export default TheGame
