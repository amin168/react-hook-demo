import React, { useRef, useState, forwardRef } from 'react'
import ReactDOM from 'react-dom'

/**
 * forwardRef 的基础概念，返回一个组件
 * 把它收到的 ref 转发给子组件
 *
 * Ref 转发是一种自动将 ref 通过组件传递给子组件的技术
 */

const FancyButton = React.forwardRef((props, ref) => (
  <div>
    <input ref={ref} />
    <button>{props.children}</button>
  </div>
))

function App() {
  const ref = React.createRef()
  const handleClick = React.useCallback(() => ref.current.focus(), [])
  return (
    <div>
      <FancyButton ref={ref}>Click me</FancyButton>
      <button onClick={handleClick}>Get foucs</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
