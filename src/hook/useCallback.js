import React from 'react'
import ReactDOM from 'react-dom'

let fn = null
const num1 = [1, 2, 3]
const num2 = [4, 5, 6]

function TestUserCallback(props) {
  const memoizedCallback = React.useCallback(() => {
    console.log('memoizedCallback')
    return num1
  }, [props.num])

  console.log('callback 是否相同:', Object.is(fn, memoizedCallback), props.name)
  console.log('num > ', props.num, props.name)
  fn = memoizedCallback
  return (
    <div>
      <p>TestUserCallback</p>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: num1,
      count: 0,
      name: '123'
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => {
        return {
          count: state.count + 1
        }
      })
    }, 3000)
  }

  handleChangeNum = () => {
    this.setState({
      name: 'def',
      num: num2
    })
  }

  render() {
    const { num, name } = this.state

    return (
      <div>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={this.handleChangeNum}>修改传入的Num值</button>
        <TestUserCallback num={num} name={name} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
