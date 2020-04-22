import React, { useState, useCallback } from 'react'
/**
 * 如果子组件没有使用PureComponent/memo且没有props，那么父组件state更新，子组件也会更新
 */
let Child = props => {
  console.log('子组件?')
  return (
    <>
      <p>我是子组件，{props.name}</p>
      <button onClick={props.onClick.bind(null, '新的子组件name')}>
        改变name
      </button>
    </>
  )
}

// 使用memo，state更新子组件也不会更新
Child = React.memo(Child)

/**
 * 每次setCount时，Page渲染一次，onClick参数重新更新了，导致子组件也更新，此时可以使用useCallback
 */
// const Page = props => {
//   const [count, setCount] = useState(0)
//   const [name, setName] = useState('child')
//   return (
//     <>
//       <button
//         onClick={e => {
//           setCount(count + 1)
//         }}
//       >
//         加1
//       </button>
//       <p>count:{count}</p>
//       <Child name={name} onClick={newName => setName(newName)} />
//     </>
//   )
// }

/**
 *使用了useCallback后，setCount时，子组件不会更新
 */
const Page = props => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('child')
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
        name={name}
        onClick={useCallback(newName => setName(newName), [])}
      />
    </>
  )
}

export default Page
