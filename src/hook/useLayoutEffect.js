import React, {
  useImperativeHandle,
  useEffect,
  useLayoutEffect,
  useState,
  useDebugValue
} from 'react'
import ReactDOM from 'react-dom'

function Com1() {
  useEffect(() => {
    console.log('Com1 useEffect 执行...')
    return () => {
      console.log('Com1 useEffect 销毁')
    }
  })

  useLayoutEffect(() => {
    console.log('Com1 useLayoutEffect 执行...')
    return () => {
      console.log('Com1 useLayoutEffect 销毁')
    }
  })

  return (
    <div>
      {console.log('Com1 渲染')}
      <h2>Com1</h2>
    </div>
  )
}

class App1 extends React.Component {
  state = { count: 0 }
  setCount = () => {
    this.setState({ count: this.state.count + 1 })
  }

  componentDidMount() {
    console.log('App1 componentDidMount')
  }

  componentDidUpdate() {
    console.log('App1 componentDidUpdate')
  }

  render() {
    return (
      <div>
        {<Com1 />}
        {this.state.count}
        <button onClick={this.setCount}>count + 1</button>
        {console.log('App 渲染')}
      </div>
    )
  }
}

// App 渲染
// Com1 渲染
// Com1 useLayoutEffect 执行...
// App1 componentDidMount
// Com1 useEffect 执行...

// App 渲染
// Com1 渲染
// Com1 useLayoutEffect 销毁
// Com1 useLayoutEffect 执行...
// App1 componentDidUpdate
// Com1 useEffect 销毁
// Com1 useEffect 执行...

function useMyHook() {
  const [count, setCount] = useState(0)
  useDebugValue(count > 5 ? 'count >5' : 'count <5')
  const mySetCount = () => {
    setCount(count + 2)
  }
  return [count, mySetCount]
}

function App() {
  const [count, mySetCount] = useMyHook()
  return (
    <div>
      <App1 />
      {count}
      <button onClick={() => mySetCount()}>count + 1</button>
    </div>
  ) 
}

ReactDOM.render(<App />, document.getElementById('root'))
