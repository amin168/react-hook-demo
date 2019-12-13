import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'

function TextInputWithFocusButton() {
  const inputEl = useRef()
  const onButtonClick = () => {
    inputEl.current.focus()
  }

  return (
    <React.Fragment>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}> Focus the input </button>
    </React.Fragment>
  )
}

const App = props => {
  const [count, setCount] = useState(1)
  return (
    <div>
      {count}
      <TextInputWithFocusButton />
      <button onClick={() => setCount(count + 1)}>count + 1 </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
