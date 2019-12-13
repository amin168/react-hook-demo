import React, { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'

let g_fn1 = null
let g_fn2 = null

// https://www.cnblogs.com/chenjg/p/10327304.html
// class ExpensiveComponent1 extends React.PureComponent {
//   render() {
//     const date = new Date()

//     return (
//       <h1 onClick={this.props.onClick}>
//         {date.getSeconds()}我是一个昂贵的组件!渲染耗时
//       </h1>
//     )
//   }
// }

const ExpensiveComponent = React.memo(({ onClick }) => {
  const date = new Date()
  return (
    <h1 onClick={onClick}>{date.getSeconds()} 我是一个昂贵的组件!渲染耗时</h1>
  )
})

function Com1({ p1 }) {
  const fn1 = () => console.log('fn1')
  console.log('Com1:', Object.is(g_fn1, fn1))
  g_fn1 = fn1
  return <ExpensiveComponent onClick={fn1} />
}

// 只有在p1修改后，才会重新渲染
function Com2({ p2 }) {
  // eslint-disable-next-line
  const fn2 = useCallback(() => console.log('useCallback - fn2'), [p2])

  console.log('Com2:', Object.is(g_fn2, fn2))
  g_fn2 = fn2
  return <ExpensiveComponent onClick={fn2} />
}

const App = props => {
  const [p1, setP1] = useState(0)
  const [p2, setP2] = useState(0)
  return (
    <div>
      <h2>每次点击 fn1 都是新的</h2>
      <Com1 p1={p1} />
      <button onClick={() => setP1(p1 + 1)}>p1 + 1</button>
      <hr />
      <h2>不用重复生成f2</h2>
      <Com2 p2={p2} />
      <button onClick={() => setP2(p2 + 1)}>p2 + 1</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
