import React from 'react'
import ReactDOM from 'react-dom'
import { CountContextProvider } from './reducer'

import Counter from './Counter'

const App = () => {
  return (
    <CountContextProvider>
      <Counter />
    </CountContextProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
