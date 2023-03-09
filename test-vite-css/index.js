import indexLess from './index.module.less'
console.log('indexLess', indexLess)
const div = document.createElement('div')

document.body.appendChild(div)
const div2 = document.createElement('div')

div.appendChild(div2)
div.className = indexLess.content
div2.className = indexLess.content_wrapper