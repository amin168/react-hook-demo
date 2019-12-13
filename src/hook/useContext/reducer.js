import React, { useReducer } from 'react'

const initialState = { count: 0 }
const CountContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState

    case 'increment':
      return { count: state.count + 1 }

    case 'decrement':
      return { count: state.count - 1 }
    default:
      return state
  }
}

const CountContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <CountContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CountContext.Provider>
  )
}

export { reducer, CountContext, CountContextProvider }
