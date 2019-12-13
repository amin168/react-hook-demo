import React from 'react'
import ReactDOM from 'react-dom'
import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return { count: action.payload }

    case 'increment':
      return { count: state.count + 1 }

    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function init(initialCountState) {
  return { count: initialCountState.count + 1 }
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)

  return (
    <React.Fragment>
      Count:{state.count} <br />
      <button
        onClick={() => dispatch({ type: 'reset', payload: initialCount.count })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </React.Fragment>
  )
}

const App = props => (
  <div>
    <Counter initialCount={{ count: 1 }} />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
