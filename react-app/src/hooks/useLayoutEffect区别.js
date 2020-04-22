import React, { useState, useLayoutEffect, useEffect } from 'react'

export default function LayoutEffect() {
  const [color, setColor] = useState('red')
  useLayoutEffect(() => {
    alert(color)
  })
  useEffect(() => {
    console.log('color', color)
  })
  return (
    <>
      <div id="myDiv" style={{ background: color }}>
        颜色
      </div>
      <button onClick={() => setColor('red')}>红</button>
      <button onClick={() => setColor('yellow')}>黄</button>
      <button onClick={() => setColor('blue')}>蓝</button>
    </>
  )
}
