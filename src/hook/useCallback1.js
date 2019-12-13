import React, { Component, useCallback } from 'react'
import ReactDOM from 'react-dom'

/**
 * Foo 类组件 没有使用箭头函数，会重新生成多个函数
 * Foo1 类组件中 使用bind绑定this，只有一个函数
 * Foo2 函数组件 反复生成多个handleClick
 * Foo3 函数组件 用userCallback 避免了重复生成handleClick
 */

class Foo extends Component {
  handleClick() {
    console.log('Foo Click happened')
  }

  render() {
    return (
      <button
        onClick={() => {
          this.handleClick()
        }}
      >
        Foo click me
      </button>
    )
  }
}

class Foo1 extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    console.log('Foo1 Click happened')
  }

  render() {
    return <button onClick={this.handleClick()}>Foo1 click me</button>
  }
}

function Foo2() {
  const handleClick = () => {
    console.log('Foo2 Click happened')
  }

  return <button onClick={handleClick}>Foo2 click me</button>
}

function Foo3() {
  const memoizedHandleClick = useCallback(
    () => console.log('useCallback click me'),
    []
  )
  return <button onClick={memoizedHandleClick}>Foo2 click me</button>
}

// 组件仅在它的props发生改变的时候进行重新渲染
const Parent = React.memo(({ a, c }) => {
  {
    console.log('Parent 渲染')
  }
  return (
    <div>
      a:{a}
      <br />
      <button onClick={c}>Parent Click</button>
    </div>
  )
})

const App = props => {
  const [a, setA] = React.useState(0)
  const [b, setB] = React.useState(0)

  const memoHandleClick = useCallback(() => console.log('App click'), [])

  return (
    <div>
      {console.log('App 渲染')}
      <Parent a={a} c={memoHandleClick}></Parent>
      <button onClick={() => setA(a + 1)}>Set A</button>
      <button onClick={() => setB(b + 1)}>Set B</button>
      <button onClick={memoHandleClick}>Click</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
