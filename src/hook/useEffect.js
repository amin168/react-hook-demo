import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

function Example() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
    console.log('click')
  })

  useEffect(() => {
    console.log('我只渲染一次')
  }, [])

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Clike me</button>
    </div>
  )
}

class Example1 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }

  //首次挂载后运行
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times componentDidMount`
    console.log(document.title)
  }

  //重新渲染后每次执行
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times componentDidUpdate`
    console.log(document.title)
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 2 })}>
          Clike me
        </button>
      </div>
    )
  }
}

function GithubUsers() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/users')
      .then(res => res.json())
      .then(results => setUsers(results))
  }, [])

  return (
    <div>
      {users.map(user => (
        <h5 key={user.id}>{user.login}</h5>
      ))}
    </div>
  )
}

const App = props => {
  const [count, setCount] = useState(0)
  return (
    <div>
      {count} <button onClick={() => setCount(count + 1)}>count + 1</button>
      <br />
      <Example />
      <br />
      <Example1 />
      <br />
      <GithubUsers />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
