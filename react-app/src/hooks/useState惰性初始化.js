import React, { useState } from 'react'
const getInitState = () => {
  console.log('=====getInitState')

  return { num: 1 }
}
const Com = () => {
  const [count, setCout] = useState(getInitState)
  console.log('===count', count)

  return (
    <>
      <p>{count.num}</p>
      <button
        onClick={() => {
          setCout(preState => ({ num: preState.num + 1 }))
        }}
      >
        +
      </button>
    </>
  )
}
export default Com
