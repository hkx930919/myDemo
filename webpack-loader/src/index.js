import './index.module.less'
import png from './images/nazha.jpg'
const hello = name => `hello ${name}`
const data = hello('world')
console.log('====data', data)
const image = document.createElement('img')
image.src = png

console.log(111)

document.body.appendChild(image)
