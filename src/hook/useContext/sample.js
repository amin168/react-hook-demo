import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SampleContext = React.createContext()

const Sample = prop => {
  const { count, setCount } = React.useContext(SampleContext)

  return (
    <div>
      {count} <br />
      <button onClick={() => setCount(count + 1)}>count+1</button>
    </div>
  )
}

const App = props => {
  const [count, setCount] = useState(0)
  return (
    <SampleContext.Provider value={{ count, setCount }}>
      <div>
        <Sample />
      </div>
    </SampleContext.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
