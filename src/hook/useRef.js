import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef(0)

  useEffect(() => {
    prevCountRef.current = count
    console.log('Counter 我是后执行的')
  })

  const prevCount = prevCountRef.current

  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      {console.log('Counter 我是先执行的')}
      <button onClick={() => setCount(count + 1)}>update count</button>
    </div>
  )
}

class Counter1 extends React.Component {
  state = { count: 0 }
  prevCount = 0

  componentDidUpdate() {
    console.log('Counter1 我是后执行的')
    this.prevCount = this.state.count
  }

  render() {
    return (
      <div>
        <h1>
          Now: {this.state.count}, before: {this.prevCount}
        </h1>
        {console.log('Counter1 我是先执行的')}
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          update count
        </button>
      </div>
    )
  }
}

const Ref = { current: null }

function Counter2() {
  const [count, setCount] = useState(0)
  const prevCountRef = Ref

  useEffect(() => {
    prevCountRef.current = count
    console.log('Counter2 我是后执行的')
  })

  const prevCount = prevCountRef.current

  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      {console.log('Counter2 我是先执行的')}
      <button onClick={() => setCount(count + 1)}>update count</button>
    </div>
  )
}

const App = props => {
  const [show, setShow] = useState(1)
  return (
    <div>
      {show ? <Counter /> : null}
      <hr />
      {show ? <Counter1 /> : null}
      <hr />
      {show ? <Counter2 /> : null}
      <hr />
      <button onClick={() => setShow(!show)}>reload</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
