import svgIcon from './assets/svgs/pot.svg'
import svgRaw from './assets/svgs/pot.svg?raw'
console.log('svgIcon', svgIcon)
console.log('svgRaw', svgRaw)

// 第一种加载svg的方式
const img = document.createElement('img')
img.src = svgIcon
document.body.appendChild(img)

// 第二种加载svg的方式
// document.body.innerHTML = svgRaw
// const svgElement = document.getElementsByTagName('svg')[0]
// svgElement.onmouseenter = function () {
// // svg的颜色是通过fill属性来控制的
//     this.style.fill = 'red'
// }