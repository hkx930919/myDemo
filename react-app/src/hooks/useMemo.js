import React, { useState, useCallback, useMemo } from 'react'
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
//       <Child
//         name={{ color: 'red', name }}
//         onClick={newName => setName(newName)}
//       />
//     </>
//   )
// }

/**
 * 可以把 useMemo 作为一种性能优化的手段，但不要把它当做一种语义上的保证。未来，React 可能会选择「忘掉」一些之前记住的值并在下一次渲染时重新计算它们，比如为离屏组件释放内存。
 *
 * 使用了useMemo后，setCount时，子组件不会更新,注意将name依赖放进useMemo中
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
        name={useMemo(
          () => ({
            name,
            color: name.indexOf('name') !== -1 ? 'red' : 'green'
          }),
          [name]
        )}
        onClick={useCallback(newName => setName(newName), [])}
      />
    </>
  )
}

export default Page
