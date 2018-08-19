import React, {Component} from 'react'

class Victory extends Component {
  constructor (props) {
    super(props)
    this.rematch = this.rematch.bind(this)
    this.newGame = this.newGame.bind(this)
    this.noMore = this.noMore.bind(this)
  }

  rematch () {
    let state = this.props.state
    let player1 = {
      name: state.player1.name,
      color: state.player1.color,
      symbol: 'X',
      score: 0}
    let player2 = {
      name: state.player2.name,
      color: state.player2.color,
      symbol: 'O',
      score: 0}
    this.props.playAgain(false, player1, player2)
  }

  newGame () {
    this.props.playAgain(true)
  }

  noMore () {
    return alert("What's wrong ... you chicken?")
  }
  render () {
    return (
      <div className='victory'>
        <div>
          <span>{this.props.state.victor}</span>
        </div>
        <button className=' btn rematch' onClick={this.rematch}>Rematch</button>
        <button className=' btn newGame' onClick={this.newGame}>New Game</button>
        <button className=' btn noMore' onClick={this.noMore}>No More</button>
      </div>
    )
  }
}

export default Victory
