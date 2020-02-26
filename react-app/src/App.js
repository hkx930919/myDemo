import React, { useRef, forwardRef, useImperativeHandle } from 'react'

function Child(props, parentRef) {
  // 子组件内部自己创建 ref
  let focusRef = useRef()
  let inputRef = useRef()
  useImperativeHandle(parentRef, () => {
    // 这个函数会返回一个对象
    // 该对象会作为父组件 current 属性的值
    // 通过这种方式，父组件可以使用操作子组件中的多个 ref
    return {
      focusRef,
      inputRef,
      name: '计数器',
      focus() {
        focusRef.current.focus()
      },
      changeText(text) {
        inputRef.current.value = text
      }
    }
  })
  return (
    <>
      <input ref={focusRef} />
      <input ref={inputRef} />
    </>
  )
}
Child = forwardRef(Child)
export default function Parent() {
  const parentRef = useRef() //{current:''}
  function getFocus() {
    parentRef.current.focus()
    // 因为子组件中没有定义这个属性，实现了保护，所以这里的代码无效
    // parentRef.current.addNumber(666)
    parentRef.current.changeText('<script>alert(1)</script>')
    console.log(parentRef.current)
  }
  return (
    <>
      <Child ref={parentRef} />
      <button onClick={getFocus}>获得焦点</button>
    </>
  )
}
