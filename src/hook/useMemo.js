import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'

let ch

const Child1 = ({ a }) => {
  console.log('Child1 重新渲染')
  return <h2>{a}</h2>
}

function Parent({ a, b }) {
  const child1 = useMemo(
    () => (
      <div>
        {console.log('这是一个复杂的计算')}
        <Child1 a={b} />
      </div>
    ),
    [a]
  )

  console.log('是否相等：', child1 === ch)

  const child2 = (
    <div>
      {console.log('child2 重新计算')}
      <Child1 a={b} />
    </div>
  )

  return (
    <React.Fragment>
      {child1}
      {child2}
    </React.Fragment>
  )
}

const App = props => {
  const [a, setA] = React.useState(0)
  const [b, setB] = React.useState(0)

  return (
    <div>
      <Parent a={a} b={b} />
      <button onClick={() => setA(a + 1)}>改变a</button>
      <button onClick={() => setB(b + 1)}>改变b</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
