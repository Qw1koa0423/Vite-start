// import componentBcss from './componentB.css'

import componentBcss from './componentB.module.css'
console.log("componentBcss", componentBcss)
const div = document.createElement('div')

document.body.appendChild(div)

div.className = componentBcss.footer
