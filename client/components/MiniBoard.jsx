import React from 'react'

const MiniBoard = (props) => {
  return (
    <div className='miniBoard'>
      <div className='topRow'>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={0} className='cell'></div>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={1} className='tM cell'></div>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={2} className='cell'></div>
      </div>
      <div className='clear'></div>
      <div className='midRow'>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={3} className='mL cell'></div>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={4} className='mM cell'></div>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={5} className='mR cell'></div>
      </div>
      <div className='clear'></div>
      <div className='botRow'>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={6} className='cell'></div>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={7} className='bM cell'></div>
        <div onClick={props.handleClick} cellinfo = {[false,false,true]}value={8} className='cell'></div>
      </div>
      <div className='clear'></div>
    </div>
  )
}

export default MiniBoard
