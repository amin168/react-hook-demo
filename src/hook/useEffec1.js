import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'

const ChatAPI = {
  handle: null,
  isOnline: false,
  login: () => {
    ChatAPI.isOnline = true
    if (ChatAPI.handle) ChatAPI.handle({ isOnline: true })
  },
  logout: () => {
    ChatAPI.isOnline = false
    if (ChatAPI.handle) ChatAPI.handle({ isOnline: false })
  },
  subscribeToFriendStatus: (id, handle) => {
    console.log(`订阅 用户Id:${id}, `)
    ChatAPI.handle = handle
  },
  unsubscribeFromFriendStatus: (id, handle) => {
    console.log(`清理 用户Id:${id}, `)
    ChatAPI.handle = null
  }
}

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null)

  function handleStatusChange(status) {
    setIsOnline(status.isOnline)
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)

    // 注意返回的函数，也被 react 自身获得，并且在组件卸载(销毁)的时候执行这个函数
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  }, [props.friend.id]) //只有当 id 改变时，才会重新订阅

  if (isOnline == null) return 'loading...'

  return (
    <div>
      {console.log('FriendStatus 刷新')}
      {isOnline ? 'Online' : 'Offline'}
    </div>
  )
}

function App() {
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)
  const [userId, setUserId] = useState(1)

  return (
    <div>
      userId: {userId} <br />
      计数器: {count}
      <button onClick={() => setCount(count + 1)}>改变计数器</button>
      <br />
      {show ? <FriendStatus friend={{ id: userId, name: '张三' }} /> : null}
      <button onClick={() => setShow(!show)}>显示/关闭</button>
      <button onClick={() => setUserId(userId + 1)}>userId + 1</button>
      <button onClick={() => ChatAPI.login()}>登录</button>
      <button onClick={ChatAPI.logout}>登出</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
