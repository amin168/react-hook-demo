import React, {
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle
} from 'react'
import ReactDOM from 'react-dom'

// https://segmentfault.com/a/1190000017827094

function FancyInput(props, ref) {
  const [fresh, setFresh] = useState(0)
  const attRef = useRef(0)
  useImperativeHandle(
    ref,
    () => {
      return {
        attRef,
        fresh
      }
    },
    [fresh] // 当fresh改变的时候，会刷新
  )

  const handleClick = useCallback(() => {
    attRef.current = attRef.current + 1
  }, [])

  return (
    <div>
      {attRef.current} ---
      <button onClick={handleClick}>Fancy + 1</button> ---
      <button onClick={() => setFresh(!fresh)}>刷新</button>
    </div>
  )
}

FancyInput = forwardRef(FancyInput)

const App = props => {
  const fancyInputRef = useRef()
  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <hr />
      <button onClick={() => console.log(fancyInputRef.current)}>
        父组件调用子组件的实例属性
      </button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
