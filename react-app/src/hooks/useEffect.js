import React, { useState, useCallback, useMemo, useEffect } from 'react'
/**
 * 如果子组件没有使用PureComponent/memo且没有props，那么父组件state更新，子组件也会更新
 */
let Child = props => {
  console.log('子组件?')
  return (
    <>
      <p style={{ color: props.name.color }}>我是子组件，{props.name.name}</p>
      <button onClick={props.onClick.bind(null, '新的子组件name')}>
        改变name
      </button>
    </>
  )
}

Child = React.memo(Child)

/**
 * 每次setCount时，Page渲染一次，onClick参数重新更新了，导致子组件也更新，此时可以使用useCallback
 */
const Page = props => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('child')
  useEffect(() => {
    setInterval(() => {
      setCount(count + 1)
    }, 1000)
  }, [count])
  return (
    <>
      <button
        onClick={e => {
          setCount(count + 1)
        }}
      >
        加1
      </button>
      <p>count:{count}</p>
      <Child
        name={{ color: 'red', name }}
        onClick={newName => setName(newName)}
      />
    </>
  )
}

export default Page
