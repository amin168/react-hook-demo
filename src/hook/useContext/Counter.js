import React from 'react'
import { CountContext } from './reducer'

function Counter() {
  const { state, dispatch } = React.useContext(CountContext)

  return (
    <div>
      Counter count: {state.count} <br />
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button> 
      <button onClick={() => dispatch({ type: 'increment' })}>+</button> 
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button> 
    </div>
  )
}

export default Counter
