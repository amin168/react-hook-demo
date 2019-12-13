import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))

  return <input type="text" ref={inputRef} />
}

/**
 * 括号中的FancyInput 是一个渲染函数，并非函数组件
 */
FancyInput = forwardRef(FancyInput)

const App = props => {
  const fancyInput = useRef()
  return (
    <div>
      <FancyInput ref={fancyInput} />
      <hr />
      <button onClick={() => fancyInput.current.focus()}>
        父组件调用子组件的focus
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))