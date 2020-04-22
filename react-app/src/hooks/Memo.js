import React, { useState } from 'react'
/**
 * 如果子组件没有使用PureComponent/memo且没有props，那么父组件state更新，子组件也会更新
 */
let Child = props => {
  console.log('子组件?')
  return <div>我是一个子组件</div>
}

// 使用memo，state更新子组件也不会更新
Child = React.memo(Child)

const Page = props => {
  const [count, setCount] = useState(0)
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
      <Child />
    </>
  )
}

export default Page
